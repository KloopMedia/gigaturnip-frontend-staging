import React from 'react';
import Form from "../../../../components/form/Form"
import StageOptionsSchema from '../StageOptionsSchema.json'
import {Box} from "@mui/material";
import FormBuilder from "../../../../components/form-builder/FormBuilder";

type Props = {
    schema: string,
    uiSchema: string,
    formData: object,
    onSchemaChange: (schema: string, ui: string) => void,
    onFormDataChange: (formData: any) => void
};

const Builder = (props: Props) => {
    const {
        schema,
        uiSchema,
        formData,
        onSchemaChange,
        onFormDataChange
    } = props;

    return (
        <Box p={1}>
                <FormBuilder
                    schema={schema}
                    uiSchema={uiSchema}
                    onChange={onSchemaChange}
                />
            <Box sx={{width: '70%', minWidth: '400px', margin: '0 auto'}}>
                <Form
                    schema={StageOptionsSchema}
                    formData={formData}
                    onChange={onFormDataChange}
                    hideButton={true}
                />
            </Box>
        </Box>
    );
};

export default Builder