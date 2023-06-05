import React from 'react';
import {AudioWidget, AutoCompleteWidget, LinkWidget, RadioWidget, CounterWidget, SimpleAutoComplete, WebhookWidget, RichTextWidget, ParagraphWidget} from "./custom-widgets";
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
        audio: AudioWidget,
        simple_autocomplete: SimpleAutoComplete,
        webhook: WebhookWidget,
        editor: RichTextWidget,
        paragraph: ParagraphWidget,
    };

    const fields = {
        counter: CounterWidget
    }

    const handleChange = (e: { formData: object }) => {
        if (onChange) {
            onChange(e.formData)
        } else {
            return 0
        }
    }

    const handleSubmit = (e: {formData: object}) => {
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
            fields={fields}
            onChange={handleChange}
            onSubmit={handleSubmit}
        >
            {hideButton ? " " :
                <button type="submit" className="btn btn-primary">Отправить</button>}
        </JsonForm>
    );
};

export default Form