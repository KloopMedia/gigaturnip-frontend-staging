import React, { useEffect, useState } from "react";
import firebase from '../util/Firebase'
import Form from "@rjsf/bootstrap-4";
import {
    useParams
} from "react-router-dom";

const Builder = () => {
    const [schema, setSchema] = useState({})
    const [uiSchema, setUiSchema] = useState({})
    const [formResponses, setFormResponses] = useState({})
    let { id } = useParams();

    useEffect(() => {
        let from = id.split('-->')[0]
        console.log("FROM", from)
        firebase.firestore().collection('stage').doc(from).get().then(doc => {
            let data = doc.data()
            // if (data.end) {
            //     setSchema(data.end)
            // }
            // if (data.end_ui) {
            //     setUiSchema(data.end_ui)
            // }
            // setFormResponses(data)
            if (from !== 'start') {
                console.log(data)
                if (data.hasOwnProperty('end_ui')) {
                    let end_ui = JSON.parse(data.end_ui)
                    console.log(end_ui['ui:order'])
                    if (end_ui.hasOwnProperty('ui:order')) {
                        setSchema({
                            title: "Relations",
                            type: "object",
                            properties: {
                                field: {
                                    title: 'Field',
                                    type: "string",
                                    enum: [...end_ui['ui:order']]
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
                        setUiSchema({ 'ui:order': ['field', 'condition', 'value'] })
                    }
                }
            }
        })
    }, [id])

    const handleSubmit = (e) => {
        console.log(typeof data)
        firebase.firestore().collection('relations').doc(id).update({logic: formResponses})
        console.log(formResponses)
        console.log(schema)
        console.log(uiSchema)
    }

    return (
        <div>
            {schema && <Form schema={schema} formData={formResponses} onChange={(e) => setFormResponses(e.formData)} onSubmit={handleSubmit} />}
        </div>
    )
}

export default Builder


