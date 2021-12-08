import React from 'react'
import {Input} from 'reactstrap';

type Parameters = {
    name: string,
    path: string,
    definitionData: any,
    definitionUi: any,
    category: string,
    default: string,
    'ui:options': { private: boolean }
};

const CustomAudioField = ({
                             parameters,
                             onChange,
                         }: { parameters: Parameters, onChange: (newParams: Parameters) => void, }) => (
    <div>
        <div style={{display: "flex", justifyContent: "center", alignItems: "baseline", padding: "0 10px"}}>
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
        <h5>Default Audio (Link)</h5>
        <Input
            value={parameters.default ?? ""}
            placeholder='Default'
            type='text'
            onChange={(ev: React.ChangeEvent<any>) =>
                onChange({...parameters, default: ev.target.value})
            }
            className='card-text'
        />
    </div>
);

const AudioType = {
    audio: {
        displayName: "Audio",
        matchIf: [
            {
                types: ["string"],
                widget: "audio"
            },
        ],
        possibleOptions: ['private'],
        defaultDataSchema: {},
        defaultUiSchema: {
            "ui:widget": "audio",
            "ui:options": {private: false}
        },
        type: "string",
        cardBody: CustomAudioField,
        // modalBody: (parameters: any, onChange: any) => <div>
        //     Extra editing options in modal appear hear
        // </div>,
    }
};

export default AudioType