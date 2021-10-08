import React from 'react'

type Parameters = {
    name: string,
    path: string,
    definitionData: any,
    definitionUi: any,
    category: string,
    'ui:options': { private: boolean, multiple: boolean }
};

const CustomFileField = ({
                             parameters,
                             onChange,
                         }: { parameters: Parameters, onChange: (newParams: Parameters) => void, }) => (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div style={{display: "flex", alignItems: "baseline", padding: "0 10px"}}>
            <h5 style={{padding: "0 5px"}}>Private Upload</h5>
            <input
                checked={parameters['ui:options']?.private}
                type="checkbox"
                onChange={(ev: React.ChangeEvent<any>) =>
                    onChange({...parameters, "ui:options": {...parameters['ui:options'], private: ev.target.checked}})
                }
                className='card-text'
            />
        </div>
        <div style={{display: "flex", alignItems: "baseline", padding: "0 10px"}}>
            <h5 style={{padding: "0 5px"}}>Multiple Files</h5>
            <input
                checked={parameters['ui:options']?.multiple}
                type="checkbox"
                onChange={(ev: React.ChangeEvent<any>) =>
                    onChange({...parameters, "ui:options": {...parameters['ui:options'], multiple: ev.target.checked}})
                }
                className='card-text'
            />
        </div>
    </div>
);

const CustomFileType = {
    file: {
        displayName: "File",
        matchIf: [
            {
                types: ["string"],
                widget: "customfile"
            },
        ],
        possibleOptions: ['private', 'multiple'],
        defaultDataSchema: {},
        defaultUiSchema: {
            "ui:widget": "customfile",
            "ui:options": {private: false, multiple: false}
        },
        type: "string",
        cardBody: CustomFileField,
        // modalBody: (parameters: any, onChange: any) => <div>
        //     Extra editing options in modal appear hear
        // </div>,
    }
};

export default CustomFileType