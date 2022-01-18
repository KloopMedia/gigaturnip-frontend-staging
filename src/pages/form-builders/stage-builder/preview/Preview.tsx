import React from 'react';
import {Box} from "@mui/material";
import TextViewer from "../../../../components/text-editor/TextViewer";
import Form from "../../../../components/form/Form";

type Props = {
    schema: object,
    uiSchema: object,
    text?: string
};

const Preview = (props: Props) => {
    const {schema, uiSchema, text} = props;
    return (
        <Box sx={{width: '70%', minWidth: '400px', margin: '0 auto'}}>
            {text && <TextViewer data={text}/>}
            <Box py={1}>
                <Form schema={schema} uiSchema={uiSchema}/>
            </Box>
        </Box>
    );
};

export default Preview