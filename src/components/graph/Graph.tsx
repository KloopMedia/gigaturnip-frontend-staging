// noinspection ES6MissingAwait,JSIgnoredPromiseFromCall

import React, {useEffect, useRef, useState} from 'react';
import ReactFlow, {addEdge, Controls, Edge, FlowElement, ReactFlowProvider} from 'react-flow-renderer';
import {useHistory, useParams} from "react-router-dom";
import CustomLogicNode from '../nodes/LogicNode'
import CustomStageNode from '../nodes/StageNode'
import Sidebar from '../sidebar/Sidebar';

import '../../dnd.css';
import {RouterParams} from "../../util/Types";
import {addConnections, createNode, getLogicNodes, getStageNodes, removeElements, updateNode} from "../../util/Util";


const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const history = useHistory();
    const {campaignId, chainId} = useParams<RouterParams>();

    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [elements, setElements] = useState<FlowElement[]>([]);

    // <------ UseEffect Part ------>
    useEffect(() => {
        Promise.all([getStageNodes(campaignId, chainId), getLogicNodes(campaignId, chainId)])
            .then((results) => {
                const stageNodes = results[0];
                const logicNodes = results[1];

                // Add types to nodes
                stageNodes.forEach((node: any) => node.type = "STAGE")
                logicNodes.forEach((node: any) => node.type = "LOGIC")

                // Construct nodes and save to state
                const allNodes = [...stageNodes, ...logicNodes]
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
            })
            .then(allNodes => {
                // Construct edges and save to state
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
    }, [chainId])


    // <------ Frameworks Functions Part ------>

    const onConnect = async (params: object) => {
        const newParams: any = {...params, arrowHeadType: 'arrow'}
        const target = newParams.target
        const source = newParams.source

        setElements((els: FlowElement[]) => addEdge(newParams, els))
        addConnections(target, source, elements)
    }

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
        // Get new node data from sidebar
        const transfer = event.dataTransfer.getData('application/reactflow');
        // @ts-ignore
        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });

        const parsedData = JSON.parse(transfer)
        const label = parsedData.label
        const type = parsedData.type

        const id = await createNode({type, position, label}, chainId)

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

    const onElementDoubleClick = (event: any, element: any) => {
        console.log(element)
        let location = history.location.pathname
        if (element.id) {
            if (element.type === 'LOGIC') {
                history.push(`${location}/createlogic/${element.id}`)
            }
            if (element.type === 'STAGE') {
                history.push(`${location}/createstage/${element.id}`)
            }
            // if (element.type === 'DOC') {
            //     history.push(`${location}/createdoc/${element.id}`)
            // }
            if (element.type === 'default' && (element.target || element.source)) {
                console.log('edge')
            }
        }
    }

    // Init custom node types
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