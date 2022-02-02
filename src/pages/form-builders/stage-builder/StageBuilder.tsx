import React, {useCallback, useEffect, useState} from 'react';
import useAxios from "../../../services/api/useAxios";
import {useNavigate, useParams} from "react-router-dom";
import useHelpers from "../../../utils/hooks/UseHelpers";
import {ViewModeProps} from "./StageBuilder.types";
import Controls from "./controls/Controls";
import Builder from "./builder/Builder";
import {Box, Button} from "@mui/material";
import Preview from "./preview/Preview";
import SchemaEditor from "./schema-editor/SchemaEditor";
import Plugins from "./plugins/Plugins";
import BuilderLayout from "../../../components/layout/common-layouts/BuilderLayout";
import Text from "./text/Text";
import {useToast} from "../../../context/toast/hooks/useToast";
import BuildIcon from "@mui/icons-material/Build";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import debounce from 'lodash.debounce'


const StageBuilder = () => {
    const {stageId} = useParams();
    const navigate = useNavigate();
    const {getTaskStage, saveTaskStage} = useAxios();
    const {parseId} = useHelpers();
    const parsedId = parseId(stageId);
    const {openToast} = useToast();
    const DEBOUNCE_SAVE_DELAY_MS = 2000;

    const [schema, setSchema] = useState('');
    const [uiSchema, setUiSchema] = useState('');
    const [formData, setFormData] = useState<any>({});
    const [viewMode, setViewMode] = useState<ViewModeProps>("builder");
    const [textEditorData, setTextEditorData] = useState("");
    const [isEditable, setEditable] = useState(false);
    const [tmpSchema, setTmpSchema] = useState("");
    const [tmpUi, setTmpUi] = useState("");
    const [originalSchema, setOriginalSchema] = useState("");
    const [originalUi, setOriginalUi] = useState("");

    const schemaJson = schema ? JSON.parse(schema) : {};
    const uiJson = uiSchema ? JSON.parse(uiSchema) : {};

    const VIEW_MODES: any = {
        builder: {title: "Конструктор", icon: <BuildIcon fontSize={"large"}/>},
        // plugins: {title: "Плагины", icon: <ExtensionIcon fontSize={"large"}/>},
        text: {title: "Текст", icon: <EditIcon fontSize={"large"}/>},
        preview: {title: "Превью", icon: <VisibilityIcon fontSize={"large"}/>},
        editor: {title: "Схемы", icon: <CompareArrowsIcon fontSize={"large"}/>},
    }

    useEffect(() => {
        const getStage = async (parsedId: number) => {
            const stage = await getTaskStage(parsedId);
            const {id, json_schema, ui_schema, rich_text, webhook_address, webhook_params, ...options} = stage;

            options["webhook_address"] = webhook_address ? webhook_address : undefined;
            options["webhook_params"] = webhook_params ? JSON.stringify(webhook_params) : undefined;

            setSchema(json_schema);
            setUiSchema(ui_schema);
            setTmpSchema(json_schema);
            setTmpUi(ui_schema);
            setOriginalSchema(json_schema);
            setOriginalUi(ui_schema);
            setFormData(options);
            setTextEditorData(rich_text);
        }

        if (parsedId) {
            getStage(parsedId);
        }
    }, [parsedId])

    const compileData = useCallback(() => {
        const {chain, webhook_params, ...responses} = formData;
        let parsed_webhook_params;
        try {
            parsed_webhook_params = JSON.parse(webhook_params);
        } catch (e) {
            parsed_webhook_params = null;
        }

        return {
            ...responses,
            json_schema: schema,
            ui_schema: uiSchema,
            rich_text: textEditorData,
            webhook_params: parsed_webhook_params
        };
    },[formData, schema, textEditorData, uiSchema])

    const saveData = (data: any) => {
        return saveTaskStage(parsedId, data);
    }

    const debouncedSave = useCallback(debounce((data) => {
        saveData(data)
            .then(() => console.log("saved"))
            .catch(err => openToast(err.message, "error"));
    }, DEBOUNCE_SAVE_DELAY_MS), [])

    useEffect(() => {
        const data = compileData();
        debouncedSave(data);
    }, [formData, schema, uiSchema, textEditorData, debouncedSave, compileData])

    const handleSubmit = () => {
        const data = compileData();
        saveData(data)
            .then(() => openToast("Данные сохранены", "success"))
            .catch(err => openToast(err.message, "error"));
    }

    const handleSchemaChange = (schema: string, ui: string) => {
        setSchema(schema);
        setUiSchema(ui);
        setOriginalSchema(schema);
        setOriginalUi(ui);
        setTmpSchema(schema);
        setTmpUi(ui);
    }

    const handleFormDataChange = (formData: object) => {
        setFormData(formData);
    }

    const handleTextChange = (d: string) => {
        setTextEditorData(d);
    }

    const handleViewModeChange = (mode: ViewModeProps) => {
        setViewMode(mode);
    }

    const handleIsEditableChange = () => {
        setEditable(!isEditable);
    }

    const handleTmpSchemaChange = (schema: string) => {
        setTmpSchema(schema);
    }

    const handleTmpUiChange = (ui: string) => {
        setTmpUi(ui);
    }

    const handleTmpSave = () => {
        setSchema(tmpSchema);
        setUiSchema(tmpUi);
    }

    const handleTmpUndo = () => {
        setSchema(originalSchema);
        setUiSchema(originalUi);
        setTmpSchema(originalSchema);
        setTmpUi(originalUi);
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
            case "plugins":
                return <Plugins/>;
            case "text":
                return <Text data={textEditorData} onChange={handleTextChange}/>;
            case "preview":
                return <Preview schema={schemaJson} uiSchema={uiJson} text={textEditorData}/>;
            case "editor":
                return <SchemaEditor isEditable={isEditable} schema={tmpSchema} ui={tmpUi}
                                     onSchemaChange={handleTmpSchemaChange} onUiChange={handleTmpUiChange}
                                     onIsEditableChange={handleIsEditableChange} onSave={handleTmpSave}
                                     onUndo={handleTmpUndo}/>
        }
    }

    const goBack = () => {
        navigate(-1);
    }

    return (
        <Box>
            <Controls allModes={VIEW_MODES} mode={viewMode} onChange={handleViewModeChange} onBack={goBack}/>
            {renderContent(viewMode)}
            <BuilderLayout pb={3}>
                <Button variant={"contained"} color={"warning"} fullWidth onClick={handleSubmit}>Сохранить</Button>
            </BuilderLayout>
        </Box>
    );
};

export default StageBuilder