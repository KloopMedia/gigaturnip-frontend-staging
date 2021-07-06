import React, {useEffect, useState} from "react";
import firebase from '../../util/Firebase'
import Form from "@rjsf/bootstrap-4";
import {useParams} from "react-router-dom";
import {JSONSchema7} from "json-schema";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Grid} from "@material-ui/core";
import axios from '../../util/Axios'
import {conditionalstagesUrl, taskstagesUrl} from "../../util/Urls";
import GetFormFields from './GetFormFields'

type RouterParams = { id: string }

const Builder = () => {
    const {id} = useParams<RouterParams>();

    const [ready, setReady] = useState(false)
    const [fields, setFields] = useState<string[]>([]);
    const [schema, setSchema] = useState<{}>({})
    const [uiSchema, setUiSchema] = useState({
        logic_array: {
            items: {
                'ui:order': [
                    'field',
                    'condition',
                    'value'
                ]
            }
        },
        'ui:order': [
            'logic_array'
        ]
    })
    const [formResponses, setFormResponses] = useState({})
    const [connectedStages, setConnectedStages] = useState<any[]>()


    useEffect(() => {
        const getStage = (stageId?: number | string) => {
            if (stageId) {
                let taskStage = axios.get(taskstagesUrl + stageId + '/').then(res => res.data)
                if (taskStage) {
                    return taskStage
                } else {
                    return axios.get(conditionalstagesUrl + stageId + '/').then(res => res.data)
                }
            }
            return axios.get(conditionalstagesUrl + id + '/').then(res => res.data)
        }

        const getConnectedStages = async (ids: number[]) => {
            return ids.map(async connId => {
                let stage = await getStage(connId)
                return {[connId]: stage}
            })
        }

        const getData = async () => {
            let currentStage = await getStage()
            setFormResponses(currentStage.conditions)

            let connectedIds = currentStage.in_stages
            let connStages = await getConnectedStages(connectedIds)
            if (Object.keys(connStages).length > 0) {
                setReady(true)
            }

            Promise.all(connStages).then(res => {
                setConnectedStages(res)
            })
        }

        if (id) {
            getData()
        }

    }, [id])

    useEffect(() => {
        if (connectedStages && connectedStages.length > 0) {
            console.log(connectedStages)
            connectedStages.forEach(stageObject => {
                let stage = Object.values(stageObject)[0] as any
                let ui = stage.ui_schema
                let sc = stage.json_schema
                let fields = GetFormFields(sc, {}, ui)
                setFields(fields)
            })
        }
    }, [connectedStages])

    useEffect(() => {
        setSchema({
            items: {
                type: 'object',
                title: 'Logic',
                properties: {
                    field: {
                        enum: fields,
                        title: 'Field',
                        type: 'string'
                    },
                    condition: {
                        enum: [
                            '==',
                            '!=',
                            '>',
                            '<',
                            '>=',
                            '<=',
                            'ARRAY-CONTAINS',
                            'ARRAY-CONTAINS-NOT'
                        ],
                        title: 'Condition',
                        type: 'string'
                    },
                    value: {
                        title: 'Value',
                        type: 'string'
                    }
                },
                dependencies: {},
                required: []
            },
            title: 'Logic Array',
            type: 'array',
            dependencies: {},
            required: []
        })
    }, [fields])

    const handleSubmit = () => {
        let data = {conditions: formResponses}
        console.log(formResponses)

        axios
            .patch(conditionalstagesUrl + id + '/', data)
            .then((res: any) => console.log(res.data))
            .catch((err: any) => alert(err));
    }

    return (
        <div style={{width: '70%', minWidth: '400px', margin: '0 auto', display: 'block', padding: 10}}>
            {ready ?
                <Form
                    schema={schema as JSONSchema7}
                    formData={formResponses}
                    onChange={(e: { formData: object }) => setFormResponses(e.formData)}
                    onSubmit={handleSubmit}/>
                :
                <p>No node connection or end_ui detected. Connect to one or check if form has fields.</p>}
        </div>
    )
}

export default Builder


