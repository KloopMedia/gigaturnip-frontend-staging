import React from "react";

import {WidgetProps} from "@rjsf/core";

const AudioWidget = ({
                         id,
                         schema,
                         options,
                         value,
                         required,
                         disabled,
                         readonly,
                         label,
                         onChange,
                         onBlur,
                         onFocus,
                     }: WidgetProps) => {

    const _onChange = ({
                           target: {value},
                       }: React.ChangeEvent<HTMLInputElement>) =>
        onChange(schema.type == "boolean" ? value !== "false" : value);
    const _onBlur = ({target: {value}}: React.FocusEvent<HTMLInputElement>) =>
        onBlur(id, value);
    const _onFocus = ({
                          target: {value},
                      }: React.FocusEvent<HTMLInputElement>) => onFocus(id, value);


    return (
        <p>Здесь будет аудио</p>
    );
};

export default AudioWidget;