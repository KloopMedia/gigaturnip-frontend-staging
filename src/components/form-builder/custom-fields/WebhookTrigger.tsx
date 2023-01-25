import React from 'react'
// @ts-ignore
import {Input} from 'reactstrap';

type Parameters = {
    name: string,
    path: string,
    definitionData: any,
    definitionUi: any,
    category: string,
    'ui:options': { webhook: string }
};

type CustomFieldProps = { parameters: Parameters, onChange: (newParams: Parameters) => void }

// const WebhookTriggerField = ({parameters, onChange}: CustomFieldProps) => (
//     <React.Fragment>
//         <h5>Webhook</h5>
//         <Input
//             value={parameters['ui:options']?.webhook}
//             placeholder='Webhook'
//             type={'text'}
//             onChange={(ev: React.ChangeEvent<any>) =>
//                 onChange({...parameters, "ui:options": {...parameters['ui:options'], webhook: ev.target.value}})
//             }
//             className='card-text'
//         />
//     </React.Fragment>
// );


const WebhookTriggerType = {
    webhook: {
        displayName: "Webhook Trigger",
        matchIf: [
            {
                types: ["string"],
                widget: "webhook"
            },
        ],
        possibleOptions: [],
        defaultDataSchema: {},
        defaultUiSchema: {
            "ui:widget": "webhook",
            // "ui:options": {webhook: ''}
        },
        type: "string",
        // cardBody: WebhookTriggerField,
        // modalBody: (parameters: any, onChange: any) => <div>
        //     Extra editing options in modal appear hear
        // </div>,
    }
};

export default WebhookTriggerType