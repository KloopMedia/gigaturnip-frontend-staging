import React from 'react';
import {Editor} from "@tinymce/tinymce-react";

type Props = {
    data: string
};

const TextViewer = (props: Props) => {
    const {data} = props;

    return (
        <Editor
            id={"ViewerTinyMCE"}
            value={data}
            toolbar={false}
            inline={false}
            disabled={true}
            tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
            init={{
                plugins: 'autoresize',
                menubar: false,
                image_advtab: true,
                importcss_append: true,
            }}
        />
    );
};

export default TextViewer