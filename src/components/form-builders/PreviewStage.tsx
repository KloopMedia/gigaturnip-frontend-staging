import React from 'react'
import Form from "@rjsf/bootstrap-4";
import {Button, TextField} from "@material-ui/core";

type FormProps = { jsonSchema: string, uiSchema: string, formResponses:any }

const Preview = ({jsonSchema, uiSchema, formResponses}: FormProps) => {
    const json_schema = JSON.parse(jsonSchema)
    const ui_schema = JSON.parse(uiSchema)
    const stage_data = JSON.stringify({...formResponses, json_schema: json_schema, ui_schema: ui_schema})

    const copyToClipboard = () => {
        navigator.clipboard.writeText(stage_data).then(() => console.log("success")).catch(err => alert(err))
    }

    return (
        <div style={{width: '70%', minWidth: '400px', margin: '0 auto', display: 'block', padding: 10}}>
            <Form
                schema={json_schema}
                uiSchema={ui_schema}
                onSubmit={(formData) => console.log(formData.formData)}
            />
            <br/>
            <Button onClick={copyToClipboard} variant={"contained"} color={"primary"} style={{marginBottom: 15}}>Copy to Clipboard</Button>
            <TextField
                id="outlined-multiline-static"
                label="Multiline"
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