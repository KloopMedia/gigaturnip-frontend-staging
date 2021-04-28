import React, { useState } from 'react';

import ReactFlow, {
    removeElements,
    addEdge,
    MiniMap,
    Controls,
    Background,
} from 'react-flow-renderer';

import {
    useHistory
} from "react-router-dom";


const onLoad = (reactFlowInstance) => {
    console.log('flow loaded:', reactFlowInstance);
    reactFlowInstance.fitView();
};

const OverviewFlow = () => {
    const [elements, setElements] = useState([]);
    const onElementsRemove = (elementsToRemove) =>
        setElements((els) => removeElements(elementsToRemove, els));
    const onConnect = (params) => setElements((els) => addEdge(params, els));
    const [nodeId, setNodeId] = useState()
    const [nodeTitle, setNodeTitle] = useState()

    const history = useHistory();

    const handleNodeClick = (event, element) => {
        console.log(event)
        console.log(element)
        if (element.id) {
            history.push('/createStage/' + element.id)
        }
    }

    const createNode = (id, label) => {
        console.log(id, label)
        let data = { id: id, data: { label: label }, position: { x: 250, y: 5 } }
        let newState = [...elements]
        newState.push(data)
        setElements(newState)
    }

    const handleIdChange = (e) => {
        setNodeId(e.target.value)
    }

    const handleTitleChange = (e) => {
        setNodeTitle(e.target.value)
    }

    return (
        <div>
            id: <input onChange={handleIdChange} />
            <br />
            title: <input onChange={handleTitleChange} />
            <br />
            <button onClick={() => createNode(nodeId, nodeTitle)}>createNode</button>
            <ReactFlow
                elements={elements}
                onElementsRemove={onElementsRemove}
                onConnect={onConnect}
                onLoad={onLoad}
                onNodeDoubleClick={handleNodeClick}
                snapToGrid={true}
                style={{
                    width: '100%',
                    height: 700,
                }}
                snapGrid={[15, 15]}
            >
                <MiniMap
                    nodeStrokeColor={(n) => {
                        if (n.style?.background) return n.style.background;
                        if (n.type === 'input') return '#0041d0';
                        if (n.type === 'output') return '#ff0072';
                        if (n.type === 'default') return '#1a192b';

                        return '#eee';
                    }}
                    nodeColor={(n) => {
                        if (n.style?.background) return n.style.background;

                        return '#fff';
                    }}
                    nodeBorderRadius={2}
                />
                <Controls />
                <Background color="#aaa" gap={16} />
            </ReactFlow>
        </div>
    );
};

export default OverviewFlow;