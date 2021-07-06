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

    const getTypeUrl = (node: FlowElement) => {
        if (node.type == "STAGE") {
            return taskstagesUrl
        }
        if (node.type == "LOGIC") {
            return conditionalstagesUrl
        }
        return undefined
    }

    const onConnect = async (params: object) => {
        const newParams: any = {...params, arrowHeadType: 'arrow'}
        const targetNode = getNode(newParams.target)
        const source = newParams.source

        setElements((els: FlowElement[]) => addEdge(newParams, els))

        if (targetNode) {
            const url = getTypeUrl(targetNode)
            if (url) {
                const connections = await axios.get(url + targetNode.id + '/').then(res => res.data.in_stages).catch(err => undefined)
                if (connections) {
                    const parsed = connections.map((connection: string | number) => connection.toString())
                    const data = {in_stages: [source, ...parsed]}
                    axios.patch(url + targetNode.id + '/', data)
                }
            }
        }
    }

    const removeConnections = async (target: string, source: string) => {
        const node = getNode(target)
        if (node) {
            const url = getTypeUrl(node)
            if (url) {
                let connections = await axios.get(url + node.id + '/').then(res => res.data.in_stages).catch(err => undefined)
                if (connections) {
                    let oldConnections = connections.map((connection: string | number) => connection.toString())
                    let newConnections = oldConnections.filter((connection: string) => connection !== source)
                    let data = {in_stages: newConnections}
                    axios.patch(url + node.id +'/', data)
                }
            }
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

                    removeConnections(target, source)

                } else {
                    const url = getTypeUrl(element)
                    if (url) {
                        axios.delete(url + element.id + '/')
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
        let x_pos = node.position.x
        let y_pos = node.position.y
        let data = {x_pos, y_pos}
        const url = getTypeUrl(node)
        if (url) {
            axios.patch(url + node.id + '/', data)
        }
    }

    const createNode = async (node: any) => {
        let data = {
            name: node.label,
            x_pos: node.position.x,
            y_pos: node.position.y,
            chain: parseInt(chainId),
            out_stages: []
        }
        console.log(JSON.stringify(data))
        const url = getTypeUrl(node)
        if (url) {
            let res = await axios.post(url, data)
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