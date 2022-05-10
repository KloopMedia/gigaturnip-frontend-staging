const CounterType = {
    counter: {
        displayName: "Counter",
        matchIf: [
            {
                types: ["array"],
                field: "counter"
            },
        ],
        defaultDataSchema: {},
        defaultUiSchema: {
            "ui:field": "counter"
        },
        type: "array",
    }
};

export default CounterType