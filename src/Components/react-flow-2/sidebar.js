import React, { useEffect, useState } from 'react';

const Sidebar = () => {
  const [id, setId] = useState('')
  const [label, setLabel] = useState('')
  const [draggable, setDraggable] = useState(false)

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
    else {
      setDraggable(false)
    }
  }, [id, label])

  const onDragStart = (event, nodeId, nodeLabel, nodeType) => {
    console.log(nodeId, nodeLabel, nodeType)
    let data = JSON.stringify({ id: nodeId, label: nodeLabel, type: nodeType })
    event.dataTransfer.setData('application/reactflow', data);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragEnd = () => {
    setId('')
    setLabel('')
  }

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div style={{ paddingTop: 10, paddingBottom: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ width: '15%', margin: 0, padding: 0 }}>ID:</p>
        <input
          type="text"
          style={{ marginLeft: 5, marginRight: 5, border: '1px solid black', width: '85%' }}
          onChange={handleIdChange}
          value={id}
        />
      </div>
      <div style={{ paddingTop: 10, paddingBottom: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ width: '15%', margin: 0, padding: 0 }}>Label:</p>
        <input
          type="text"
          style={{ marginLeft: 5, marginRight: 5, border: '1px solid black', width: '85%' }}
          onChange={handleLabelChange}
          value={label}
        />
      </div>
      <div style={{ color: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10 }}>{!draggable && 'Enter ID and Label to drag the node'}</div>
      <div className="dndnode input" onDragEnd={onDragEnd} onDragStart={(event) => onDragStart(event, id, label, 'input')} draggable={draggable}>
        Input Node
      </div>
      <div className="dndnode" onDragEnd={onDragEnd} onDragStart={(event) => onDragStart(event, id, label, 'default')} draggable={draggable}>
        Default Node
      </div>
      <div className="dndnode output" onDragEnd={onDragEnd} onDragStart={(event) => onDragStart(event, id, label, 'output')} draggable={draggable}>
        Output Node
      </div>
      <div className="dndnode logic" onDragEnd={onDragEnd} onDragStart={(event) => onDragStart(event, id, label, 'logic')} draggable={draggable}>
        Logic Node
      </div>
      <div className="dndnode stage" onDragEnd={onDragEnd} onDragStart={(event) => onDragStart(event, id, label, 'stage')} draggable={draggable}>
        Stage Node
      </div>
    </aside>
  );
};

export default Sidebar