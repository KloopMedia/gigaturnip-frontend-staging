import React from 'react'

const CardBody = (props: any) => {
    const handleChange = (event: any) => {
        props.onChange({...props.parameters, default: event.target.checked})
    }
    return (
        <div>
            <input type="checkbox" id="multiple"
                   value={props.parameters.default}
                   onChange={handleChange}
            />
            <label htmlFor="multiple">Multiple files</label>
        </div>
    )
}

const CustomFileType = {
    file: {
        displayName: "File",
        matchIf: [
            {
                types: ["string"],
                widget: "file"
            },
        ],
        defaultDataSchema: {},
        defaultUiSchema: {
            "ui:widget": "file"
        },
        type: "string",
        // cardBody: CardBody,
        // modalBody: (parameters: any, onChange: any) => <div>
        //     Extra editing options in modal appear hear
        // </div>,
    }
};

export default CustomFileType