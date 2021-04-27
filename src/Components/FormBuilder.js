import React, { useEffect, useState } from "react";
import { FormBuilder } from '@ginkgo-bioworks/react-json-schema-form-builder';
import firebase from '../util/Firebase'
import Form from "@rjsf/bootstrap-4";
import caseType from '../case_type.json'
import caseStage from '../case_stage.json'
import {
    useHistory,
    useParams
  } from "react-router-dom";

const Builder = () => {
    const [schema, setSchema] = useState('')
    const [uiSchema, setUiSchema] = useState('')
    const [formResponses, setFormResponses] = useState({})
    let { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        firebase.firestore().collection('stage').doc(id).get().then(doc => {
            let data = doc.data()
            if (data.end) {
                setSchema(data.end)
            }
            if (data.end_ui) {
                setUiSchema(data.end_ui)
            }
            setFormResponses(doc.data())
        })
    }, [id])

    const handleSubmit = (e) => {
        let data = {...formResponses, end: schema, end_ui: uiSchema}
        console.log(typeof data)
        firebase.firestore().collection('stage').doc(id).update(data)
        history.push('/t/' + id)
        console.log(formResponses)
        console.log(schema)
        console.log(uiSchema)
    }

    return (
        <div>
            <FormBuilder
                schema={schema}
                uischema={uiSchema}
                onChange={(newSchema, newUiSchema) => {
                    setSchema(newSchema)
                    setUiSchema(newUiSchema)
                    console.log(newSchema)
                    console.log(newUiSchema)
                    // firebase.firestore().collection('stage').doc('test').set({end: JSON.parse(newSchema), end_ui: JSON.parse(newUiSchema)})
                }}
            />
            <Form schema={caseStage} formData={formResponses} onChange={(e) => setFormResponses(e.formData)} onSubmit={handleSubmit} />
        </div>
    )
}

export default Builder


