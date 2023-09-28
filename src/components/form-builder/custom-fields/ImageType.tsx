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
    'ui:options': { images: string[] | undefined, text: string }
};

type CustomFieldProps = { parameters: Parameters, onChange: (newParams: Parameters) => void }

const ImageField = ({parameters, onChange}: CustomFieldProps) => { 
    const enumArray = Array.isArray(parameters.enum) ? parameters.enum : [];
    const imageArray = Array.isArray(parameters['ui:options']?.images) ? parameters['ui:options']?.images : [];
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
        <CardEnumOptions
            label='Images'
            initialValues={imageArray}
            onChange={(newEnum: Array<string>) =>
                onChange({
                    ...parameters,
                    "ui:options": {...parameters['ui:options'], images: newEnum.length === 0 ? undefined : newEnum}
                })
            }
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


const ImageType = {
    image: {
        displayName: "Image",
        matchIf: [
            {
                types: ["string"],
                widget: "image",
                enum: true,
                enumNames: true
            },
        ],
        possibleOptions: ['images', "text"],
        defaultDataSchema: {
            enum: [],
            enumNames: [],
        },
        defaultUiSchema: {
            "ui:widget": "image",
            "ui:options": {"images": [], "text": ""}
        },
        type: "string",
        cardBody: ImageField,
        // modalBody: (parameters: any, onChange: any) => <div>
        //     Extra editing options in modal appear hear
        // </div>,
    }
};

export default ImageType