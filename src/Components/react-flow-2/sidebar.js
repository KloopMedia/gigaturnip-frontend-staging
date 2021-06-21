import React, { useEffect, useState } from 'react';
import firebase from '../../util/Firebase'
import Form from "@rjsf/bootstrap-4";

const Sidebar = () => {
  const [id, setId] = useState('')
  const [label, setLabel] = useState('')
  const [draggable, setDraggable] = useState(false)
  const [schema, setSchema] = useState({})
  const [formResponses, setFormResponses] = useState({})
  const [validator, setValidator] = useState({})
  const [nodes, setNodes] = useState([])

  const handleLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const handleIdChange = (e) => {
    setId(e.target.value)
  }

  useEffect(() => {
    if (id !== '' && label !== '') {
      setDraggable(true)
    }
    else if (formResponses.id && formResponses.id !== '' && formResponses.label && formResponses.label !== '') {
      setDraggable(true)
    }
    else {
      setDraggable(false)
    }
  }, [id, label, formResponses])

  // const onDragStart = (event, nodeId, nodeLabel, nodeType) => {
  //   console.log(nodeId, nodeLabel, nodeType)
  //   let data = JSON.stringify({ id: nodeId, label: nodeLabel, type: nodeType })
  //   event.dataTransfer.setData('application/reactflow', data);
  //   event.dataTransfer.effectAllowed = 'move';
  // };

  const onDragStart = (event, nodeId, nodeLabel, nodeType) => {
    console.log(nodeId, nodeLabel, nodeType)
    let data = JSON.stringify({ ...formResponses, type: nodeType })
    event.dataTransfer.setData('application/reactflow', data);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragEnd = () => {
    setId('')
    setLabel('')
    setFormResponses({})
  }

  useEffect(() => {
    firebase.firestore().collection('layout').doc('form').get().then(doc => {
      if (doc && doc.exists) {
        const data = doc.data()
        if (data.schema) {
          setSchema(data.schema)
        }
        if (data.validator) {
          setValidator(data.nodes)
        }
      }
    })

    firebase.firestore().collection('layout').doc('nodes').get().then(doc => {
      if (doc && doc.exists) {
        const data = doc.data()
        if (data.nodes) {
          setNodes(data.nodes)
        }
      }
    })
  }, [])

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <Form schema={schema} formData={formResponses} onChange={(e) => setFormResponses(e.formData)} > </Form>
      {/* <div style={{ paddingTop: 10, paddingBottom: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ width: '15%', margin: 0, padding: 0 }}>ID:</p>
        <input
          type="text"
          style={{ marginLeft: 5, marginRight: 5, border: '1px solid black', width: '85%' }}
          onChange={handleIdChange}
          value={id}
        />
      </div> */}
      {/* <div style={{ paddingTop: 10, paddingBottom: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ width: '15%', margin: 0, padding: 0 }}>Label:</p>
        <input
          type="text"
          style={{ marginLeft: 5, marginRight: 5, border: '1px solid black', width: '85%' }}
          onChange={handleLabelChange}
          value={label}
        />
      </div> */}
      <div draggable={false} style={{ color: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10 }}>{!draggable && 'Enter ID and Label to drag the node'}</div>
      {/* <div className="dndnode input" onDragEnd={onDragEnd} onDragStart={(event) => onDragStart(event, id, label, 'input')} draggable={draggable}>
        Input Node
      </div>
      <div className="dndnode" onDragEnd={onDragEnd} onDragStart={(event) => onDragStart(event, id, label, 'default')} draggable={draggable}>
        Default Node
      </div>
      <div className="dndnode output" onDragEnd={onDragEnd} onDragStart={(event) => onDragStart(event, id, label, 'output')} draggable={draggable}>
        Output Node
      </div> */}
      <div className="dndnode stage" onDragEnd={onDragEnd} onDragStart={(event) => onDragStart(event, id, label, 'stage')} draggable={draggable}>
        Stage Node
      </div>
      <div className="dndnode logic" onDragEnd={onDragEnd} onDragStart={(event) => onDragStart(event, id, label, 'logic')} draggable={draggable}>
        Logic Node
      </div>
    </aside>
  );
};

export default Sidebar