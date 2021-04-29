import React, { useState, useRef, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Controls,
} from 'react-flow-renderer';
import { useHistory } from "react-router-dom";
import firebase from '../../util/Firebase'
import { v4 as uuid } from 'uuid';
import CustomLogicNode from './CustomLogicNode'
import CustomStageNode from './CustomStageNode'
import Sidebar from './sidebar';

import './dnd.css';


const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const history = useHistory();

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('flow').get().then(snap => {
      const nodes = []
      snap.forEach(doc => {
        const docData = doc.data()
        nodes.push({
          id: docData.id,
          type: docData.type,
          position: docData.position,
          data: docData.data
        })
      })
      return nodes
    }).then(nodes => setElements(nodes))
    firebase.firestore().collection('flow-edges').get().then(snap => {
      if (snap.size > 0) {
        snap.forEach(edge => {
          setElements((els) => addEdge(edge.data(), els))
        })
      }
    })
  }, [])

  const onConnect = (params) => {
    setElements((els) => addEdge(params, els))
    const relName = params.source + '-->' + params.target
    firebase.firestore().collection('flow-edges').doc(relName).set(params)
  }

  const removeElements = (elementsToRemove, elements) => {
    let nodeIdsToRemove = elementsToRemove.map((n) => {
      return n.id;
    });
    return elements.filter((element) => {
      let edgeElement = element;
      if (nodeIdsToRemove.includes(element.id) || nodeIdsToRemove.includes(edgeElement.target) || nodeIdsToRemove.includes(edgeElement.source)) {
        if (element.hasOwnProperty('source') && element.hasOwnProperty('target')) {
          let correctId = element.source + '-->' + element.target
          firebase.firestore().collection('flow-edges').doc(correctId).delete()
        }
        else {
          firebase.firestore().collection('flow').doc(element.id).delete()
          firebase.firestore().collection('stage').doc(element.id).delete()
          if (element.type === 'logic') {
            firebase.firestore().collection('flow-logic').doc(element.id).delete()
          }
        }
        return false
      }
      else {
        return true
      }
    });
  };

  const onElementsRemove = (elementsToRemove) => {
    setElements((els) => removeElements(elementsToRemove, els));
    // const node = elementsToRemove.pop()
    // firebase.firestore().collection('flow').doc(node.id).delete()
    // firebase.firestore().collection('stage').doc(node.id).delete()
  }

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const transfer = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const parsedData = JSON.parse(transfer)
    const id = parsedData.id
    const label = parsedData.label
    const type = parsedData.type
    const newNode = {
      id,
      type,
      position,
      data: { label },
    };

    setElements((es) => es.concat(newNode));
    updateNodeInFirebase(newNode)
  };

  const onNodeDragStop = (event, node) => {
    updateNodeInFirebase(node)
  }

  const updateNodeInFirebase = (node) => {
    firebase.firestore().collection('flow').doc(node.id).set(node, { merge: true })
  }

  const onElementDoubleClick = (event, element) => {
    console.log(element)
    if (element.id) {
      if (element.type === 'logic') {
        history.push('/createLogic/' + element.id)
      }
      else {
        history.push('/createStage/' + element.id)
      }
    }
  }

  const nodeTypes = {
    logic: CustomLogicNode,
    stage: CustomStageNode
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
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeDragStop={onNodeDragStop}
            style={{
              width: '100%',
              height: 700,
            }}
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;