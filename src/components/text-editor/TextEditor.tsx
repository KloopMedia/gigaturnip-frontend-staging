import React from 'react';
import {Editor} from "@tinymce/tinymce-react";

type Props = {
    data: string,
    onChange: (data: string) => void,
};

const TextEditor = (props: Props) => {
    const {data, onChange} = props;

    const handleChange = (d: string) => {
        onChange(d);
    }

    return (
        <Editor
            id={"EditorTinyMCE"}
            onEditorChange={(newValue, editor) => handleChange(newValue)}
            value={data}
            tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
            init={{
                plugins: 'autosave save print preview paste importcss searchreplace autolink directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap emoticons autoresize',
                menubar: 'file edit view insert format tools table help',
                toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media link anchor codesample | ltr rtl',
                toolbar_sticky: true,
                image_advtab: true,
                importcss_append: true,
                image_caption: true,
                noneditable_noneditable_class: 'mceNonEditable',
                toolbar_mode: 'sliding',
                contextmenu: 'link image imagetools table',
                autosave_prefix: 'tinymce-autosave-{path}{query}-',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
        />
    );
};

export default TextEditor