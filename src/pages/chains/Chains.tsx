import React, {useEffect, useState} from 'react';
import List from "../../components/list/List";
import {Grid} from "@mui/material";
import useAxios from "../../services/api/useAxios";
import {useNavigate, useParams} from "react-router-dom";

const Chains = () => {
    const {getChains} = useAxios();
    const navigate = useNavigate();
    const {campaignId} = useParams()

    const [chains, setChains] = useState([])

    useEffect(() => {
        if (campaignId) {
            const parsedId = parseInt(campaignId)
            getChains(parsedId).then(res => setChains(res))
        }
    }, [])

    const handleSelect = (id: number) => {
        navigate(`${id}`)
    }
    return (
        <Grid>
            <List data={chains} label={"Цепочки"} onSelect={handleSelect}/>
        </Grid>
    );
};

export default Chains