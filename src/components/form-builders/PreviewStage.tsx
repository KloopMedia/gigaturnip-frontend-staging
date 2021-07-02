import React from 'react'
import Form from "@rjsf/bootstrap-4";

type FormProps = {jsonSchema: string, uiSchema: string}

const Preview = ({jsonSchema, uiSchema}: FormProps) => {
    const json_schema = JSON.parse(jsonSchema)
    const ui_schema = JSON.parse(uiSchema)
    return (
        <div style={{width: '70%', minWidth: '400px', margin: '0 auto', display: 'block', padding: 10}}>
            <Form
                schema={json_schema}
                uiSchema={ui_schema}
                onSubmit={(formData) => console.log(formData.formData)}
            />
        </div>
    )
}

export default Preview