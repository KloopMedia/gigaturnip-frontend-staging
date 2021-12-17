// noinspection ES6MissingAwait,JSIgnoredPromiseFromCall

import React, {useEffect, useRef, useState} from 'react';
import ReactFlow, {addEdge, Controls, Edge, FlowElement} from 'react-flow-renderer';
import LogicNode from './nodes/LogicNode'
import StageNode from './nodes/StageNode'

import './css/dnd.css';
import {useNavigate, useParams} from "react-router-dom";
import useHelpers from "../../utils/hooks/UseHelpers";
import useAxios from "../../services/api/useAxios";
import {Grid} from "@mui/material";
import Sidebar from "./sidebar/Sidebar";


const Graph = () => {
    const reactFlowWrapper = useRef(null);
    const {getStageNodes, getLogicNodes} = useAxios();
    const {parseId, addConnections, createNode, removeElements, updateNode} = useHelpers();
    const {campaignId, chainId} = useParams();
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [elements, setElements] = useState<FlowElement[]>([]);
    const navigate = useNavigate();

    const parsedCampaignId: number = parseId(campaignId);
    const parsedChainId: number = parseId(chainId);
    const extraEdgeOptions = {style: {strokeWidth: 3}, arrowHeadType: "arrow"}

    // <------ UseEffect Part ------>
    useEffect(() => {
        Promise.all([getStageNodes(parsedCampaignId, parsedChainId), getLogicNodes(parsedCampaignId, parsedChainId)])
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
                                ...extraEdgeOptions
                            } as Edge
                            setElements((els) => addEdge(edge, els))
                        })
                    }
                })
            })
    }, [parsedChainId])


    // <------ Frameworks Functions Part ------>

    const onConnect = async (params: object) => {
        const newParams: any = {...params, ...extraEdgeOptions}
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

        if (label === "") {
            return 0;
        }

        const id = await createNode({type, position, label}, parsedChainId)

        let newNode = {
            id,
            type,
            position,
            data: {label},
        };

        setElements((es) => [...es, newNode]);
    };

    const onNodeDragStop = (event: any, node: any) => {
        updateNode(node)
    }

    const onElementDoubleClick = (event: any, element: any) => {
        console.log(element)
        if (element.id) {
            if (element.type === 'LOGIC') {
                navigate(`createlogic/${element.id}`)
            }
            if (element.type === 'STAGE') {
                navigate(`createstage/${element.id}`)
            }
        }
    }

    // Init custom node types
    const nodeTypes = {
        LOGIC: LogicNode,
        STAGE: StageNode
    };


    return (
        <Grid container>
            <Grid item md={10} zIndex={1}>
                <ReactFlow
                    ref={reactFlowWrapper}
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
                    preventScrolling={true}
                    style={{
                        width: '94vw',
                        height: '90vh'
                    }}
                >
                    <Controls/>
                </ReactFlow>
            </Grid>
            <Grid item md={2} zIndex={2} height={200} sx={{background: "white"}}>
                <Sidebar/>
            </Grid>
        </Grid>
    );
};

export default Graph;