import React from "react";

import Form from "react-bootstrap/Form";

import {WidgetProps} from "@rjsf/core";

const CustomLinkWidget = ({required, label, value, schema, rawErrors = []}: WidgetProps) => {
    return (
        value ? <Form.Group className="mb-0">
                <Form.Label className={rawErrors.length > 0 ? "text-danger" : ""}>
                    {label || schema.title}
                    {(label || schema.title) && required ? "*" : null}
                </Form.Label>
                <br/>
                <a href={value}>{value}</a>
            </Form.Group>
            : null
    );
};

export default CustomLinkWidget;