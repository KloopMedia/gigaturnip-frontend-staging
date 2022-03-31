import React, {useEffect, useState} from 'react';
import useAxios from "../../services/api/useAxios";
import {useParams} from "react-router-dom";
import useHelpers from "../../utils/hooks/UseHelpers";
import Form from "../../components/form/Form";
import {Box} from "@mui/material";
import {useToast} from "../../context/toast/hooks/useToast";


const ResponseFlattener = () => {
    const {getResponseFlattener, saveResponseFlattener} = useAxios();
    const {openToast} = useToast()
    const {id} = useParams();
    const {parseId} = useHelpers();

    const [data, setData] = useState();

    const parsedId = parseId(id);

    useEffect(() => {
        getResponseFlattener(parsedId).then(res => {
            console.log(res)
            const {task_stage, ...rest} = res;
            const parsedData = {task_stage: task_stage.id, ...rest};
            setData(parsedData);
        });
    }, [parsedId])

    const schema = {
        "title": "Response Flattener",
        "type": "object",
        "required": [
            "task_stage"
        ],
        "properties": {
            "task_stage": {
                "type": "integer",
                "title": "Task stage"
            },
            "copy_first_level": {
                "type": "boolean",
                "title": "Copy first level"
            },
            "flatten_all": {
                "type": "boolean",
                "title": "Flatten all"
            },
            "copy_system_fields": {
                "type": "boolean",
                "title": "Copy system fields"
            },
            "exclude_list": {
                "type": "array",
                "title": "Exclude list",
                "items": {
                    "type": "string"
                }
            },
            "columns": {
                "type": "array",
                "title": "Columns",
                "items": {
                    "type": "string"
                }
            }
        }
    }

    const ui = {
        "exclude_list": {
            "ui:widget": "textarea"
        },
        "columns": {
            "ui:widget": "textarea"
        }
    }

    const handleChange = (formData: any) => {
        console.log(formData)
        setData(formData)
    }

    const handleSubmit = () => {
        saveResponseFlattener(parsedId, data).then(() => openToast("Saved", "success"));
    }

    return (
        <Box p={2}>
            <Form schema={schema} uiSchema={ui} formData={data} onChange={handleChange} onSubmit={handleSubmit}/>
        </Box>
    );
};

export default ResponseFlattener