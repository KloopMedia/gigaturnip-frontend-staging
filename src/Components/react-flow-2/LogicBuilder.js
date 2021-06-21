import React, { useEffect, useState } from "react";
import firebase from '../../util/Firebase'
import Form from "@rjsf/bootstrap-4";
import {
    useParams
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

const Builder = () => {
    const [ready, setReady] = useState(false)
    const [schema, setSchema] = useState({
        title: "Logic",
        type: "object",
        properties: {
            field: {
                title: 'Field',
                type: "string",
                enum: []
            },
            condition: {
                title: 'Condition',
                type: "string",
                enum: ['==', '!=', '>=', '<=', '>', '<']
            },
            value: {
                title: 'Value',
                type: 'string'
            }
        },
    })
    const [uiSchema, setUiSchema] = useState({ 'ui:order': ['field', 'condition', 'value'] })
    const [formResponses, setFormResponses] = useState({})
    let { id } = useParams();

    useEffect(() => {
        firebase.firestore().collection('flow-edges').where('target', '==', id).get().then(edges => {
            edges.forEach(edge => {
                let source = edge.data().source
                firebase.firestore().collection('stage').doc(source).get().then(doc => {
                    if (doc && doc.exists) {
                        let data = doc.data()
                        if (data && data.hasOwnProperty('end_ui')) {
                            let end_ui = JSON.parse(data.end_ui)
                            if (end_ui.hasOwnProperty('ui:order')) {
                                console.log(end_ui['ui:order'])
                                setSchema(ps => {
                                    let ns = {...ps}
                                    ns.properties.field.enum = end_ui['ui:order']
                                    console.log(ns)
                                    return ns
                                })
                                setReady(true)
                            }
                        }
                    }
                })
            })
        })

        firebase.firestore().collection('flow-logic').doc(id).get().then(doc => {
            if (doc && doc.exists) {
                setFormResponses(doc.data())
            }
        })
    }, [id])

    const handleSubmit = (e) => {
        console.log(typeof data)
        firebase.firestore().collection('flow-logic').doc(id).set(formResponses, {merge: true})
        console.log(formResponses)
        console.log(schema)
        console.log(uiSchema)
    }

    return (
        <div>
            {ready ? <Form schema={schema} formData={formResponses} onChange={(e) => setFormResponses(e.formData)} onSubmit={handleSubmit} /> 
            :
            <p>No node connection or end_ui detected. Connect to one or check if form has fields.</p>}
        </div>
    )
}

export default Builder


