import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import useAxios from "../../services/api/useAxios";
import {useNavigate, useParams} from "react-router-dom";
import List from "../../components/list/List";


const Chains = () => {
    const {getChains} = useAxios();
    const navigate = useNavigate();
    const {campaignId} = useParams()

    const [data, setData] = useState([])

    useEffect(() => {
        if (campaignId) {
            const parsedId = parseInt(campaignId)
            getChains(parsedId).then(res => setData(res))
        }
    }, [])



    const handleSelect = (id: number) => {
        navigate(`${id}`)
    }

    return (
        <Box px={3} py={1}>
            <List
                id={"chains"}
                data={data}
                label={"Цепочки"}
                showCreateButton={true}
                showViewButton={true}
                onSelect={handleSelect}
            />
        </Box>

    );
};

export default Chains