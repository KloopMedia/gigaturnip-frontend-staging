import React, {useEffect, useState} from 'react';
import {TextField} from "@mui/material";

const Sidebar = () => {
    const [draggable, setDraggable] = useState(false)
    const [label, setLabel] = useState("")

    useEffect(() => {

        if (label && label !== "") {
            setDraggable(true)
        } else {
            setDraggable(false)
        }
    }, [label])

    const onDragStart = (event: { dataTransfer: DataTransfer }, nodeLabel: string, nodeType: string) => {
        let data = JSON.stringify({label, type: nodeType})
        event.dataTransfer.setData('application/reactflow', data);
        event.dataTransfer.effectAllowed = 'move';
    };

    const onDragEnd = () => {
        setLabel("")
    }

    return (
        <aside>
            <div className="description">You can drag these nodes to the pane on the right.</div>
            <div style={{marginRight: 5}}>
                <TextField value={label} onChange={(e) => setLabel(e.target.value)} />
            </div>
            <div draggable={false} style={{
                color: 'red',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10
            }}>{!draggable && 'Enter Label to drag the node'}</div>
            <div className="dndnode stage" onDragEnd={onDragEnd}
                 onDragStart={(event) => onDragStart(event, label ? label : '', 'STAGE')}
                 draggable={draggable}>
                Stage Node
            </div>
            <div className="dndnode logic" onDragEnd={onDragEnd}
                 onDragStart={(event) => onDragStart(event, label ? label : '', 'LOGIC')}
                 draggable={draggable}>
                Logic Node
            </div>
        </aside>
    );
};

export default Sidebar