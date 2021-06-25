import React, {useEffect, useState} from "react";
// @ts-ignore
import {FormBuilder} from '@ginkgo-bioworks/react-json-schema-form-builder';
import firebase from '../../util/Firebase'
import Form from "@rjsf/bootstrap-4";
import StageOptions from '../../json-schema/StageOptions_v2.json'
import {
    useHistory,
    useParams
} from "react-router-dom";
import {JSONSchema7} from "json-schema";

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

type RouterParams = { id: string }
type ChainProps = { id: number, name: string, description: string, campaign: number }

const Builder = () => {
    const [schema, setSchema] = useState('')
    const [uiSchema, setUiSchema] = useState('')
    const [optionsSchema, setOptionsSchema] = useState({})

    const [formResponses, setFormResponses] = useState({})
    // const [chains, setChains] = useState([])

    let {id} = useParams<RouterParams>();
    const history = useHistory();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/allchains/')
            .then(res => res.data)
            .then(res => {
                let chains = res
                let options: any = StageOptions
                let enumValues: number[] = []
                let enumNames: string[] = []
                chains.forEach((chain: ChainProps) => {
                    enumValues.push(chain.id)
                    enumNames.push(`${chain.name}: ${chain.description}`)
                })
                options.properties.chain.enum = enumValues
                options.properties.chain.enumNames = enumNames
                setOptionsSchema(options)
            })
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
            .post("http://127.0.0.1:8000/api/v1/alltaskstages/", data)
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


