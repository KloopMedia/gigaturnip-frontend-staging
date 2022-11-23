import React from 'react';
import { Input } from 'reactstrap';
import CardEnumOptions from './CardEnumOptions';


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
    enum: string[],
    'ui:autofocus': boolean,
};

// specify the inputs required for a string type object
function SimpleAutoCompleteParameterInputs({
    parameters,
    onChange,
}: {
    parameters: Parameters,
    onChange: (newParams: Parameters) => void,
}) {
    return (
        <div>
            <h4>Minimum Length</h4>
            <Input
                value={parameters.minLength ? parameters.minLength : ''}
                placeholder='Minimum Length'
                key='minLength'
                type='number'
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({
                        ...parameters,
                        minLength: parseInt(ev.target.value, 10),
                    });
                }}
                className='card-modal-number'
            />
            <h4>Maximum Length</h4>
            <Input
                value={parameters.maxLength ? parameters.maxLength : ''}
                placeholder='Maximum Length'
                key='maxLength'
                type='number'
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({
                        ...parameters,
                        maxLength: parseInt(ev.target.value, 10),
                    });
                }}
                className='card-modal-number'
            />
            <h4>
                Regular Expression Pattern{' '}
                <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions' />
            </h4>
            <Input
                value={parameters.pattern ? parameters.pattern : ''}
                placeholder='Regular Expression Pattern'
                key='pattern'
                type='text'
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({
                        ...parameters,
                        pattern: ev.target.value,
                    });
                }}
                className='card-modal-text'
            />
            <div className='card-modal-boolean'>
                <p>Auto Focus</p>
                <input
                    type={"checkbox"}
                    onChange={() => {
                        onChange({
                            ...parameters,
                            'ui:autofocus': parameters['ui:autofocus']
                                ? parameters['ui:autofocus'] !== true
                                : true,
                        });
                    }}
                    checked={
                        parameters['ui:autofocus']
                            ? parameters['ui:autofocus'] === true
                            : false
                    }
                />
            </div>
        </div>
    );
}

const SimpleAutoComplete = ({
    parameters,
    onChange,
}: {
    parameters: Parameters,
    onChange: (newParams: Parameters) => void,
}) => {
    const enumArray = Array.isArray(parameters.enum) ? parameters.enum : [];
    const value = parameters.default;
    return (
        <React.Fragment>
            <h5>Default value</h5>
            <Input
                value={value === undefined || value === null ? '' : value}
                placeholder='Default'
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                    onChange({ ...parameters, default: ev.target.value })
                }
                className='card-text'
            />
            <br />
            <CardEnumOptions
                initialValues={enumArray}
                onChange={(newEnum: Array<string>) =>
                    onChange({
                        ...parameters,
                        enum: newEnum.length === 0 ? [] : newEnum,
                    })
                }
            />
        </React.Fragment>
    );
}

const simpleAutoCompleteInput = {
    simpleAutoComplete: {
        displayName: 'Simple AutoComplete',
        matchIf: [
            {
                types: ['string'],
                widget: "simple_autocomplete",
                enum: true
            },
        ],
        possibleOptions: [],
        defaultDataSchema: {
            enum: []
        },
        defaultUiSchema: {
            "ui:widget": "simple_autocomplete"
        },
        type: 'string',
        cardBody: SimpleAutoComplete,
        modalBody: SimpleAutoCompleteParameterInputs,
    },
};

export default simpleAutoCompleteInput;