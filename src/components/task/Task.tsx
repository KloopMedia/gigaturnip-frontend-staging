import React, {useEffect, useState} from "react";
import firebase from '../../util/Firebase'
import Form from "@rjsf/bootstrap-4";
import {
    useParams
} from "react-router-dom";
import axios from "axios";

type RouterParams = { id: string }

const Builder = () => {
    const [schema, setSchema] = useState({})
    const [uiSchema, setUiSchema] = useState({})
    const [formResponses, setFormResponses] = useState({})
    let {id} = useParams<RouterParams>();
    let taskUrl = '/api/v1/task/' + id

    useEffect(() => {
        axios.get(taskUrl)
            .then(res => res.data)
            .then(res => {
                console.log(res)
                setFormResponses(res.responses)
                setSchema(res.stage.json_schema)
                setUiSchema(res.stage.ui_schema)
            })
    }, [id])

    const handleSubmit = () => {
        console.log(formResponses)
        let data = {responses: formResponses}
        axios.post(taskUrl + '/change', data)
            .then(res => res.data)
            .then(res => {
                console.log(res)
                setFormResponses(res.responses)
                setSchema(res.stage.json_schema)
                setUiSchema(res.stage.ui_schema)
            })
    }

    return (
        <div style={{width: '70%', minWidth: '400px', margin: '0 auto', display: 'block', padding: 10}}>
            <Form schema={schema} uiSchema={uiSchema} formData={formResponses}
                  onChange={(e) => setFormResponses(e.formData)} onSubmit={handleSubmit}/>
        </div>
    )
}


export default Builder


