import React, {useState} from 'react';
import useAxios from "../../services/api/useAxios";
import Form from "../../components/form/Form";
import {Box} from "@mui/material";
import {useToast} from "../../context/toast/hooks/useToast";
import {useNavigate} from "react-router-dom";


const CreateFlattener = () => {
    const {createResponseFlattener} = useAxios();
    const {openToast} = useToast();
    const navigate = useNavigate();

    const [data, setData] = useState({});

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
                "type": "string",
                "title": "Exclude list"
            },
            "columns": {
                "type": "string",
                "title": "Columns"
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
        setData(formData)
    }

    const handleSubmit = () => {
        createResponseFlattener(data)
            .then(() => openToast("Saved", "success"))
            .then(() => navigate(-1));
    }

    return (
        <Box p={2}>
            <Form schema={schema} uiSchema={ui} formData={data} onChange={handleChange} onSubmit={handleSubmit}/>
        </Box>
    );
};

export default CreateFlattener