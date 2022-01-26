import React from 'react';
import {AudioWidget, AutoCompleteWidget, LinkWidget, RadioWidget} from "./custom-widgets";
import JsonForm from "@rjsf/bootstrap-4";
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
    schema: object,
    uiSchema?: object,
    formData?: any,
    onChange?: (formData: object) => void,
    onSubmit?: (formData: object) => void,
    hideButton?: boolean
};

const Form = (props: Props) => {
    const {schema, uiSchema, formData, hideButton, onChange, onSubmit} = props;

    const widgets = {
        customfile: AudioWidget,
        autocomplete: AutoCompleteWidget,
        RadioWidget: RadioWidget,
        customlink: LinkWidget,
        audio: AudioWidget
    };

    const handleChange = (e: { formData: object }) => {
        console.log(e.formData)
        if (onChange) {
            onChange(e.formData)
        } else {
            return 0
        }
    }

    const handleSubmit = (e: {formData: object}) => {
        console.log(e.formData)
        if (onSubmit) {
            onSubmit(e.formData)
        } else {
            return 0
        }
    }

    return (
        <JsonForm
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            widgets={widgets}
            onChange={handleChange}
            onSubmit={handleSubmit}
        >
            {hideButton ? " " :
                <button type="submit" className="btn btn-primary">Отправить</button>}
        </JsonForm>
    );
};

export default Form