import React, {useEffect, useState} from 'react';
import useAxios from "../../../services/api/useAxios";
import {useParams} from "react-router-dom";
import useHelpers from "../../../utils/hooks/UseHelpers";
import {Box, Checkbox, FormControlLabel} from "@mui/material";
import Form from "../../../components/form/Form";

const LogicBuilder = () => {
    const {getConditionalStage, saveConditionalStage, getTaskStage} = useAxios();
    const {stageId} = useParams();
    const {parseId, getFormFields} = useHelpers();
    const parsedId = parseId(stageId);

    const [schema, setSchema] = useState({});
    const [formData, setFormData] = useState({});
    const [isPingPong, setPingPong] = useState(false);
    const [connectedStages, setConnectedStages] = useState<any[]>();
    const [ready, setReady] = useState(false)
    const [fields, setFields] = useState<string[]>([]);


    useEffect(() => {
        getConditionalStage(parsedId).then(stage => {
            setFormData(stage.conditions)
            setPingPong(stage.pingpong)
        })
    }, [parsedId])

    useEffect(() => {
        const getStage = (stageId?: number) => {
            if (stageId) {
                const taskStage = getTaskStage(stageId);
                if (taskStage) {
                    return taskStage
                } else {
                    return getConditionalStage(stageId)
                }
            }
            return getConditionalStage(parsedId)
        }

        const getConnectedStages = (ids: number[]) => {
            return ids.map(async connId => {
                let stage = await getStage(connId)
                return {[connId]: stage}
            })
        }

        const getData = async () => {
            const currentStage = await getStage();

            let connectedIds;
            if (isPingPong) {
                connectedIds = currentStage.out_stages;
            } else {
                connectedIds = currentStage.in_stages;
            }
            if (connectedIds) {
                const connStages = await Promise.all(getConnectedStages(connectedIds));
                if (Object.keys(connStages).length > 0) {
                    setConnectedStages(connStages)
                    setReady(true)
                }
            }
        }

        if (parsedId) {
            getData()
        }

    }, [parsedId, isPingPong])

    useEffect(() => {
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
                    // Create tmp schema for function to work
                    const fictionalSchema = {type: "object", ...nested};
                    return getFormFields(fictionalSchema)
                }).flat()
            }
            return []
        }

        if (connectedStages && connectedStages.length > 0) {
            const allFields = connectedStages.map(stageObject => {
                let stage = Object.values(stageObject)[0] as any;
                let stageSchema = stage.json_schema ? JSON.parse(stage.json_schema) : {};

                // Get dependencies from stage's schema
                let dependencies = {};
                if (stageSchema && stageSchema.dependencies && Object.keys(stageSchema.dependencies).length > 0) {
                    dependencies = stageSchema.dependencies
                }

                // Return fields from schema's properties and dependencies
                const dependenciesValues = Object.values(dependencies);
                const formFields = getFormFields(stageSchema);
                let depFields = [];
                if (dependenciesValues.length > 0) {
                    depFields = dependenciesValues.map((dep: any) => getDependentFields(dep)).flat()
                }
                return Array.from(new Set([...formFields, ...depFields]))
            }).flat()

            setFields(allFields)
        }
    }, [connectedStages])

    useEffect(() => {
        console.log("fields", fields)
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
        let data = {conditions: formData, pingpong: isPingPong}

        saveConditionalStage(parsedId, data)
            .then((res: any) => alert("Saved"))
            .catch((err: any) => alert(err));
    }

    const handleChangePingPong = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPingPong(event.target.checked);
    }

    if (!ready) {
        return <p>No node connection or end_ui detected. Connect to one or check if form has fields.</p>
    }

    return (
        <Box sx={{width: '70%', minWidth: '400px', margin: '0 auto'}} pb={3}>
            <FormControlLabel
                control={<Checkbox checked={isPingPong} onChange={handleChangePingPong} name="PingPong"
                                   color="primary"/>}
                label="Ping Pong"
            />
            <Form
                schema={schema}
                formData={formData}
                onChange={(formData) => setFormData(formData)}
                onSubmit={handleSubmit}/>
        </Box>
    );
};

export default LogicBuilder