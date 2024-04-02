import React from "react";
import Form from "react-bootstrap/Form";
import {WidgetProps} from "@rjsf/core";

const YoutubeWidget = ({required, id, label, value, schema, rawErrors = []}: WidgetProps) => {
    return (
        <p>Здесь будет youtube видео</p>
    );
};

export default YoutubeWidget;