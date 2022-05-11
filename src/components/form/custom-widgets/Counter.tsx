import React from "react";

import Form from "react-bootstrap/Form";

import {FieldProps} from "@rjsf/core";
import {Box, Button, Typography} from "@mui/material";

const Counter = ({required, label, formData, schema, onChange, rawErrors = []}: FieldProps) => {

    const _onChange = (action: "add" | "remove") => {
        const _value = Array.isArray(formData) ? formData : [];
        if (action === "add") {
            const newValue = [..._value, new Date().toISOString()];
            onChange(newValue);
        } else if (action === "remove") {
            const newValue = [..._value];
            newValue.pop();
            onChange(newValue);
        }
    }

    return (
        <Form.Group className="mb-0">
            <Form.Label className={rawErrors.length > 0 ? "text-danger" : ""}>
                {label || schema.title}
                {(label || schema.title) && required ? "*" : null}
            </Form.Label>
            <br/>
            <Box display={"flex"} height={80} >
                <Typography variant={"h2"} pr={1}>{Array.isArray(formData) ? formData.length : 0}</Typography>
                <Button fullWidth variant={"contained"} onClick={() => _onChange("add")}>+</Button>
                <Button variant={"contained"} color={"warning"} onClick={() => _onChange("remove")}>-</Button>
            </Box>
        </Form.Group>
    );
};

export default Counter;