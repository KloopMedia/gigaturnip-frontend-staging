// import {FlowElement} from "react-flow-renderer/dist/types/general";
// import {conditionalstagesUrl, taskstagesUrl} from "../../../services/api/Urls";
// import {ConnectionsParams} from "./Helpers.types";
// import {isEdge} from "react-flow-renderer";
// import axios from "axios";
//
// /**
//  * Search node in elements (state) and return it.
//  * @param id
//  * @param elements
//  * @return {FlowElement | undefined}
//  */
// export const getNode = (id: number, elements: FlowElement[]) => {
//     return elements.filter((node: any) => node.id === id).pop()
// }
//
// /**
//  *
//  * @param node
//  * @returns {string | undefined}
//  */
// export const getUrl = (node: FlowElement) => {
//     if (node.type === "STAGE") {
//         return taskstagesUrl
//     }
//     if (node.type === "LOGIC") {
//         return conditionalstagesUrl
//     }
//     return undefined
// }
//
// /**
//  * Add or remove connections (in_stages && out_stages) in database via API
//  * @param node - Source or Target of the current node
//  * @param currentNodeId
//  * @param type - 'in' (Incoming) or 'out' (Outgoing) connection
//  * @param method - 'create' or 'delete'
//  * @returns {Promise<void>}
//  */
// export const updateConnections = async ({node, currentNodeId, type, method}: ConnectionsParams) => {
//     // Returns url of given node type (logic or stage or undefined)
//     const url = getUrl(node)
//     if (url) {
//         // Get connections of a given node
//         const connections = await axios.get(url + node.id + '/').then(res => {
//             if (type === 'in') {
//                 return res.data.in_stages
//             }
//             if (type === 'out') {
//                 return res.data.out_stages
//             }
//             return undefined;
//         }).catch(err => undefined);
//
//         if (connections) {
//             // Change ids type to String
//             let parsed = connections.map((connection: number) => connection.toString())
//
//             let ids = []
//             // Add current node id to given node connections
//             if (method === 'create') {
//                 ids = [currentNodeId, ...parsed]
//             }
//             if (method === 'delete') {
//                 ids = parsed.filter((connection: string) => connection !== currentNodeId)
//             }
//
//             let data = undefined
//             if (type === 'in') {
//                 data = {in_stages: ids}
//             }
//             if (type === 'out') {
//                 data = {out_stages: ids}
//             }
//
//             if (data) {
//                 console.log(data)
//                 axios.patch(url + node.id + '/', data)
//             }
//         }
//     }
// }
//
// export const addConnections = (target: number, source: number, elements: FlowElement[]) => {
//     const targetNode = getNode(target, elements)
//     const sourceNode = getNode(source, elements)
//
//     if (targetNode) {
//         updateConnections({node: targetNode, currentNodeId: source, type: 'in', method: 'create'})
//     }
//
//     if (sourceNode) {
//         updateConnections({node: sourceNode, currentNodeId: target, type: 'out', method: 'create'})
//     }
// }
//
//
// export const removeConnections = (target: number, source: number, elements: FlowElement[]) => {
//     const targetNode = getNode(target, elements)
//     const sourceNode = getNode(source, elements)
//
//     if (targetNode) {
//         updateConnections({node: targetNode, currentNodeId: source, type: 'in', method: 'delete'})
//     }
//
//     if (sourceNode) {
//         updateConnections({node: sourceNode, currentNodeId: target, type: 'out', method: 'delete'})
//     }
// }
//
// export const removeElements = (elementsToRemove: FlowElement[], elements: FlowElement[]) => {
//     let nodeIdsToRemove = elementsToRemove.map((n: any) => {
//         return n.id;
//     });
//
//     return elements.filter((element: any) => {
//         if (nodeIdsToRemove.includes(element.id)) {
//             if (isEdge(element)) {
//                 let target = parseInt(element.target)
//                 let source = parseInt(element.source)
//
//                 removeConnections(target, source, elements)
//
//             } else {
//                 const url = getUrl(element)
//                 if (url) {
//                     axios.delete(url + element.id + '/')
//                 }
//             }
//             return false
//         } else {
//             return true
//         }
//     });
// };
//
// /**
//  * Update node (stage) coordinates in database via API
//  * @param node
//  */
// export const updateNode = (node: any) => {
//     let x_pos = Math.round(node.position.x)
//     let y_pos = Math.round(node.position.y)
//     let data = {x_pos, y_pos}
//     const url = getUrl(node)
//     console.log(data)
//     if (url) {
//         axios.patch(url + node.id + '/', data).then(res => console.log(res.data))
//     }
// }
//
// /**
//  * Create node (stage) in database via API
//  * @param node
//  * @param chainId
//  * @returns {Promise<string | undefined>}
//  */
// export const createNode = async (node: { type: string, position: { x: number, y: number }, label: string }, chainId: string) => {
//     let data = {
//         name: node.label,
//         x_pos: Math.round(node.position.x),
//         y_pos: Math.round(node.position.y),
//         chain: parseInt(chainId),
//         out_stages: []
//     }
//
//     console.log(data)
//
//     const url = getUrl(node as any)
//     if (url) {
//         let stage = await axios.post(url, data).then(res => res.data).catch(err => console.log(err))
//         console.log("stage", stage)
//         return stage.id.toString()
//     }
//     return undefined;
// }

export default null;