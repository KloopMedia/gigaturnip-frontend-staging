import React from 'react'
import Form from "@rjsf/bootstrap-4";
import {Button, TextField} from "@material-ui/core";

import CustomFileWidget from '../custom-widgets/file-widget/CustomFileWidget'

type FormProps = { jsonSchema: string, uiSchema: string, formResponses:any }

const Preview = ({jsonSchema, uiSchema, formResponses}: FormProps) => {
    const json_schema = JSON.parse(jsonSchema)
    const ui_schema = JSON.parse(uiSchema)
    const stage_data = JSON.stringify({...formResponses, json_schema: json_schema, ui_schema: ui_schema})
    const widgets = {file: CustomFileWidget};

    const copyToClipboard = () => {
        navigator.clipboard.writeText(stage_data).then(() => console.log("success")).catch(err => alert(err))
    }

    return (
        <div style={{width: '70%', minWidth: '400px', margin: '0 auto', display: 'block', padding: 10}}>
            <Form
                schema={json_schema}
                uiSchema={ui_schema}
                widgets={widgets}
                onSubmit={(formData) => console.log(formData.formData)}
            />
            <br/>
            <TextField
                id="outlined-multiline-static"
                label="JSON"
                multiline
                fullWidth
                defaultValue="Default Value"
                variant="outlined"
                InputProps={{
                    readOnly: true,
                }}
                value={jsonSchema}
                style={{marginTop: 15, marginBottom: 15}}
            />
            <TextField
                id="outlined-multiline-static"
                label="UI"
                multiline
                fullWidth
                defaultValue="Default Value"
                variant="outlined"
                InputProps={{
                    readOnly: true,
                }}
                value={uiSchema}
                style={{marginTop: 15, marginBottom: 30}}
            />
            <br/>
            <Button onClick={copyToClipboard} variant={"contained"} color={"primary"} style={{marginBottom: 15}}>Copy FUL STAGE to Clipboard</Button>
            <TextField
                id="outlined-multiline-static"
                label="FULL STAGE"
                multiline
                fullWidth
                defaultValue="Default Value"
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