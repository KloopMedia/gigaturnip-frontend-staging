const CardType = {
    card: {
        displayName: "Card",
        matchIf: [
            {
                types: ["object"],
                widget: "card"
            },
        ],
        defaultDataSchema: {},
        defaultUiSchema: {
            "ui:widget": "card"
        },
        type: "object",
    }
};

export default CardType