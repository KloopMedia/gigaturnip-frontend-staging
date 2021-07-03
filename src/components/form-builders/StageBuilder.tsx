import React, {useEffect, useState} from "react";
// @ts-ignore
import {FormBuilder} from '@ginkgo-bioworks/react-json-schema-form-builder';
import Form from "@rjsf/bootstrap-4";
import StageOptions from '../../json-schema/StageOptions_v2.json'
import {useParams} from "react-router-dom";
import {JSONSchema7} from "json-schema";
import PreviewStage from './PreviewStage'

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "../../util/Axios";
import {chainsUrl, taskstagesUrl} from "../../util/Urls";
import {IconButton} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

type RouterParams = { id: string, chainId: string }
type ChainProps = { id: number, name: string, description: string, campaign: number }

const Builder = () => {
    let {id, chainId} = useParams<RouterParams>();

    const [schema, setSchema] = useState('')
    const [uiSchema, setUiSchema] = useState('')
    const [optionsSchema, setOptionsSchema] = useState(StageOptions)
    const [formResponses, setFormResponses] = useState({})
    const [preview, setPreview] = useState(false)

    useEffect(() => {
        const getStage = () => {
            axios.get(taskstagesUrl + id)
                .then(res => res.data)
                .then(res => {
                    const {id, json_schema, ui_schema, ...options} = res
                    let parse_json_schema = JSON.stringify(json_schema)
                    let parse_ui_schema = JSON.stringify(ui_schema)
                    setSchema(parse_json_schema)
                    setUiSchema(parse_ui_schema)
                    setFormResponses(options)
                })
        }
        if (id) {
            getStage()
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

    const changePreviewMode = () => {
        setPreview(p => !p)
    }

    return (
        <div>
            <IconButton style={{float: 'right'}} onClick={changePreviewMode}>
                {!preview ?
                    <VisibilityIcon fontSize={"large"} />
                    :
                    <VisibilityOffIcon fontSize={"large"} />
                }

            </IconButton>
            {!preview ?
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
                :
                <PreviewStage jsonSchema={schema} uiSchema={uiSchema} formResponses={formResponses}/>
            }
        </div>
    )
}

export default Builder


