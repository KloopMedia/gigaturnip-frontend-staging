import React from 'react'
// @ts-ignore
import {Input} from 'reactstrap';

type Parameters = {
    name: string,
    path: string,
    definitionData: any,
    definitionUi: any,
    category: string,
    'ui:options': { paragraph: string }
};

type CustomFieldProps = { parameters: Parameters, onChange: (newParams: Parameters) => void }

const ParagraphField = ({parameters, onChange}: CustomFieldProps) => (
    <React.Fragment>
        <h5>Paragraph</h5>
        <Input
            value={parameters['ui:options']?.paragraph}
            placeholder='Paragraph'
            type={'text'}
            onChange={(ev: React.ChangeEvent<any>) =>
                onChange({...parameters, "ui:options": {...parameters['ui:options'], paragraph: ev.target.value}})
            }
            className='card-text-paragraph'
        />
    </React.Fragment>
);


const ParagraphType = {
    paragraph: {
        displayName: "Paragraph",
        matchIf: [
            {
                types: ["string"],
                widget: "paragraph"
            },
        ],
        possibleOptions: ['paragraph'],
        defaultDataSchema: {},
        defaultUiSchema: {
            "ui:widget": "paragraph",
            "ui:options": {paragraph: ''}
        },
        type: "string",
        cardBody: ParagraphField,
        // modalBody: (parameters: any, onChange: any) => <div>
        //     Extra editing options in modal appear hear
        // </div>,
    }
};

export default ParagraphType