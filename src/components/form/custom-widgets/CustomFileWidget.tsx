import React from 'react'


const CustomFileWidget = (props: any) => {
    const {schema, uiSchema} = props;
    const multipleSelect = uiSchema["ui:options"] && uiSchema["ui:options"].multiple ? uiSchema["ui:options"].multiple : false
    return (
        <div>
            <label className={"form-label"}>{schema?.title}</label>
            <br/>
            <input type="file" multiple={multipleSelect}/>
        </div>
    )
}

export default CustomFileWidget