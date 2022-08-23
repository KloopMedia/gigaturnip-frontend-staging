const ReaderType = {
    reader: {
        displayName: "Reader",
        matchIf: [
            {
                types: ["array"],
                widget: "reader"
            },
        ],
        defaultDataSchema: {
            "items": {
                "type": "object",
                "properties": {
                    "word": { "default": "Some word", "type": "string", "readOnly": true },
                    "translation": { "default": "Какое-то слово", "type": "string", "readOnly": true },
                    "count": {
                        "title": "Кол-во нажатий",
                        "default": 0,
                        "type": "integer",
                        "readOnly": true
                    },
                    "active": { "title": "Активен", "type": "boolean" }
                }
            }
        },
        defaultUiSchema: {
            "ui:widget": "reader"
        },
        type: "array",
    }
};

export default ReaderType