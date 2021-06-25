import React, {useEffect, useState} from "react";
// @ts-ignore
import {FormBuilder} from '@ginkgo-bioworks/react-json-schema-form-builder';
import firebase from '../../util/Firebase'
import Form from "@rjsf/bootstrap-4";
import StageOptions from '../../json-schema/StageOptions.json'
import {
    useHistory,
    useParams
} from "react-router-dom";
import {JSONSchema7} from "json-schema";

import 'bootstrap/dist/css/bootstrap.min.css';

type RouterParams = { id: string }

const Builder = () => {
    const [schema, setSchema] = useState('')
    const [uiSchema, setUiSchema] = useState('')
    const [formResponses, setFormResponses] = useState({})
    let {id} = useParams<RouterParams>();
    const history = useHistory();

    useEffect(() => {
        firebase.firestore().collection('stage').doc(id).get().then(doc => {
            if (doc && doc.exists) {
                let data = doc.data()
                if (data) {
                    if (data.end) {
                        setSchema(data.end)
                    }
                    if (data.end_ui) {
                        setUiSchema(data.end_ui)
                    }
                    setFormResponses(data)
                }
            }
        })
    }, [id])

    const handleSubmit = () => {
        let data = {...formResponses, json_schema: schema, ui_schema: uiSchema}
        console.log(typeof data)
        console.log(data)
        firebase.firestore().collection('stage').doc(id).set(data, {merge: true}).then(() => history.push('/t/' + id))

        // console.log(formResponses)
        // console.log(schema)
        // console.log(uiSchema)
    }

    return (
        <div>
            <FormBuilder
                schema={schema}
                uischema={uiSchema}
                onChange={(newSchema: string, newUiSchema: string) => {
                    setSchema(newSchema)
                    setUiSchema(newUiSchema)
                }}
            />
            <div style={{width: '70%', minWidth: '400px', margin: '0 auto', display: 'block', padding: 10}}>
                <Form
                    schema={StageOptions as JSONSchema7}
                    formData={formResponses}
                    onChange={(e: { formData: object }) => setFormResponses(e.formData)}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    )
}

export default Builder


