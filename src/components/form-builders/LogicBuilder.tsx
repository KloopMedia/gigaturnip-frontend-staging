import React, {useEffect, useState} from "react";
import Form from "@rjsf/bootstrap-4";
import {useParams} from "react-router-dom";
import {JSONSchema7} from "json-schema";
import 'bootstrap/dist/css/bootstrap.min.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from '../../util/Axios'
import {conditionalstagesUrl, taskstagesUrl} from "../../util/Urls";
import GetFormFields from './GetFormFields'
import getFormFields from './GetFormFields'
import {RouterParams} from "../../util/Types";


const Builder = () => {
    const {id} = useParams<RouterParams>();

    const [ready, setReady] = useState(false)
    const [fields, setFields] = useState<string[]>([]);
    const [schema, setSchema] = useState<{}>({})
    const [formResponses, setFormResponses] = useState({})
    const [connectedStages, setConnectedStages] = useState<any[]>()
    const [pingPong, setPingPong] = useState<boolean>(false)

    useEffect(() => {
        // Get current stage's data
        axios.get(conditionalstagesUrl + id + '/').then(res => res.data).then(currentStage => {
            setFormResponses(currentStage.conditions)
            setPingPong(currentStage.pingpong)
            console.log("PING PONG", currentStage.pingpong)
        })
    }, [id])

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

            let connectedIds: undefined
            if (pingPong) {
                connectedIds = currentStage.out_stages
            } else {
                connectedIds = currentStage.in_stages
            }
            if (connectedIds) {
                let connStages = await getConnectedStages(connectedIds)
                Promise.all(connStages).then(res => {
                    if (Object.keys(res).length > 0) {
                        setConnectedStages(res)
                        setReady(true)
                    }
                })
            }
        }

        if (id) {
            // noinspection JSIgnoredPromiseFromCall
            getData()
        }

    }, [id, pingPong])

    useEffect(() => {
        /**
         * Get fields from dependencies
         * @param dep
         * @returns {any}
         */
        const getDependentFields = (dep: any) => {
            let data = null
            if (dep.hasOwnProperty("oneOf")) {
                data = dep.oneOf
            }
            if (dep.hasOwnProperty("allOf")) {
                data = dep.allOf
            }
            if (data) {
                return data.map((nested: any) => {
                    let fiction = {type: "object", ...nested}
                    return getFormFields(fiction)
                }).flat()
            }
            return []
        }

        if (connectedStages && connectedStages.length > 0) {
            const allFields = connectedStages.map(stageObject => {
                let stage = Object.values(stageObject)[0] as any
                let stageSchema = JSON.parse(stage.json_schema)

                // Get dependencies from stage's schema
                let deps = {}
                if (stageSchema && stageSchema.dependencies && Object.keys(stageSchema.dependencies).length > 0) {
                    deps = stageSchema.dependencies
                }

                // Get fields from schema's properties and dependencies
                const stageFields = GetFormFields(stageSchema)
                const depValues = Object.values(deps)
                let depFields = []
                if (depValues.length > 0) {
                    depFields = depValues.map((dep: any) => getDependentFields(dep)).flat()
                }

                return Array.from(new Set([...stageFields, ...depFields]))
            }).flat()

            setFields(allFields)
        }
    }, [pingPong, connectedStages])

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
        let data = {conditions: formResponses, pingpong: pingPong}
        console.log(formResponses)

        axios
            .patch(conditionalstagesUrl + id + '/', data)
            .then((res: any) => alert("Saved"))
            .catch((err: any) => alert(err));
    }

    const handleChangePingPong = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPingPong(event.target.checked);
    }

    return (
        <div style={{width: '70%', minWidth: '400px', margin: '0 auto', display: 'block', padding: 10}}>
            {ready ?
                <div>
                    <FormControlLabel
                        control={<Checkbox checked={pingPong} onChange={handleChangePingPong} name="PingPong"
                                           color="primary"/>}
                        label="Ping Pong"
                    />
                    <Form
                        schema={schema as JSONSchema7}
                        formData={formResponses}
                        onChange={(e: { formData: object }) => setFormResponses(e.formData)}
                        onSubmit={handleSubmit}/>
                </div>
                :
                <p>No node connection or end_ui detected. Connect to one or check if form has fields.</p>}
        </div>
    )
}

export default Builder


