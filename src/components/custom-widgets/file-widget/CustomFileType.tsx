import React from 'react'

type Parameters = {
    name: string,
    path: string,
    definitionData: any,
    definitionUi: any,
    category: string,
    'ui:options': {private: boolean},
    // 'ui:private': boolean
    // private: boolean,
};

const CustomFileField = ({
                             parameters,
                             onChange,
                         }: { parameters: Parameters, onChange: (newParams: Parameters) => void, }) => (
    <React.Fragment>
        <h5>Private Upload</h5>
        <input
            checked={parameters['ui:options']?.private}
            type="checkbox"
            onChange={(ev: React.ChangeEvent<any>) =>
                onChange({...parameters, "ui:options": {private: ev.target.checked}})
            }
            className='card-text'
        />
    </React.Fragment>
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
        possibleOptions: ['private'],
        defaultDataSchema: {},
        defaultUiSchema: {
            "ui:widget": "customfile",
            "ui:options": {private: false}
        },
        type: "string",
        cardBody: CustomFileField,
        // modalBody: (parameters: any, onChange: any) => <div>
        //     Extra editing options in modal appear hear
        // </div>,
    }
};

export default CustomFileType