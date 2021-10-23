import axios from "./Axios";
import {campaignsUrl, chainsUrl, conditionalstagesUrl, manualstagesUrl, taskstagesUrl} from "./Urls";
import {FlowElement, isEdge} from "react-flow-renderer";
import {ConnectionsParams, CreateCampaignParams, CreateChainParams} from "./Types";

const IS_PAGINATION_ON = true;

export const getCampaigns = () => {
    return axios.get(campaignsUrl)
        .then(res => res.data)
        .then(res => {
            console.log(res)
            return IS_PAGINATION_ON ? res.results : res
        })
}

export const getChains = (campaignId: string) => {
    return axios.get(`${chainsUrl}?campaign=${campaignId}`)
        .then(res => res.data)
        .then(res => IS_PAGINATION_ON ? res.results : res)
}

export const getStageNodes = (campaignId: string, chainId: string) => {
    return axios.get(`${taskstagesUrl}?chain__campaign=${campaignId}&chain=${chainId}&limit=1000`)
        .then(res => res.data)
        .then(res => IS_PAGINATION_ON ? res.results : res)
};

export const getLogicNodes = (campaignId: string, chainId: string) => {
    return axios.get(`${conditionalstagesUrl}?chain__campaign=${campaignId}&chain=${chainId}&limit=1000`)
        .then(res => res.data)
        .then(res => IS_PAGINATION_ON ? res.results : res)
};

export const createCampaign = (data: CreateCampaignParams) => {
    return axios.post(campaignsUrl, data)
}

export const createChain = (data: CreateChainParams) => {
    return axios.post(chainsUrl, data)
};


// <------ Graph.tsx Functions Part ------>
/**
 * Search node in elements (state) and return it.
 * @param id
 * @param elements
 * @return {FlowElement | undefined}
 */
export const getNode = (id: string | number, elements: FlowElement[]) => {
    return elements.filter((node: any) => node.id == id).pop()
}

/**
 *
 * @param node
 * @returns {string | undefined}
 */
export const getUrl = (node: FlowElement) => {
    if (node.type === "STAGE") {
        return taskstagesUrl
    }
    if (node.type === "LOGIC") {
        return conditionalstagesUrl
    }
    if (node.type === "MANUAL") {
        return manualstagesUrl
    }
    return undefined
}

/**
 * Add or remove connections (in_stages && out_stages) in database via API
 * @param node - Source or Target of the current node
 * @param currentNodeId
 * @param type - 'in' (Incoming) or 'out' (Outgoing) connection
 * @param method - 'create' or 'delete'
 * @returns {Promise<void>}
 */
export const updateConnections = async ({node, currentNodeId, type, method}: ConnectionsParams) => {
    // Returns url of given node type (logic or stage or undefined)
    const url = getUrl(node)
    if (url) {
        // Get connections of a given node
        const connections = await axios.get(url + node.id + '/').then(res => {
            if (type === 'in') {
                return res.data.in_stages
            }
            if (type === 'out') {
                return res.data.out_stages
            }
            return undefined;
        }).catch(err => undefined);

        if (connections) {
            // Change ids type to String
            let parsed = connections.map((connection: string | number) => connection.toString())

            let ids = []
            // Add current node id to given node connections
            if (method === 'create') {
                ids = [currentNodeId, ...parsed]
            }
            if (method === 'delete') {
                ids = parsed.filter((connection: string) => connection !== currentNodeId)
            }

            let data = undefined
            if (type === 'in') {
                data = {in_stages: ids}
            }
            if (type === 'out') {
                data = {out_stages: ids}
            }

            if (data) {
                console.log(data)
                axios.patch(url + node.id + '/', data)
            }
        }
    }
}

export const addConnections = async (target: string, source: string, elements: FlowElement[]) => {
    const targetNode = getNode(target, elements)
    const sourceNode = getNode(source, elements)

    if (targetNode) {
        updateConnections({node: targetNode, currentNodeId: source, type: 'in', method: 'create'})
    }

    if (sourceNode) {
        updateConnections({node: sourceNode, currentNodeId: target, type: 'out', method: 'create'})
    }
}


export const removeConnections = async (target: string, source: string, elements: FlowElement[]) => {
    const targetNode = getNode(target, elements)
    const sourceNode = getNode(source, elements)

    if (targetNode) {
        updateConnections({node: targetNode, currentNodeId: source, type: 'in', method: 'delete'})
    }

    if (sourceNode) {
        updateConnections({node: sourceNode, currentNodeId: target, type: 'out', method: 'delete'})
    }
}

export const removeElements = (elementsToRemove: FlowElement[], elements: FlowElement[]) => {
    let nodeIdsToRemove = elementsToRemove.map((n: any) => {
        return n.id;
    });

    return elements.filter((element: any) => {
        if (nodeIdsToRemove.includes(element.id)) {
            if (isEdge(element)) {
                let target = element.target
                let source = element.source

                removeConnections(target, source, elements)

            } else {
                const url = getUrl(element)
                if (url) {
                    axios.delete(url + element.id + '/')
                }
            }
            return false
        } else {
            return true
        }
    });
};

/**
 * Update node (stage) coordinates in database via API
 * @param node
 */
export const updateNode = (node: any) => {
    let x_pos = Math.round(node.position.x)
    let y_pos = Math.round(node.position.y)
    let data = {x_pos, y_pos}
    const url = getUrl(node)
    console.log(data)
    if (url) {
        axios.patch(url + node.id + '/', data).then(res => console.log(res.data))
    }
}

/**
 * Create node (stage) in database via API
 * @param node
 * @param chainId
 * @returns {Promise<string | undefined>}
 */
export const createNode = async (node: { type: string, position: { x: number, y: number }, label: string }, chainId: string) => {
    let data = {
        name: node.label,
        x_pos: node.position.x,
        y_pos: node.position.y,
        chain: parseInt(chainId),
        out_stages: []
    }

    const url = getUrl(node as any)
    if (url) {
        let stage = await axios.post(url, data).then(res => res.data).catch(err => console.log(err))
        return stage.id.toString()
    }
    return undefined;
}