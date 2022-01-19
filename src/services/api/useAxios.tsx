import {baseUrl, campaignsUrl, chainsUrl, conditionalstagesUrl, taskstagesUrl} from "./Urls";
import React from "react";
import defaultAxios from "axios";
import {AuthContext} from "../../context/authentication/AuthProvider";


const useAxios = () => {
    const {user} = React.useContext(AuthContext)
    const axios = defaultAxios.create({
        baseURL: baseUrl
    });

    const token = user.accessToken

    axios.interceptors.request.use(
        config => {
            if (token && config && config.headers) {
                config.headers["Authorization"] = 'JWT ' + token;
            }
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );


    const getCampaigns = () => {
        return axios.get(`${campaignsUrl}?limit=1000`)
            .then(res => res.data)
            .then(res => {
                console.log(res)
                return res.results
            })
    }

    const getChains = (campaignId: number) => {
        return axios.get(`${chainsUrl}?campaign=${campaignId}&limit=1000`)
            .then(res => res.data)
            .then(res => res.results)
    }

    const createChain = (data: {name: string, campaign: number, description?: string}) => {
        return axios.post(`${chainsUrl}`, data)
    }

    const getStageNodes = (campaignId: number, chainId: number) => {
        return axios.get(`${taskstagesUrl}?chain__campaign=${campaignId}&chain=${chainId}&limit=1000`)
            .then(res => res.data)
            .then(res => res.results)
    };

    const getLogicNodes = (campaignId: number, chainId: number) => {
        return axios.get(`${conditionalstagesUrl}?chain__campaign=${campaignId}&chain=${chainId}&limit=1000`)
            .then(res => res.data)
            .then(res => res.results)
    };

    const getTaskStage = (id: number) => {
        return axios.get(`${taskstagesUrl + id}/`)
            .then(res => res.data)
    }

    const saveTaskStage = (id: number, data: any) => {
        return axios.patch(`${taskstagesUrl + id}/`, data)
    }

    const getConditionalStage = (id: number) => {
        return axios.get(`${conditionalstagesUrl + id}/`)
            .then(res => res.data)
    }

    const saveConditionalStage = (id: number, data: any) => {
        return axios.patch(`${conditionalstagesUrl + id}/`, data)
    }

    return {
        axios,
        getCampaigns,
        getChains,
        createChain,
        getStageNodes,
        getLogicNodes,
        getTaskStage,
        saveTaskStage,
        getConditionalStage,
        saveConditionalStage
    }
}

export default useAxios;