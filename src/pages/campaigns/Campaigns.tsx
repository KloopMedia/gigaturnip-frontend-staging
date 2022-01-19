import React, {useEffect, useState} from "react";
import useAxios from "../../services/api/useAxios";
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import List from "../../components/list/List";

const Campaigns = () => {
    const {getCampaigns} = useAxios()
    const navigate = useNavigate();

    const [data, setData] = useState([])

    useEffect(() => {
        getCampaigns().then(res => setData(res))
    }, [])

    const handleSelect = (id: number) => {
        navigate(`/campaign/${id}/chain`)
    }

    return (
        <Box px={3} py={1}>
            <List id={"campaigns"} data={data} label={"Кампании"} onSelect={handleSelect}/>
        </Box>
    )
}

export default Campaigns