import React from 'react'
// @ts-ignore
import {Input} from 'reactstrap';
import CardEnumOptions, { CardEnumOptionsWithNames } from './CardEnumOptions';

type Parameters = {
    name: string,
    path: string,
    definitionData: any,
    definitionUi: any,
    category: string,
    default: string,
    enum: string[] | undefined,
    enumNames: string[] | undefined,
    'ui:options': { videoId: string, text: string }
};

type CustomFieldProps = { parameters: Parameters, onChange: (newParams: Parameters) => void }

const YouTubeField = ({parameters, onChange}: CustomFieldProps) => { 
    const enumArray = Array.isArray(parameters.enum) ? parameters.enum : [];
    const names = Array.isArray(parameters.enumNames) ? parameters.enumNames : [];

    return (
    <React.Fragment>
        <h5>Text</h5>
        <Input
            value={parameters['ui:options']?.text}
            placeholder='Text'
            type={'text'}
            onChange={(ev: React.ChangeEvent<any>) =>
                onChange({...parameters, "ui:options": {...parameters['ui:options'], text: ev.target.value}})
            }
            className='card-text'
        />
        <br />
        <h5>Video Id</h5>
        <Input
            value={parameters['ui:options']?.videoId}
            placeholder='CPaukNEcMqI'
            type={'text'}
            onChange={(ev: React.ChangeEvent<any>) =>
                onChange({...parameters, "ui:options": {...parameters['ui:options'], videoId: ev.target.value}})
            }
            className='card-text'
        />
        <br />
        <CardEnumOptionsWithNames
            initialValues={enumArray}
            names={names}
            onChange={(newEnum: Array<string>, newNames: Array<string>) =>
                onChange({
                    ...parameters,
                    enum: newEnum.length === 0 ? undefined : newEnum,
                    enumNames: newNames.length === 0 ? undefined : newNames,
                })
            }
        />
    </React.Fragment>
)};


const YouTubeType = {
    youtube: {
        displayName: "YouTube",
        matchIf: [
            {
                types: ["string"],
                widget: "youtube",
                enum: true,
                enumNames: true
            },
        ],
        possibleOptions: ['videoId', "text"],
        defaultDataSchema: {
            enum: [],
            enumNames: [],
        },
        defaultUiSchema: {
            "ui:widget": "youtube",
            "ui:options": {"videoId": "", "text": ""}
        },
        type: "string",
        cardBody: YouTubeField,
        // modalBody: (parameters: any, onChange: any) => <div>
        //     Extra editing options in modal appear hear
        // </div>,
    }
};

export default YouTubeType