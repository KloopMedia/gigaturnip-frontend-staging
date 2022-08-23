import React from 'react';
import Form from "../../../../components/form/Form"
import StageOptionsSchema from '../StageOptionsSchema.json'
import { Box, Button } from "@mui/material";
import FormBuilder from "../../../../components/form-builder/FormBuilder";
import BuilderLayout from "../../../../components/layout/common-layouts/BuilderLayout";

type Props = {
    schema: string,
    uiSchema: string,
    onSchemaChange: (schema: string, ui: string) => void,
    onUseMainSchema: () => void,
};

const CardDataBuilder = (props: Props) => {
    const {
        schema,
        uiSchema,
        onSchemaChange,
        onUseMainSchema,
    } = props;

    return (
        <Box p={1}>
            <Box display={"flex"} justifyContent={"center"}>
                <Button variant={"contained"} onClick={onUseMainSchema}>Использовать главную схему</Button>
            </Box>
            <FormBuilder
                schema={schema}
                uiSchema={uiSchema}
                onChange={onSchemaChange}
            />
        </Box>
    );
};

export default CardDataBuilder