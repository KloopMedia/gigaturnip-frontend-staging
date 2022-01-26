import React, {useEffect, useState} from 'react';
import useAxios from "../../../../services/api/useAxios";
import Form from "../../../../components/form/Form";

type Props = {
    id: number,
};

const Plugin = (props: Props) => {
    const {id} = props;
    const {getTaskStageOptions} = useAxios();

    const [schema, setSchema] = useState({});

    const getOptions = async () => {
        const options = await getTaskStageOptions();
        if (options) {
            return options.actions.POST;
        } else {
            return undefined;
        }
    }

    const transformOptionsToForm = (options: any) => {
        const DEFAULT_FORM_TYPES = ["string", "number", "integer", "boolean", "null"];


        const keys = options ? Object.keys(options) : []
        const properties: any = {}
        const required: any[] = []

        keys.forEach(key => {
            const {type, label, help_text, required: req} = options[key]
            if (DEFAULT_FORM_TYPES.includes(type)) {
                properties[key] = {
                    type: type,
                    title: label,
                    description: help_text
                }
                if (req) {
                    required.push(key)
                }
            } else if (type === "decimal") {
                properties[key] = {
                    type: "number",
                    title: label,
                    description: help_text
                }
                if (req) {
                    required.push(key)
                }
            }
        })

        const template = {
            type: "object",
            properties: properties,
            required: required
        }
        console.log(template)
        return template
    }

    useEffect(() => {
        const getData = async () => {
            const options = await getOptions();
            const schema = transformOptionsToForm(options);
            setSchema(schema)
        }
        if (id) {
            getData();
        }
    }, [id])

    return (
        <div>
            <Form schema={schema}/>
        </div>
    );
};

export default Plugin