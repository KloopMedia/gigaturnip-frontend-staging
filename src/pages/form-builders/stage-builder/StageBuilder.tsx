import React, {useEffect, useState} from 'react';
import useAxios from "../../../services/api/useAxios";
import {useParams} from "react-router-dom";
import useHelpers from "../../../utils/hooks/UseHelpers";
import {ViewModeProps} from "./StageBuilder.types";
import ViewModeSetter from "./view-mode-setter/ViewModeSetter";
import Builder from "./builder/Builder";
import TextEditor from "../../../components/text-editor/TextEditor";
import {Box, Button} from "@mui/material";
import Preview from "./preview/Preview";
import SchemaEditor from "./schema-editor/SchemaEditor";

const StageBuilder = () => {
    const {stageId} = useParams();
    const {getTaskStage, saveTaskStage} = useAxios();
    const {parseId} = useHelpers();
    const parsedId = parseId(stageId);

    const [schema, setSchema] = useState('');
    const [uiSchema, setUiSchema] = useState('');
    const [formData, setFormData] = useState<any>({});
    const [viewMode, setViewMode] = useState<ViewModeProps>("builder");
    const [textEditorData, setTextEditorData] = useState("");
    const [isEditable, setEditable] = useState(false);
    const [tmpSchema, setTmpSchema] = useState("");
    const [tmpUi, setTmpUi] = useState("");
    const [originalSchema, setOriginalSchema] = useState("")
    const [originalUi, setOriginalUi] = useState("")

    useEffect(() => {
        const getStage = async (parsedId: number) => {
            const stage = await getTaskStage(parsedId);
            const {id, json_schema, ui_schema, rich_text, webhook_address, webhook_params, ...options} = stage;

            options["webhook_address"] = webhook_address ? webhook_address : undefined
            options["webhook_params"] = webhook_params ? JSON.stringify(webhook_params) : undefined

            setSchema(json_schema)
            setUiSchema(ui_schema)
            setTmpSchema(json_schema)
            setTmpUi(ui_schema)
            setOriginalSchema(json_schema)
            setOriginalUi(ui_schema)
            setFormData(options)
            setTextEditorData(rich_text)
        }

        if (parsedId) {
            getStage(parsedId)
        }
    }, [parsedId])

    const handleSubmit = () => {
        const {chain, webhook_params, ...responses} = formData;
        const parsed_webhook_params = webhook_params ? JSON.parse(webhook_params) : null;

        const data = {
            ...responses,
            json_schema: schema,
            ui_schema: uiSchema,
            rich_text: textEditorData,
            webhook_params: parsed_webhook_params
        }

        saveTaskStage(parsedId, data)
            .then((res: any) => alert("Saved"))
            .catch((err: any) => alert(err));
    }

    const handleSchemaChange = (schema: string, ui: string) => {
        setSchema(schema)
        setUiSchema(ui)
        setOriginalSchema(schema)
        setOriginalUi(ui)
        setTmpSchema(schema)
        setTmpUi(ui)
    }

    const handleFormDataChange = (formData: object) => {
        setFormData(formData)
    }

    const handleTextChange = (d: string) => {
        setTextEditorData(d)
    }

    const handleViewModeChange = (mode: ViewModeProps) => {
        setViewMode(mode)
    }

    const handleIsEditableChange = () => {
        setEditable(!isEditable)
    }

    const handleTmpSchemaChange = (schema: string) => {
        setTmpSchema(schema)
    }

    const handleTmpUiChange = (ui: string) => {
        setTmpUi(ui)
    }

    const handleTmpSave = () => {
        setSchema(tmpSchema)
        setUiSchema(tmpUi)
    }

    const handleTmpUndo = () => {
        setSchema(originalSchema)
        setUiSchema(originalUi)
        setTmpSchema(originalSchema)
        setTmpUi(originalUi)
    }

    const renderContent = (mode: ViewModeProps) => {
        switch (mode) {
            case "builder":
                return <Builder
                    schema={schema}
                    uiSchema={uiSchema}
                    formData={formData}
                    onSchemaChange={handleSchemaChange}
                    onFormDataChange={handleFormDataChange}
                />;
            case "text":
                return <Box sx={{width: '70%', minWidth: '400px', margin: '0 auto'}}>
                    <TextEditor data={textEditorData} onChange={handleTextChange}/>
                </Box>;
            case "preview":
                return <Preview schema={schemaJson} uiSchema={uiJson} text={textEditorData}/>;
            case "editor":
                return <SchemaEditor isEditable={isEditable} schema={tmpSchema} ui={tmpUi}
                                     onSchemaChange={handleTmpSchemaChange} onUiChange={handleTmpUiChange}
                                     onIsEditableChange={handleIsEditableChange} onSave={handleTmpSave}
                                     onUndo={handleTmpUndo}/>
        }
    }

    const schemaJson = schema ? JSON.parse(schema) : {};
    const uiJson = uiSchema ? JSON.parse(uiSchema) : {};

    return (
        <Box>
            <Box display={"flex"} justifyContent={"flex-end"}>
                <ViewModeSetter mode={viewMode} onChange={handleViewModeChange}/>
            </Box>
            {renderContent(viewMode)}
            {viewMode === "builder" && <Box sx={{width: '70%', minWidth: '400px', margin: '0 auto'}} pb={3}>
                <Button variant={"contained"} color={"warning"} fullWidth onClick={handleSubmit}>Сохранить</Button>
            </Box>}
        </Box>
    );
};

export default StageBuilder