import React from 'react'
import {Input} from 'reactstrap';

type Parameters = {
    name: string,
    path: string,
    definitionData: any,
    definitionUi: any,
    category: string,
    default: string
};

type CustomFieldProps = { parameters: Parameters, onChange: (newParams: Parameters) => void }

const CustomLinkField = ({parameters, onChange}: CustomFieldProps) => (
    <React.Fragment>
        <h5>Default value</h5>
        <Input
            value={parameters.default ?? ""}
            placeholder='Default'
            type='text'
            onChange={(ev: React.ChangeEvent<any>) =>
                onChange({...parameters, default: ev.target.value})
            }
            className='card-text'
        />
    </React.Fragment>
);


const CustomLinkType = {
    link: {
        displayName: "Link",
        matchIf: [
            {
                types: ["string"],
                widget: "customlink"
            },
        ],
        defaultDataSchema: {},
        defaultUiSchema: {
            "ui:widget": "customlink"
        },
        type: "string",
        cardBody: CustomLinkField
    }
};

export default CustomLinkType