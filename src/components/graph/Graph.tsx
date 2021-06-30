import React, {useEffect, useRef, useState} from 'react';
import ReactFlow, {addEdge, Controls, FlowElement, ReactFlowProvider, Edge} from 'react-flow-renderer';
import {useHistory, useParams} from "react-router-dom";
import firebase from '../../util/Firebase'
import CustomLogicNode from '../nodes/LogicNode'
import CustomStageNode from '../nodes/StageNode'
import Sidebar from '../sidebar/Sidebar';

import '../../dnd.css';
import axios from '../../util/Axios';
import {conditionalstagesUrl, taskstagesUrl} from '../../util/Urls'

type RouterParams = { chainId: string, campaignId: string }

const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const history = useHistory();
    const {chainId, campaignId} = useParams<RouterParams>();

    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [elements, setElements] = useState<FlowElement[]>([]);

    useEffect(() => {
        // firebase.firestore().collection('flow-edges').get().then(snap => {
        //   if (snap.size > 0) {
        //     snap.forEach(edge => {
        //       // @ts-ignore
        //       setElements((els) => addEdge(edge.data(), els))
        //     })
        //   }
        // })

        const getStageNodes = () => {
            return axios.get(taskstagesUrl)
        };

        const getLogicNodes = () => {
            return axios.get(conditionalstagesUrl)
        };

        Promise.all([getStageNodes(), getLogicNodes()])
            .then((results) => {
                const stageNodes = results[0].data;
                const logicNodes = results[1].data;
                stageNodes.forEach((node: any) => node.type = "STAGE")
                logicNodes.forEach((node: any) => node.type = "LOGIC")
                const allNodes = [...stageNodes, ...logicNodes].filter((node: any) => node.chain == chainId)
                const nodes: FlowElement[] = allNodes.map((node: any) => (
                        {
                            id: node.id.toString(),
                            position: {x: parseFloat(node.x_pos), y: parseFloat(node.y_pos)},
                            data: {label: node.name},
                            type: node.type
                        }
                    )
                )
                setElements(nodes)
                return allNodes
            }).then(allNodes => {
            allNodes.forEach(stage => {
                if (stage.in_stages.length > 0) {
                    stage.in_stages.forEach((sourceId: string | number) => {
                        const edge = {
                            source: sourceId.toString(),
                            target: stage.id.toString(),
                            id: `${sourceId}-${stage.id}`,
                            arrowHeadType: "arrow"
                        } as Edge
                        setElements((els) => addEdge(edge, els))
                    })
                }
            })
        })
    }, [])

    const getNode = (id: string | number) => {
        return elements.filter(node => node.id == id).pop()
    }

    const onConnect = async (params: object) => {
        const newParams: any = {...params, arrowHeadType: 'arrow'}
        const targetNode = getNode(newParams.target)

        setElements((els: FlowElement[]) => addEdge(newParams, els))

        if (targetNode) {
            let data = {in_stages: [newParams.source]}
            if (targetNode.type == "STAGE") {
                const connections = await axios.get(taskstagesUrl + targetNode.id).then(res => res.data.in_stages)
                let parsed = connections.map((connection: string | number) => connection.toString())
                data.in_stages = data.in_stages.concat(parsed)
                axios.patch(taskstagesUrl + targetNode.id, data)
            }
            if (targetNode.type == "LOGIC") {
                const connections = await axios.get(conditionalstagesUrl + targetNode.id).then(res => res.data.in_stages)
                let parsed = connections.map((connection: string | number) => connection.toString())
                data.in_stages = data.in_stages.concat(parsed)
                axios.patch(conditionalstagesUrl + targetNode.id, data)
            }
        }
    }

    const removeConnections = async (node: FlowElement, source: string) => {
        let connections = []
        if (node.type === 'STAGE') {
            connections = await axios.get(taskstagesUrl + node.id).then(res => res.data.in_stages)
        }
        if (node.type === 'LOGIC') {
            connections = await axios.get(conditionalstagesUrl + node.id).then(res => res.data.in_stages)
        }

        let oldConnections = connections.map((connection: string | number) => connection.toString())
        let newConnections = oldConnections.filter((connection: string) => connection !== source)
        let data = {in_stages: newConnections}

        if (node.type === 'STAGE') {
            axios.patch(taskstagesUrl + node.id, data)
        }
        if (node.type === 'LOGIC') {
            axios.patch(conditionalstagesUrl + node.id, data)
        }
    }

    const removeElements = (elementsToRemove: FlowElement[], elements: FlowElement[]) => {
        let nodeIdsToRemove = elementsToRemove.map((n: any) => {
            return n.id;
        });
        return elements.filter((element: any) => {
            let edgeElement = element;
            if (nodeIdsToRemove.includes(element.id) || nodeIdsToRemove.includes(edgeElement.target) || nodeIdsToRemove.includes(edgeElement.source)) {
                if (element.hasOwnProperty('source') && element.hasOwnProperty('target')) {
                    let target = element.target
                    let source = element.source
                    let node = getNode(target)

                    if (node) {
                        if (node.type === 'STAGE') {
                            removeConnections(node, source)
                        }
                        if (node.type === 'LOGIC') {
                            removeConnections(node, source)
                            // axios.delete(conditionalstagesUrl + element.id)
                        }
                    }

                } else {
                    if (element.type === 'STAGE') {
                        axios.delete(taskstagesUrl + element.id)
                    }
                    if (element.type === 'LOGIC') {
                        axios.delete(conditionalstagesUrl + element.id)
                    }
                }
                return false
            } else {
                return true
            }
        });
    };

    const onElementsRemove = (elementsToRemove: FlowElement[]) => {
        setElements((els) => removeElements(elementsToRemove, els));
    }

    const onLoad = (_reactFlowInstance: any) =>
        setReactFlowInstance(_reactFlowInstance);

    const onDragOver = (event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onDrop = async (event: any) => {
        event.preventDefault();

        // @ts-ignore
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const transfer = event.dataTransfer.getData('application/reactflow');
        // @ts-ignore
        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });

        const parsedData = JSON.parse(transfer)
        const label = parsedData.label
        const type = parsedData.type

        const id = await createNode({type, position, label})

        let newNode = {
            id,
            type,
            position,
            data: {label},
        };

        setElements((es) => es.concat(newNode));
    };

    const onNodeDragStop = (event: any, node: any) => {
        updateNode(node)
    }

    const updateNodeInFirebase = (node: any) => {
        firebase.firestore().collection('flow').doc(node.id).set(node, {merge: true})
    }

    const updateNode = (node: any) => {
        console.log(node)
        let x_pos = node.position.x
        let y_pos = node.position.y
        let data = {x_pos, y_pos}
        if (node.type == "STAGE") {
            axios.patch(taskstagesUrl + node.id, data)
        }
        if (node.type == "LOGIC") {
            axios.patch(conditionalstagesUrl + node.id, data)
        }
    }

    const createNode = async (node: any) => {
        let data = {
            node_type: node.type,
            name: node.label,
            x_pos: node.position.x,
            y_pos: node.position.y,
            chain: chainId
        }
        if (node.type === "STAGE") {
            let res = await axios.post(taskstagesUrl, data)
            return res.data.id.toString()
        }
        if (node.type === "LOGIC") {
            let res = await axios.post(conditionalstagesUrl, data)
            return res.data.id.toString()
        }
        return undefined;
    }

    const onElementDoubleClick = (event: any, element: any) => {
        console.log(element)
        let location = history.location.pathname
        if (element.id) {
            if (element.type === 'LOGIC') {
                history.push(`${location}/createlogic/${element.id}`)
            }
            if (element.type === 'STAGE') {
                // history.push('/createStage/' + element.id)
                history.push(`${location}/actions/${element.id}`)
            }
            if (element.type === 'default' && (element.target || element.source)) {
                console.log('edge')
            }
        }
    }

    const nodeTypes = {
        LOGIC: CustomLogicNode,
        STAGE: CustomStageNode
    };


    return (
        <div className="dndflow">
            <ReactFlowProvider>
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodeTypes={nodeTypes}
                        elements={elements}
                        onConnect={onConnect}
                        onElementsRemove={onElementsRemove}
                        onNodeDoubleClick={onElementDoubleClick}
                        onEdgeDoubleClick={onElementDoubleClick}
                        onLoad={onLoad}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onNodeDragStop={onNodeDragStop}
                        style={{
                            width: '100%',
                            height: 700,
                        }}
                    >
                        <Controls/>
                    </ReactFlow>
                </div>
                <Sidebar/>
            </ReactFlowProvider>
        </div>
    );
};

export default DnDFlow;