import React, { useEffect, useState } from "react";
import { FormBuilder } from '@ginkgo-bioworks/react-json-schema-form-builder';
import firebase from '../../util/Firebase'
import Form from "@rjsf/bootstrap-4";
// import caseType from '../case_type.json'
import caseStage from '../../case_stage.json'
import {
    useHistory,
    useParams
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

const Builder = () => {
    const [schema, setSchema] = useState('')
    const [uiSchema, setUiSchema] = useState('')
    const [formResponses, setFormResponses] = useState({})
    let { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        firebase.firestore().collection('stage').doc(id).get().then(doc => {
            if (doc && doc.exists) {
                let data = doc.data()
                if (data.end) {
                    setSchema(data.end)
                }
                if (data.end_ui) {
                    setUiSchema(data.end_ui)
                }
                setFormResponses(doc.data())
            }
        })
    }, [id])

    const handleSubmit = (e) => {
        let data = { ...formResponses, end: schema, end_ui: uiSchema }
        console.log(typeof data)
        firebase.firestore().collection('stage').doc(id).set(data, { merge: true }).then(() => history.push('/t/' + id))

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
                }}
            />
            <div style={{ width: '70%', minWidth: '400px', margin: '0 auto', display: 'block', padding: 10 }}>
                <Form
                    schema={caseStage}
                    formData={formResponses}
                    onChange={(e) => setFormResponses(e.formData)}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    )
}

export default Builder


