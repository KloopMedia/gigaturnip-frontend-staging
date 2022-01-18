import React, {useEffect, useState} from "react";
import useAxios from "../../services/api/useAxios";
import {Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import List from "../../components/list/List";

const Campaigns = () => {
    const {getCampaigns} = useAxios()
    const navigate = useNavigate();

    const [campaigns, setCampaigns] = useState([])

    useEffect(() => {
        getCampaigns().then(res => setCampaigns(res))
    }, [])

    const handleSelect = (id: number) => {
        navigate(`/campaign/${id}/chain`)
    }

    return (
        <Grid>
            <List data={campaigns} label={"Кампании"} onSelect={handleSelect}/>
        </Grid>
    )
}

export default Campaigns