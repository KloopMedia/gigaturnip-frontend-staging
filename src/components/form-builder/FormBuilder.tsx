import React from 'react';
import {AudioType, AutoCompleteType, CustomFileType, CustomLinkType} from "./custom-fields";
// @ts-ignore
import {FormBuilder as DefaultFormBuilder} from '@ginkgo-bioworks/react-json-schema-form-builder';
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
    schema: string,
    uiSchema: string,
    onChange: (schema: string, ui: string) => void
};

const FormBuilder = (props: Props) => {
    const {schema, uiSchema, onChange} = props;

    const customFormInputs = {
        ...CustomFileType,
        ...AutoCompleteType,
        ...CustomLinkType,
        ...AudioType
    }

    const handleChange = (schema: string, ui: string) => {
        onChange(schema, ui)
    }

    return (
        <DefaultFormBuilder
            schema={schema}
            uischema={uiSchema}
            onChange={handleChange}
            mods={{customFormInputs}}
        />
    );
};

export default FormBuilder