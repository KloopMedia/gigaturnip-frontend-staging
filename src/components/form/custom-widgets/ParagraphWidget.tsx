import React from "react";
import Form from "react-bootstrap/Form";
import {WidgetProps} from "@rjsf/core";

const ParagraphWidget = ({required, id, uiSchema, value, schema, label, rawErrors = []}: WidgetProps) => {

    return (
        <Form.Group className="mb-0">
                <Form.Label className={rawErrors.length > 0 ? "text-danger" : ""}>
                    {label || schema.title}
                    {(label || schema.title) && required ? "*" : null}
                </Form.Label>
                <br/>
                <p>
                    {uiSchema["ui:options"] && uiSchema["ui:options"].paragraph ? uiSchema["ui:options"].paragraph : ""}
                </p>
            </Form.Group>
    );
};

export default ParagraphWidget;