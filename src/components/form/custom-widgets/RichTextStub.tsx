import React from "react";
import Form from "react-bootstrap/Form";
import {WidgetProps} from "@rjsf/core";
import TextViewer from "../../text-editor/TextViewer";

const RichTextWidget = ({required, id, label, value, schema, rawErrors = []}: WidgetProps) => {
    return (
        value ? <Form.Group className="mb-0">
                <Form.Label className={rawErrors.length > 0 ? "text-danger" : ""}>
                    {label || schema.title}
                    {(label || schema.title) && required ? "*" : null}
                </Form.Label>
                <br/>
                <TextViewer id={id} data={value} />
            </Form.Group>
            : null
    );
};

export default RichTextWidget;