import React from 'react'
import {Input} from 'reactstrap';

type Parameters = {
    name: string,
    path: string,
    definitionData: any,
    definitionUi: any,
    category: string,
    'ui:options': { webhook: string, params: string, searchField: string, responseField: string }
};

type CustomFieldProps = { parameters: Parameters, onChange: (newParams: Parameters) => void }

const CustomAutoCompleteField = ({parameters, onChange}: CustomFieldProps) => (
    <React.Fragment>
        <h5>Webhook</h5>
        <Input
            value={parameters['ui:options']?.webhook}
            placeholder='Webhook'
            type={'text'}
            onChange={(ev: React.ChangeEvent<any>) =>
                onChange({...parameters, "ui:options": {...parameters['ui:options'], webhook: ev.target.value}})
            }
            className='card-text'
        />
        <br/>
        <h5>Params</h5>
        <Input
            value={parameters['ui:options']?.params}
            placeholder='Params'
            type={'text'}
            onChange={(ev: React.ChangeEvent<any>) =>
                onChange({...parameters, "ui:options": {...parameters['ui:options'], params: ev.target.value}})
            }
            className='card-text'
        />
        <br/>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div style={{width: '100%', paddingRight: 7}}>
                <h5>Search Field</h5>
                <Input
                    value={parameters['ui:options']?.searchField}
                    placeholder='Search Field'
                    type={'text'}
                    onChange={(ev: React.ChangeEvent<any>) =>
                        onChange({...parameters, "ui:options": {...parameters['ui:options'], searchField: ev.target.value}})
                    }
                    className='card-text'
                />
            </div>
            <div style={{width: '100%', paddingLeft: 7}}>
                <h5>Response Field</h5>
                <Input
                    value={parameters['ui:options']?.responseField}
                    placeholder='Response Field'
                    type={'text'}
                    onChange={(ev: React.ChangeEvent<any>) =>
                        onChange({...parameters, "ui:options": {...parameters['ui:options'], responseField: ev.target.value}})
                    }
                    className='card-text'
                />
            </div>
        </div>
    </React.Fragment>
);


const CustomAutoCompleteType = {
    autocomplete: {
        displayName: "AutoComplete",
        matchIf: [
            {
                types: ["string"],
                widget: "autocomplete"
            },
        ],
        possibleOptions: ['webhook', 'params', 'searchField', 'responseField'],
        defaultDataSchema: {},
        defaultUiSchema: {
            "ui:widget": "autocomplete",
            "ui:options": {webhook: '', params: '', searchField: '', responseField: ''}
        },
        type: "string",
        cardBody: CustomAutoCompleteField,
        // modalBody: (parameters: any, onChange: any) => <div>
        //     Extra editing options in modal appear hear
        // </div>,
    }
};

export default CustomAutoCompleteType