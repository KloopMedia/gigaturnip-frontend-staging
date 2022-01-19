import React from 'react';
import TextEditor from "../../../../components/text-editor/TextEditor";
import BuilderLayout from "../../../../components/layout/common-layouts/BuilderLayout";

type Props = {
    data: string,
    onChange: (data: string) => void,
};

const Text = (props: Props) => {
    const {data, onChange} = props;
    return (
        <BuilderLayout>
            <TextEditor data={data} onChange={onChange}/>
        </BuilderLayout>
    );
};

export default Text