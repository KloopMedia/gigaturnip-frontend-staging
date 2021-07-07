import React from 'react'


const CustomFileWidget = (props: any) => {
    const {schema} = props;
    return (
        <div>
            <label className={"form-label"}>{schema?.title}</label>
            <br/>
            <input type="file"/>
        </div>
    )
}

export default CustomFileWidget