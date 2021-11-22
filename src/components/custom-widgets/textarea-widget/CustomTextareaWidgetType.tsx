// @flow

import React, {useState} from 'react';
import {Input} from 'reactstrap';

type Parameters = {
    name: string,
    path: string,
    definitionData: any,
    definitionUi: any,
    category: string,
    default: string,
    minLength: number,
    maxLength: number,
    'ui:options': { rows: number }
};

// specify the inputs required for a string type object
function CardLongAnswerParameterInputs({
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
                onChange={(ev: React.ChangeEvent<any>) => {
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
                onChange={(ev: React.ChangeEvent<any>) => {
                    onChange({
                        ...parameters,
                        maxLength: parseInt(ev.target.value, 10),
                    });
                }}
                className='card-modal-number'
            />
            <h4>Rows</h4>
            <Input
                value={parameters['ui:options']?.rows}
                placeholder='Rows'
                key='rows'
                type='number'
                onChange={(ev: React.ChangeEvent<any>) => {
                    onChange({...parameters, "ui:options": {...parameters['ui:options'], rows: ev.target.value}})
                }}
                className='card-modal-number'
            />
        </div>
    );
}

function LongAnswer({
                        parameters,
                        onChange,
                    }: {
    parameters: Parameters,
    onChange: (newParams: Parameters) => void,
}) {
    return (
        <React.Fragment>
            <h5>Default value</h5>
            <Input
                value={parameters.default}
                placeholder='Default'
                type='textarea'
                onChange={(ev: React.ChangeEvent<any>) =>
                    onChange({...parameters, default: ev.target.value})
                }
                className='card-textarea'
            />
        </React.Fragment>
    );
}

const longAnswerInput = {
    longAnswer: {
        displayName: 'Long Answer',
        matchIf: [
            {
                types: ['string'],
                widget: 'textarea',
            },
        ],
        possibleOptions: ['rows'],
        defaultDataSchema: {},
        defaultUiSchema: {
            'ui:widget': 'textarea',
        },
        type: 'string',
        cardBody: LongAnswer,
        modalBody: CardLongAnswerParameterInputs,
    },
};

export default longAnswerInput;