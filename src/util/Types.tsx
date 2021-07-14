import React from "react";
import {FlowElement} from "react-flow-renderer";

// Base Types
type ID = { id: number }
type CAMPAIGN = { campaign: number }
type NameAndDescription = { name: string, description?: string }

// Exported Types
export type RouterParams = { id: string, campaignId: string, chainId: string }
export type AppbarParams = { children: React.ReactNode }

export type CreateCampaignParams = NameAndDescription
export type CampaignParams = ID & CreateCampaignParams

export type CreateChainParams = NameAndDescription & CAMPAIGN
export type ChainParams = ID & CreateChainParams

export type DialogParams = {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
}

export type PreviewFormParams = {
    jsonSchema: string,
    uiSchema: string,
    formResponses: any,
    onJsonChange: (schema: string) => void,
    onUiChange: (schema: string) => void
}

export type CardParams = {
    data: ID & NameAndDescription & { campaign?: string | number },
    onCardButtonClick: (id: string | number) => void
}

export type ConnectionsParams = {
    node: FlowElement;
    currentNodeId: string | number;
    type: "in" | "out";
    method: "create" | "delete";
}
export type NodeParams = { data: { label: string }, style?: object }