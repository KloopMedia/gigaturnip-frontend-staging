import React, {useEffect, useState} from "react";
import firebase from '../../util/Firebase'
import Form from "@rjsf/bootstrap-4";
import {useParams} from "react-router-dom";
import {JSONSchema7} from "json-schema";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Grid} from "@material-ui/core";
import axios from '../../util/Axios'
import {conditionalstagesUrl, taskstagesUrl} from "../../util/Urls";

type RouterParams = { id: string }

const Builder = () => {
    const {id} = useParams<RouterParams>();

    const [ready, setReady] = useState(false)
    const [schema, setSchema] = useState({
        type: 'object',
        properties: {
            logic_array: {
                items: {
                    type: 'object',
                    title: 'Logic',
                    properties: {
                        field: {
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
                                '<='
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
                type: 'array'
            }
        },
        dependencies: {},
        required: []
    })
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
        // firebase.firestore().collection('flow-edges').where('target', '==', id).get().then(edges => {
        //     edges.forEach(edge => {
        //         let source = edge.data().source
        //         firebase.firestore().collection('stage').doc(source).get().then(doc => {
        //             if (doc && doc.exists) {
        //                 let data = doc.data()
        //                 if (data && data.hasOwnProperty('end_ui')) {
        //                     let end_ui = JSON.parse(data.end_ui)
        //                     if (end_ui.hasOwnProperty('ui:order')) {
        //                         console.log(end_ui['ui:order'])
        //                         setSchema(ps => {
        //                             let ns = {...ps}
        //                             ns.properties.field.enum = end_ui['ui:order']
        //                             console.log(ns)
        //                             return ns
        //                         })
        //                         setReady(true)
        //                     }
        //                 }
        //             }
        //         })
        //     })
        // })
        // setReady(true)
        // firebase.firestore().collection('flow-logic').doc(id).get().then(doc => {
        //     if (doc && doc.exists) {
        //         let data = doc.data()
        //         if (data) {
        //             setFormResponses(data)
        //         }
        //     }
        // })
        const getStage = (stageId?: number | string) => {
            if (stageId) {
                let taskStage = axios.get(taskstagesUrl + stageId).then(res => res.data)
                if (taskStage) {
                    return taskStage
                } else {
                    return axios.get(conditionalstagesUrl + stageId).then(res => res.data)
                }
            }
            return axios.get(conditionalstagesUrl + id).then(res => res.data)
        }

        const getConnectedStages = async (ids: number[]) => {
            return ids.map(async connId => {
                let stage = await getStage(connId)
                return {[connId]: stage}
            })
        }

        const getData = async () => {
            let currentStage = await getStage()
            let connectedIds = currentStage.in_stages
            let connStages = await getConnectedStages(connectedIds)
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
            connectedStages.forEach(stage => {
                let json_schema = stage.json_schema
                let ui_schema = stage.ui_schema
            })
        }
    }, [connectedStages])

    const handleSubmit = () => {
        console.log(JSON.stringify(formResponses))
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


