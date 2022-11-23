import React from "react";

import Form from "react-bootstrap/Form";

import { WidgetProps } from "@rjsf/core";
import { Autocomplete, TextField } from "@mui/material";

const SimpleAutoComplete = ({
    id,
    placeholder,
    required,
    readonly,
    disabled,
    label,
    value,
    onChange,
    onBlur,
    onFocus,
    autofocus,
    options,
    schema,
    rawErrors = [],

}: WidgetProps) => {
    const _onChange = ({
        target: { value },
    }: React.ChangeEvent<HTMLInputElement>) =>
        onChange(value === "" ? options.emptyValue : value);
    const _onBlur = ({ target: { value } }: React.FocusEvent<HTMLInputElement>) =>
        onBlur(id, value);
    const _onFocus = ({
        target: { value },
    }: React.FocusEvent<HTMLInputElement>) => onFocus(id, value);
    const inputType = (schema.type) === 'string' ? 'text' : `${schema.type}`

    return (
        <Form.Group className="mb-0">
            <Form.Label className={rawErrors.length > 0 ? "text-danger" : ""}>
                {label || schema.title}
                {(label || schema.title) && required ? "*" : null}
            </Form.Label>
            <Autocomplete
                placeholder={placeholder}
                disabled={disabled}
                value={value || value === 0 ? value : ""}
                onChange={(event, value, reason) => onChange(value === "" ? options.emptyValue : value)}
                onBlur={_onBlur}
                style={{ width: "100%" }}
                onFocus={_onFocus}
                disablePortal
                id={id}
                options={(schema.enum as string[]).concat(schema.default ? ([schema.default] as string[]) : [])}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField required={required} autoFocus={autofocus} {...params} error={rawErrors.length > 0 ? true : false} hiddenLabel label="option" size="small" />}
            />
        </Form.Group>
    );
};

export default SimpleAutoComplete;