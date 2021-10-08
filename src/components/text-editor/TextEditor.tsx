import React, {useEffect, useRef, useState} from "react";
import {Editor} from '@tinymce/tinymce-react';

const TextEditor = (props: {data: string, handleChange: (d: string) => void}) => {
    const {data, handleChange} = props;
    const editorRef = useRef<any>(null);
    const [docData, setDocData] = useState("")
    const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const handleDataChange = (d:string) => {
        // console.log(d)
        setDocData(d)
        handleChange(d)
    }

    useEffect(() => {
        setDocData(data)
    }, [])

    return (
        <div style={{width: '70%', minWidth: '400px', margin: '0 auto', display: 'block', padding: 10}}>
            <Editor
                id={"EditorTinyMCE"}
                onEditorChange={(newValue, editor) => handleDataChange(newValue)}
                value={docData}
                tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                onInit={(evt, editor) => editorRef.current = editor}
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
                    save_onsavecallback: function (a:any) { console.log(a); },
                    // skin: useDarkMode ? 'oxide-dark' : 'oxide',
                    // content_css: useDarkMode ? 'dark' : 'default',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
        </div>
    )
};


export default TextEditor