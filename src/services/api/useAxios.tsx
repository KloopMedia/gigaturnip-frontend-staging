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

    return {
        getCampaigns,
        getChains,
        getStageNodes,
        getLogicNodes
    }
}

export default useAxios;