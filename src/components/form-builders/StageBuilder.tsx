import React, {useEffect, useState} from "react";
// @ts-ignore
import {FormBuilder} from '@ginkgo-bioworks/react-json-schema-form-builder';
import Form from "@rjsf/bootstrap-4";
import StageOptions from '../../json-schema/StageOptions_v2.json'
import {useParams} from "react-router-dom";
import {JSONSchema7} from "json-schema";
import PreviewStage from './PreviewStage'
import CustomFileType from '../custom-widgets/file-widget/CustomFileType'

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
    let {id, chainId} = useParams<RouterParams>();

    const [schema, setSchema] = useState('')
    const [uiSchema, setUiSchema] = useState('')
    const [optionsSchema, setOptionsSchema] = useState<{ [index: string]: any }>(StageOptions)
    const [formResponses, setFormResponses] = useState<{ [index: string]: any }>({})
    const [preview, setPreview] = useState(false)
    const [editorView, setEditorView] = useState(false)
    const [editorData, setEditorData] = useState("")

    // const [existingRanks, setExistingRanks] = useState<any[]>([])
    // const [isByRanks, setIsByRanks] = useState<boolean>(true)
    // const [recipients, setRecipients] = useState<string[]>([])
    // const [allInStages, setAllInStages] = useState<string[]>([])
    // const [ranksLimits, setRanksLimits] = useState([])

    useEffect(() => {
        /*const getAllInStages = (prevTask: number[], previousStages: number[]) => {
            if (prevTask[0]) {
                axios.get(taskstagesUrl + prevTask[0] + '/')
                    .then(res => res.data)
                    .then(res => {
                        let previousInStage = res.in_stages;
                        if (previousInStage[0]) {
                            previousStages.push(previousInStage[0])
                            getAllInStages(res.in_stages, previousStages)
                        } else {
                            setAllInStages(previousStages.map(String))
                        }
                    })
            }
        }*/
        /* const getAllRanks = () => {
            axios.get(ranksUrl)
                .then(res => res.data).then(res => {
                setExistingRanks(res)
            })
        }*/
        const getStage = () => {
            axios.get(taskstagesUrl + id + '/')
                .then(res => res.data)
                .then(res => {
                    const {id, json_schema, ui_schema, rich_text, webhook_address, webhook_params, ...options} = res

                    options["webhook_address"] = webhook_address ? webhook_address : undefined
                    options["webhook_params"] = webhook_params ? JSON.stringify(webhook_params) : undefined

                    // let parse_json_schema = JSON.parse(json_schema)
                    // let parse_ui_schema = JSON.parse(ui_schema)
                    // console.log(parse_json_schema)
                    // console.log(parse_ui_schema)
                    // // getAllInStages(res.in_stages, res.in_stages)
                    setSchema(json_schema)
                    setUiSchema(ui_schema)
                    setFormResponses(options)
                    setEditorData(rich_text)
                })
        }

        if (id) {
            getStage()
            // getAllRanks()
        }
    }, [id])

    /*function formPropsForSchema(arrayOfNames: string[]) {
        let propsForSchema: { [index: string]: { [index: string]: string } } = {};
        arrayOfNames.forEach((rank, index, array) => {
            propsForSchema[index.toString()] = {title: rank, type: "boolean"}
        })
        return propsForSchema;
    }

    const getRanksLimits = () => {
            axios.get(rankslimitsUrl)
                .then(res => res.data)
                .then(res => {
                    setRanksLimits(res)
                })
        }

    useEffect(() => {
        if (formResponses) {
            let transition: { [index: string]: { [index: string]: any } } = formResponses['transition']
            if (transition) {
                let sentBy = transition['assign_user_by']
                if (sentBy) {
                    let whichSent: string = formResponses['transition']['assign_user_by'];
                    if (whichSent === 'ranks') {
                        getRanksLimits()
                        setIsByRanks(true)
                    } else if (whichSent === 'prevStage') {
                        setRanksLimits([])
                        setIsByRanks(false)
                    }
                }
            }
        }
    }, [formResponses])

    useEffect(() => {
        if (existingRanks) {
            let propExistingRanks = formPropsForSchema(existingRanks.map(item => item.name));
            let newOptionSchema = optionsSchema;
            newOptionSchema.properties.transition.dependencies.assign_user_by.oneOf[0].properties.ranks.properties = propExistingRanks;
            setOptionsSchema(newOptionSchema)
        }
    }, [existingRanks])

    useEffect(() => {
        let propPrevInStages = formPropsForSchema(allInStages);
        let newOptionSchema = optionsSchema;
        newOptionSchema.properties.transition.dependencies.assign_user_by.oneOf[1].properties.by_previous_stages.properties = propPrevInStages;
        setOptionsSchema(newOptionSchema)
    }, [allInStages])*/

    const handleSubmit = () => {
        /*let transition: { [key: string]: string | any } = formResponses['transition'];

        if (transition['assign_user_by'] === 'ranks') {
            // debugger
            existingRanks.forEach((item, index, array) => {
                if (transition['ranks'][index]) {
                    let formdata = {
                        open_limit: 0,
                        total_limit: 0,
                        list_permission: false,
                        close_submission: false,
                        close_selection: false,
                        stage: +id,
                        rank: item['id']
                    }

                    let existingRank: boolean[] = [];
                    ranksLimits.forEach((rankLimit) => {
                        if (rankLimit['rank'] === item['id'] && rankLimit['stage'] === +id) {
                            existingRank.push(true)
                        } else {
                            existingRank.push(false)
                        }
                    })

                    if (existingRank.includes(false) || !(ranksLimits.length != 0)) {
                        axios
                            .post(rankslimitsUrl, formdata)
                            // .then((res: any) => alert("Saved"))
                            .catch((err: any) => alert(err));
                    }

                } else {
                    ranksLimits.forEach((rankLimit) => {
                        // console.log(rankLimit['rank'], item['id'])
                        // console.log(rankLimit['stage'], +id)
                        // console.log('========')
                        if (rankLimit['rank'] === item['id'] && rankLimit['stage'] === +id) {
                            axios
                                .delete(rankslimitsUrl + rankLimit['id'] + '/')
                                // .then((res: any) => alert("Delete rankLimit for " + item['name'] + " rank"))
                                .catch((err: any) => alert(err));
                        }
                    })

                }
            })
        } else if (transition['assign_user_by'] === 'prevStage') {
        }*/

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
        // let parsed = JSON.parse(schema)
        setSchema(schema)
    }

    const handleUiSchemaChange = (schema: string) => {
        // let parsed = JSON.parse(schema)
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
                                    customFormInputs: {...CustomFileType}
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
                    {/*<div>
                        {JSON.stringify(ranksLimits)}
                    </div>*/}


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


