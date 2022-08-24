const CardType = {
    card: {
        displayName: "Card",
        matchIf: [
            {
                types: ["object"],
                widget: "card"
            },
        ],
        defaultDataSchema: {
            subtype: "card"
        },
        defaultUiSchema: {},
        type: "object",
    }
};

export default CardType