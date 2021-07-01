import React, {useEffect, useState} from "react";
import Form from "@rjsf/bootstrap-4";
import {useParams} from "react-router-dom";
import axios from "../../util/Axios";
import {casesUrl, taskstagesUrl, tasksUrl} from '../../util/Urls'

type RouterParams = { id: string }

const Builder = () => {
    const [schema, setSchema] = useState({})
    const [uiSchema, setUiSchema] = useState({})
    const [formResponses, setFormResponses] = useState({})
    let {id} = useParams<RouterParams>();

    useEffect(() => {
        const getTask = () => {
            return axios.get(tasksUrl + id)
                .then(res => res.data)
        }
        const getStage = (stageId: string | number) => {
            return axios.get(taskstagesUrl + stageId).then(res => res.data)
        }
        const setFormData = async () => {
            let task = await getTask()
            let stage = await getStage(task.stage)
            console.log(task, stage)
            setFormResponses(task.responses)
            setSchema(stage.json_schema)
            setUiSchema(stage.ui_schema)
        }
        if (id) {
            setFormData()
        }
    }, [id])

    const handleSubmit = () => {
        console.log(formResponses)
        let data = {responses: formResponses}
        axios.patch(tasksUrl + id, data)
        // .then(res => res.data)
        // .then(res => {
        //     console.log(res)
        //     setFormResponses(res.responses)
        //     setSchema(res.stage.json_schema)
        //     setUiSchema(res.stage.ui_schema)
        // })
    }

    return (
        <div style={{width: '70%', minWidth: '400px', margin: '0 auto', display: 'block', padding: 10}}>
            <Form schema={schema} uiSchema={uiSchema} formData={formResponses}
                  onChange={(e) => setFormResponses(e.formData)} onSubmit={handleSubmit}/>
        </div>
    )
}


export default Builder


