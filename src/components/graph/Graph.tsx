import React, { useState, useRef, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Controls, FlowElement,
} from 'react-flow-renderer';
import { useHistory } from "react-router-dom";
import firebase from '../../util/Firebase'
import CustomLogicNode from '../nodes/LogicNode'
import CustomStageNode from '../nodes/StageNode'
import Sidebar from '../sidebar/Sidebar';

import '../../dnd.css';


const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const history = useHistory();

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState<FlowElement[]>([]);

  useEffect(() => {
    firebase.firestore().collection('flow').get().then(snap => {
      const nodes: FlowElement[] = []
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
          // @ts-ignore
          setElements((els) => addEdge(edge.data(), els))
        })
      }
    })
  }, [])

  const onConnect = (params: object) => {
    const newParams: any = {...params, arrowHeadType: 'arrow'}
    setElements((els: any) => addEdge(newParams, els))
    const relName = newParams.source + '-->' + newParams.target
    firebase.firestore().collection('flow-edges').doc(relName).set(newParams)
  }

  const removeElements = (elementsToRemove: FlowElement[], elements: FlowElement[]) => {
    let nodeIdsToRemove = elementsToRemove.map((n:any) => {
      return n.id;
    });
    return elements.filter((element: any) => {
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

  const onElementsRemove = (elementsToRemove: FlowElement[]) => {
    setElements((els) => removeElements(elementsToRemove, els));
    // const node = elementsToRemove.pop()
    // firebase.firestore().collection('flow').doc(node.id).delete()
    // firebase.firestore().collection('stage').doc(node.id).delete()
  }

  const onLoad = (_reactFlowInstance: any) =>
    setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event: any) => {
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

  const onNodeDragStop = (event: any, node: any) => {
    updateNodeInFirebase(node)
  }

  const updateNodeInFirebase = (node: any) => {
    firebase.firestore().collection('flow').doc(node.id).set(node, { merge: true })
  }

  const onElementDoubleClick = (event: any, element: any) => {
    console.log(element)
    if (element.id) {
      if (element.type === 'logic') {
        history.push('/createLogic/' + element.id)
      }
      if (element.type === 'stage') {
        // history.push('/createStage/' + element.id)
        history.push('/actions/' + element.id)
      }
      if (element.type === 'default' && (element.target || element.source)) {
        console.log('edge')
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
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;