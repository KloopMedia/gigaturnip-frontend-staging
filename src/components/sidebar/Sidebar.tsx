import React, {useEffect, useState} from 'react';
import Form from "@rjsf/bootstrap-4";
import {JSONSchema7} from "json-schema";

import schema from '../../json-schema/SidebarSchema.json'

type FormResponsesProps = { label: string }

const Sidebar = () => {
    const [draggable, setDraggable] = useState(false)
    const [formResponses, setFormResponses] = useState<FormResponsesProps | undefined>()

    useEffect(() => {

        if (formResponses && formResponses.label && formResponses.label !== '') {
            setDraggable(true)
        } else {
            setDraggable(false)
        }
    }, [formResponses])

    const onDragStart = (event: { dataTransfer: DataTransfer }, nodeLabel: string, nodeType: string) => {
        console.log(nodeLabel, nodeType)
        let data = JSON.stringify({...formResponses, type: nodeType})
        event.dataTransfer.setData('application/reactflow', data);
        event.dataTransfer.effectAllowed = 'move';
    };

    const onDragEnd = () => {
        setFormResponses(undefined)
    }

    return (
        <aside>
            <div className="description">You can drag these nodes to the pane on the right.</div>
            <div style={{marginRight: 5}}>
                <Form schema={schema as JSONSchema7} formData={formResponses} onChange={(e) => setFormResponses(e.formData)}> </Form>
            </div>
            <div draggable={false} style={{
                color: 'red',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10
            }}>{!draggable && 'Enter Label to drag the node'}</div>
            <div className="dndnode stage" onDragEnd={onDragEnd}
                 onDragStart={(event) => onDragStart(event, formResponses ? formResponses.label : '', 'STAGE')} draggable={draggable}>
                Stage Node
            </div>
            <div className="dndnode logic" onDragEnd={onDragEnd}
                 onDragStart={(event) => onDragStart(event, formResponses ? formResponses.label : '', 'LOGIC')} draggable={draggable}>
                Logic Node
            </div>
        </aside>
    );
};

export default Sidebar