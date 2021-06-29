import React, {useEffect, useRef, useState} from 'react';
import ReactFlow, {addEdge, Controls, FlowElement, ReactFlowProvider,} from 'react-flow-renderer';
import {useHistory, useParams} from "react-router-dom";
import firebase from '../../util/Firebase'
import CustomLogicNode from '../nodes/LogicNode'
import CustomStageNode from '../nodes/StageNode'
import Sidebar from '../sidebar/Sidebar';

import '../../dnd.css';
import axios from 'axios';

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
            return axios.get('/api/v1/alltaskstages/')
        };

        const getLogicNodes = () => {
            return axios.get('/api/v1/allconditionalstages/')
        };

        Promise.all([getStageNodes(), getLogicNodes()])
            .then((results) => {
                const logicNodes = results[0].data;
                const stageNodes = results[1].data;
                const allNodes = [...stageNodes, ...logicNodes]
                const nodes: FlowElement[] = allNodes.filter(node => node.chain == chainId).map((node: any) => (
                        {
                            id: node.id.toString(),
                            position: {x: parseFloat(node.x_pos), y: parseFloat(node.y_pos)},
                            data: {label: node.name}
                        }
                    )
                )
                setElements(nodes)
                console.log(allNodes)
            });
    }, [])

    const onConnect = (params: object) => {
        const newParams: any = {...params, arrowHeadType: 'arrow'}
        console.log(newParams)
        setElements((els: FlowElement[]) => addEdge(newParams, els))
        // const relName = newParams.source + '-->' + newParams.target
        // firebase.firestore().collection('flow-edges').doc(relName).set(newParams)
    }

    const removeElements = (elementsToRemove: FlowElement[], elements: FlowElement[]) => {
        let nodeIdsToRemove = elementsToRemove.map((n: any) => {
            return n.id;
        });
        return elements.filter((element: any) => {
            let edgeElement = element;
            if (nodeIdsToRemove.includes(element.id) || nodeIdsToRemove.includes(edgeElement.target) || nodeIdsToRemove.includes(edgeElement.source)) {
                if (element.hasOwnProperty('source') && element.hasOwnProperty('target')) {
                    let correctId = element.source + '-->' + element.target
                    firebase.firestore().collection('flow-edges').doc(correctId).delete()
                } else {
                    // firebase.firestore().collection('flow').doc(element.id).delete()
                    // firebase.firestore().collection('stage').doc(element.id).delete()
                    if (element.type === 'STAGE') {
                        axios.delete(`/api/v1/taskstage/${element.id}`)
                    }
                    if (element.type === 'LOGIC') {
                        axios.delete(`/api/v1/conditionalstage/${element.id}`)
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
        let newNode = {
            id: '',
            type,
            position,
            data: {label},
        };

        const id = await createNode({type, position, label})
        if (id) {
            newNode['id'] = id
        }

        setElements((es) => es.concat(newNode));
        // updateNodeInFirebase(newNode)
    };

    const onNodeDragStop = (event: any, node: any) => {
        // updateNodeInFirebase(node)
    }

    const updateNodeInFirebase = (node: any) => {
        firebase.firestore().collection('flow').doc(node.id).set(node, {merge: true})
    }

    const updateNode = (node: any) => {
        // axios.post(/)
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
            let res = await axios.post('/api/v1/alltaskstages/', data)
            return res.data.id.toString()
        }
        if (node.type === "LOGIC") {
            let res = await axios.post('/api/v1/allconditionalstages/', data)
            return res.data.id.toString()
        }
        return undefined;
    }

    const onElementDoubleClick = (event: any, element: any) => {
        console.log(element)
        let location = history.location.pathname
        if (element.id) {
            if (element.type === 'LOGIC') {
                history.push(`${location}/createLogic/${element.id}`)
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

    console.log(elements)

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