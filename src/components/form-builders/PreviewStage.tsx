import React, {useEffect, useState} from 'react'
import Form from "@rjsf/bootstrap-4";
import {Button, Switch, TextField, Typography} from "@material-ui/core";

import CustomFileWidget from '../custom-widgets/file-widget/CustomFileWidget'
import {PreviewFormParams} from "../../util/Types";
import CustomAutoCompleteWidget from "../custom-widgets/autocomplete/AutoCompleteWidget";


const Preview = ({jsonSchema, uiSchema, formResponses, onJsonChange, onUiChange}: PreviewFormParams) => {
    const json_schema = jsonSchema ? JSON.parse(jsonSchema) : {}
    const ui_schema = uiSchema ? JSON.parse(uiSchema) : {}
    const stage_data = JSON.stringify({...formResponses, json_schema: json_schema, ui_schema: ui_schema})
    const [edit, setEdit] = useState(false)
    const [localJson, setLocalJson] = useState('')
    const [localUi, setLocalUi] = useState('')

    console.log(jsonSchema, uiSchema)

    const widgets = {
        customfile: CustomFileWidget,
        autocomplete: CustomAutoCompleteWidget
    };

    useEffect(() => {
        setLocalJson(jsonSchema)
        setLocalUi(uiSchema)
    }, [jsonSchema, uiSchema])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(stage_data).then(() => console.log("success")).catch(err => alert(err))
    }

    const handleJsonSchemaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalJson(event.target.value)
    }

    const handleUiSchemaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalUi(event.target.value)
    }

    const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEdit(event.target.checked)
    }

    const handleSave = () => {
        console.log(localJson)
        console.log(localUi)
        onJsonChange(localJson)
        onUiChange(localUi)
    };

    return (
        <div>
            <Form
                schema={json_schema as any}
                uiSchema={ui_schema}
                widgets={widgets}
                onSubmit={(formData) => console.log(formData.formData)}
            />
            <br/>
            <Switch
                checked={edit}
                onChange={handleEditChange}
                name="checkedA"
                inputProps={{'aria-label': 'secondary checkbox'}}
            />
            {edit && <Button color={"primary"} variant={"contained"} onClick={handleSave}>Save Schemas</Button>}
            {edit && <Typography variant={"h6"} color={"error"}>
                Осторожно: можно легко удалить всю проделанную работу
            </Typography>}
            <TextField
                id="outlined-multiline-static"
                label="JSON"
                multiline
                fullWidth
                variant="outlined"
                InputProps={{
                    readOnly: !edit,
                }}
                value={localJson}
                onChange={handleJsonSchemaChange}
                style={{marginTop: 15, marginBottom: 15}}
            />
            <TextField
                id="outlined-multiline-static"
                label="UI"
                multiline
                fullWidth
                variant="outlined"
                InputProps={{
                    readOnly: !edit,
                }}
                value={localUi}
                onChange={handleUiSchemaChange}
                style={{marginTop: 15, marginBottom: 30}}
            />
            <br/>
            <Button onClick={copyToClipboard} variant={"contained"} color={"primary"} style={{marginBottom: 15}}>Copy
                FUL STAGE to Clipboard</Button>
            <TextField
                id="outlined-multiline-static"
                label="FULL STAGE"
                multiline
                fullWidth
                variant="outlined"
                InputProps={{
                    readOnly: true,
                }}
                value={stage_data}
            />
        </div>
    )
}

export default Preview