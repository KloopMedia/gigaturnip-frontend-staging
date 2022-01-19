import React from 'react';
import {Box} from "@mui/material";
import TextViewer from "../../../../components/text-editor/TextViewer";
import Form from "../../../../components/form/Form";
import BuilderLayout from "../../../../components/layout/common-layouts/BuilderLayout";

type Props = {
    schema: object,
    uiSchema: object,
    text?: string
};

const Preview = (props: Props) => {
    const {schema, uiSchema, text} = props;
    return (
        <BuilderLayout>
            {text && <TextViewer data={text}/>}
            <Box py={1}>
                <Form schema={schema} uiSchema={uiSchema}/>
            </Box>
        </BuilderLayout>
    );
};

export default Preview