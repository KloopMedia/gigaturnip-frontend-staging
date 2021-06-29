import React, {useEffect, useState} from 'react';
import firebase from '../../util/Firebase'
import Form from "@rjsf/bootstrap-4";

type FormResponsesProps = { id: string, label: string }

const Sidebar = () => {
    const [id, setId] = useState('')
    const [label, setLabel] = useState('')
    const [draggable, setDraggable] = useState(false)
    const [schema, setSchema] = useState({})
    const [formResponses, setFormResponses] = useState<FormResponsesProps | undefined>()

    useEffect(() => {
        if (id !== '' && label !== '') {
            setDraggable(true)
        } else if (formResponses && formResponses.id && formResponses.id !== '' && formResponses.label && formResponses.label !== '') {
            setDraggable(true)
        } else {
            setDraggable(false)
        }
    }, [id, label, formResponses])

    // const onDragStart = (event, nodeId, nodeLabel, nodeType) => {
    //   console.log(nodeId, nodeLabel, nodeType)
    //   let data = JSON.stringify({ id: nodeId, label: nodeLabel, type: nodeType })
    //   event.dataTransfer.setData('application/reactflow', data);
    //   event.dataTransfer.effectAllowed = 'move';
    // };

    const onDragStart = (event: { dataTransfer: DataTransfer }, nodeId: string, nodeLabel: string, nodeType: string) => {
        console.log(nodeId, nodeLabel, nodeType)
        let data = JSON.stringify({...formResponses, type: nodeType})
        event.dataTransfer.setData('application/reactflow', data);
        event.dataTransfer.effectAllowed = 'move';
    };

    const onDragEnd = () => {
        setId('')
        setLabel('')
        setFormResponses(undefined)
    }

    useEffect(() => {
        firebase.firestore().collection('layout').doc('form').get().then(doc => {
            if (doc && doc.exists) {
                const data = doc.data()
                if (data && data.schema) {
                    setSchema(data.schema)
                }
            }
        })
    }, [])

    return (
        <aside>
            <div className="description">You can drag these nodes to the pane on the right.</div>
            <div style={{marginRight: 5}}>
                <Form schema={schema} formData={formResponses} onChange={(e) => setFormResponses(e.formData)}> </Form>
            </div>
            <div draggable={false} style={{
                color: 'red',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10
            }}>{!draggable && 'Enter ID and Label to drag the node'}</div>
            <div className="dndnode stage" onDragEnd={onDragEnd}
                 onDragStart={(event) => onDragStart(event, id, label, 'stage')} draggable={draggable}>
                Stage Node
            </div>
            <div className="dndnode logic" onDragEnd={onDragEnd}
                 onDragStart={(event) => onDragStart(event, id, label, 'logic')} draggable={draggable}>
                Logic Node
            </div>
        </aside>
    );
};

export default Sidebar