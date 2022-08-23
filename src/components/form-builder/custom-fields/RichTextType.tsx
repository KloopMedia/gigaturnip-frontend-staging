import React from 'react';
import { Input } from 'reactstrap';
import TextEditor from '../../text-editor/TextEditor';


type Parameters = {
    name: string,
    path: string,
    definitionData: any,
    definitionUi: any,
    category: string,
    minLength: number,
    maxLength: number,
    pattern: string,
    default: string,
    'ui:options': { readonly: boolean }
};

function RichTextInput({
    parameters,
    onChange,
}: {
    parameters: Parameters,
    onChange: (newParams: Parameters) => void,
}) {
    return (
        <React.Fragment>
            <h5>Read only</h5>
            <Input type='checkbox' checked={parameters["ui:options"]?.readonly ?? false} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({
                        ...parameters,
                        "ui:options": {readonly: ev.target.checked},
                    });
                }}/>
            <h5>Default value</h5>
            <TextEditor data={parameters.default} onChange={(data: string) =>
                onChange({ ...parameters, default: data })
            } />
        </React.Fragment>
    );
}

const RichText = {
    editor: {
        displayName: 'Editor',
        matchIf: [
            {
                types: ['string'],
                widget: 'editor',
            },
        ],
        possibleOptions: ['readonly'],
        defaultDataSchema: {},
        defaultUiSchema: {
            'ui:widget': 'editor',
        },
        type: 'string',
        cardBody: RichTextInput,
    },
};

export default RichText;