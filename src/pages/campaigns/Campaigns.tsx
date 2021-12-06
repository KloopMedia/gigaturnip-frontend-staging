import React, {useEffect, useState} from "react";
import useAxios from "../../services/api/useAxios";
import {Grid} from "@mui/material";
import ListCampaigns from "./list-campaigns/ListCampaigns";

type CampaignContextType = {
    campaign: number | null,
    select: (id: number, callback: VoidFunction) => void
}

export const CampaignContext = React.createContext<CampaignContextType>(null!);

const Campaigns = () => {
    const {getCampaigns} = useAxios()

    const [campaigns, setCampaigns] = useState([])
    const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null)

    useEffect(() => {
        getCampaigns().then(res => setCampaigns(res))
    }, [])

    const handleCampaignSelect = (id: number, callback: VoidFunction) => {
        setSelectedCampaign(id)
        callback()
    }

    const value = {campaign: selectedCampaign, select: handleCampaignSelect };

    return (
        <Grid>
            <CampaignContext.Provider value={value}>
                <ListCampaigns campaigns={campaigns}/>
            </CampaignContext.Provider>
        </Grid>
    )
}

export default Campaigns