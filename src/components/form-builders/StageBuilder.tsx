import React, {ChangeEvent, useEffect, useState} from "react";
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
import {chainsUrl, taskstagesUrl} from "../../util/Urls";
import {IconButton} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import {Autocomplete} from '@material-ui/lab';
import {TextField, FormControlLabel, FormGroup, Switch} from '@material-ui/core';

type RouterParams = { id: string, chainId: string }
type ChainProps = { id: number, name: string, description: string, campaign: number }

const Builder = () => {
    let {id, chainId} = useParams<RouterParams>();

    const [schema, setSchema] = useState('')
    const [uiSchema, setUiSchema] = useState('')
    const [optionsSchema, setOptionsSchema] = useState<{ [index: string]: any }>(StageOptions)
    const [formResponses, setFormResponses] = useState({})
    const [preview, setPreview] = useState(false)
    const [existingRanks, setExistingRanks] = useState<string[]>(["rank A", "rank B", "rank C"])
    const [isByRanks, setIsByRanks] = useState<boolean>(true)
    const [recipients, setRecipients] = useState<string[]>([])
    const [allInStages, setAllInStages] = useState<string[]>([])

    useEffect(() => {
        const getAllInStages = (prevTask: number[], previousStages: number[]) => {
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
        }

        const getStage = () => {
            axios.get(taskstagesUrl + id + '/')
                .then(res => res.data)
                .then(res => {
                    const {id, json_schema, ui_schema, ...options} = res
                    let parse_json_schema = JSON.stringify(json_schema)
                    let parse_ui_schema = JSON.stringify(ui_schema)
                    getAllInStages(res.in_stages, res.in_stages)
                    // setInStages([...inStages, res.in_stages[0]])
                    setSchema(parse_json_schema)
                    setUiSchema(parse_ui_schema)
                    setFormResponses(options)
                })
        }

        /*const getAllRanks = () => {
            axios.get(taskstagesUrl + id + '/')
                .then(res => res.data).then(res => {
                console.log(res)
                setExistingRanks(['']);
            })
        }*/

        if (id) {
            getStage()
        }
    }, [id])

    function formPropsForSchema(arrayOfNames: string[]) {
        let propsForSchema: { [index: string]: { [index: string]: string } } = {};
        arrayOfNames.forEach((rank, index, array) => {
            propsForSchema[index.toString()] = {title: rank, type: "boolean"}
        })
        return propsForSchema;
    }

    useEffect(() => {
        let propExistingRanks = formPropsForSchema(existingRanks);
        let propPrevInStages = formPropsForSchema(allInStages);
        let newOptionSchema = optionsSchema;
        newOptionSchema.properties.transition.dependencies.sent_by.oneOf[0].properties.ranks.properties = propExistingRanks;
        newOptionSchema.properties.transition.dependencies.sent_by.oneOf[1].properties.in_stages.properties = propPrevInStages;
        setOptionsSchema(newOptionSchema)
    }, [existingRanks, allInStages])

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
            .patch(taskstagesUrl + id + '/', data)
            .then((res: any) => alert("Saved"))
            .catch((err: any) => alert(err));
    }

    const changePreviewMode = () => {
        setPreview(p => !p)
    }

    useEffect(() => {
        setRecipients([])
    }, [isByRanks])
    const getRecipients = (event: ChangeEvent<{}>, newValue: string[] | null) => {
        if (newValue != null) {
            setRecipients(newValue)
        }
        console.log(newValue)
    }
    return (
        <div>
            <IconButton style={{float: 'right'}} onClick={changePreviewMode}>
                {!preview ?
                    <VisibilityIcon fontSize={"large"}/>
                    :
                    <VisibilityOffIcon fontSize={"large"}/>
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
                        mods={
                            {
                                customFormInputs: {...CustomFileType}
                            }
                        }
                    />
                    <div style={{width: "70%", margin: "0 auto"}}>
                    </div>
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


