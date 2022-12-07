export type NodeType = {
    data: { label: string, ranks: Rank[], conditions: ConditionType[] },
    type: "stage" | "logic"
}

export type Rank = { avatar: string, name: string }

export type ConditionType = { field: string, condition: string, value: any, type: string }