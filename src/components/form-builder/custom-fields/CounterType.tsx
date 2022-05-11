const CounterType = {
    counter: {
        displayName: "Counter",
        matchIf: [
            {
                types: ["array"],
                field: "counter"
            },
        ],
        defaultDataSchema: {
            items: {
                type: "string",
                format: "date-time"
            }
        },
        defaultUiSchema: {
            "ui:field": "counter"
        },
        type: "array",
    }
};

export default CounterType