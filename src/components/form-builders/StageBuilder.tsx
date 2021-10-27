import React, {useEffect, useState} from "react";
// @ts-ignore
import {FormBuilder} from '@ginkgo-bioworks/react-json-schema-form-builder';
import Form from "@rjsf/bootstrap-4";
import StageOptions from '../../json-schema/StageOptions_v2.json'
import {useParams} from "react-router-dom";
import {JSONSchema7} from "json-schema";
import PreviewStage from './PreviewStage'
import CustomFileType from '../custom-widgets/file-widget/CustomFileType'
import CustomAutoCompleteType from '../custom-widgets/autocomplete/AutoCompleteType'

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "../../util/Axios";
import {taskstagesUrl} from "../../util/Urls";
import {IconButton} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import CreateIcon from '@material-ui/icons/Create';
import {RouterParams} from "../../util/Types";
import TextEditor from "../text-editor/TextEditor";
import TextViewer from "../text-editor/TextViewer";


const Builder = () => {
    let {id} = useParams<RouterParams>();

    const [schema, setSchema] = useState('')
    const [uiSchema, setUiSchema] = useState('')
    const [optionsSchema, setOptionsSchema] = useState<{ [index: string]: any }>(StageOptions)
    const [formResponses, setFormResponses] = useState<{ [index: string]: any }>({})
    const [preview, setPreview] = useState(false)
    const [editorView, setEditorView] = useState(false)
    const [editorData, setEditorData] = useState("")

    useEffect(() => {
        const getStage = () => {
            axios.get(taskstagesUrl + id + '/')
                .then(res => res.data)
                .then(res => {
                    const {id, json_schema, ui_schema, rich_text, webhook_address, webhook_params, ...options} = res

                    options["webhook_address"] = webhook_address ? webhook_address : undefined
                    options["webhook_params"] = webhook_params ? JSON.stringify(webhook_params) : undefined

                    setSchema(json_schema)
                    setUiSchema(ui_schema)
                    setFormResponses(options)
                    setEditorData(rich_text)
                })
        }

        if (id) {
            getStage()
        }
    }, [id])

    const handleSubmit = () => {
        console.log("JSON SCHEMA", schema)
        console.log("UI SCHEMA", uiSchema)

        const {chain, webhook_params, ...responses} = formResponses

        const parsed_webhook_params = webhook_params ? JSON.parse(webhook_params) : null;

        const data = {...responses, json_schema: schema, ui_schema: uiSchema, rich_text: editorData, webhook_params: parsed_webhook_params}
        console.log(JSON.stringify(data))
        axios
            .patch(taskstagesUrl + id + '/', data)
            .then((res: any) => alert("Saved"))
            .catch((err: any) => alert(err));
    }

    const changePreviewMode = () => {
        setPreview(p => !p)
    }

    const handleJsonSchemaChange = (schema: string) => {
        setSchema(schema)
    }

    const handleUiSchemaChange = (schema: string) => {
        setUiSchema(schema)
    }

    const handleEditorChange = (d: string) => {
        console.log(d)
        setEditorData(d)
    }

    const handleEditorViewMode = () => {
        setEditorView(!editorView)
    }

    return (
        <div>
            <div style={{display: 'block', float: 'right'}}>
                <IconButton onClick={handleEditorViewMode}>
                    <CreateIcon fontSize={"large"}/>
                </IconButton>
                <IconButton onClick={changePreviewMode}>
                    {!preview ?
                        <VisibilityIcon fontSize={"large"}/>
                        :
                        <VisibilityOffIcon fontSize={"large"}/>
                    }
                </IconButton>
            </div>
            {!preview ?
                <div>
                    {editorView ?
                        <TextEditor data={editorData} handleChange={handleEditorChange}/>
                        :
                        <FormBuilder
                            schema={schema}
                            uischema={uiSchema}
                            onChange={(newSchema: string, newUiSchema: string) => {
                                setSchema(newSchema)
                                setUiSchema(newUiSchema)
                            }}
                            mods={
                                {
                                    customFormInputs: {...CustomFileType, ...CustomAutoCompleteType},
                                }
                            }
                        />}
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
                <div style={{width: '70%', minWidth: '400px', margin: '0 auto', display: 'block', padding: 10}}>
                    {editorView ?
                        <TextViewer data={editorData} />
                        :
                        <PreviewStage
                            jsonSchema={schema}
                            uiSchema={uiSchema}
                            formResponses={formResponses}
                            onJsonChange={handleJsonSchemaChange}
                            onUiChange={handleUiSchemaChange}
                        />
                    }
                </div>
            }
        </div>
    )
}

export default Builder


