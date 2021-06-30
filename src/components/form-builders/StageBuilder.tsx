import React, {useEffect, useState} from "react";
// @ts-ignore
import {FormBuilder} from '@ginkgo-bioworks/react-json-schema-form-builder';
import Form from "@rjsf/bootstrap-4";
import StageOptions from '../../json-schema/StageOptions_v2.json'
import {useParams} from "react-router-dom";
import {JSONSchema7} from "json-schema";

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "../../util/Axios";
import {chainsUrl, taskstagesUrl} from "../../util/Urls";

type RouterParams = { id: string, chainId: string }
type ChainProps = { id: number, name: string, description: string, campaign: number }

const Builder = () => {
    const [schema, setSchema] = useState('')
    const [uiSchema, setUiSchema] = useState('')
    const [optionsSchema, setOptionsSchema] = useState(StageOptions)
    const [formResponses, setFormResponses] = useState({})

    let {id, chainId} = useParams<RouterParams>();

    useEffect(() => {
        const setChains = () => {
            axios.get(taskstagesUrl + id)
                .then(res => res.data)
                .then(res => {
                    console.log(res)
                    const {id, ...options} = res
                    setFormResponses(options)
                })
        }
        if (id) {
            setChains()
        }
    }, [id])

    const handleSubmit = () => {
        let json_schema = null
        let ui_schema = null
        if (schema && uiSchema) {
            json_schema = JSON.parse(schema)
            ui_schema = JSON.parse(uiSchema)
        }

        let data = {...formResponses, json_schema: json_schema, ui_schema: ui_schema}
        console.log(data)

        axios
            .patch(taskstagesUrl + id, data)
            .then((res: any) => console.log(res.data))
            .catch((err: any) => alert(err));
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
                    schema={optionsSchema as JSONSchema7}
                    formData={formResponses}
                    onChange={(e: { formData: object }) => setFormResponses(e.formData)}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    )
}

export default Builder


