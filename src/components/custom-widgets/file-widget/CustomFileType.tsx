import React from 'react'

const CustomFileType = {
        file: {
            displayName: "File",
            matchIf: [
                {
                    types: ["string"],
                    widget: "file"
                },
            ],
            defaultDataSchema: {},
            defaultUiSchema: {
                "ui:widget": "file"
            },
            type: "string",
            // cardBody: (parameters: any, onChange: any) => <div>
            //     {/*<h5>Multiple files</h5>*/}
            //     {/*<input*/}
            //     {/*    value={parameters.default}*/}
            //     {/*    placeholder="File"*/}
            //     {/*    type="text"*/}
            //     {/*    onChange={(ev: any) =>*/}
            //     {/*        onChange({...parameters, default: ev.target.value})*/}
            //     {/*    }*/}
            //     {/*/>*/}
            //     {console.log(parameters)}
            //     <input type="checkbox" id="multiple" name="horns"
            //            value={parameters.multiple}
            //            onChange={(ev: any) =>
            //                onChange({...parameters, multiple: ev.target.checked})
            //            }
            //     />
            //     <label htmlFor="multiple">Multiple files</label>
            // </div>,
            // modalBody: (parameters: any, onChange: any) => <div>
            //     Extra editing options in modal appear hear
            // </div>,
        }
};

export default CustomFileType