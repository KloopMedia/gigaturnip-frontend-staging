import React, {useEffect, useState} from "react";
import {Button, Grid} from "@material-ui/core";
import Card from "../cards/Card";
import AddIcon from '@material-ui/icons/Add';
import Dialog from '../dialogs/Dialog'
import {CampaignParams, CreateCampaignParams} from "../../util/Types";
import {useHistory} from "react-router-dom";
import {createCampaign, getCampaigns} from "../../util/Util";


const Builder = () => {
    const [campaigns, setCampaigns] = useState<CampaignParams[]>([])
    const [open, setOpen] = useState(false);
    const history = useHistory()

    useEffect(() => {
        getCampaigns().then(res => setCampaigns(res))
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDialogSave = (data: any) => {
        if (data.name) {
            handleCampaignAdd(data)
            setOpen(false);
        } else {
            alert('error: No name')
        }
    }

    const openCampaignInfo = (id: string | number) => {
        history.push(`/campaign/about/${id}`)
    }

    const handleCampaignAdd = (data: CreateCampaignParams) => {
        createCampaign(data).then(res => window.location.reload())
    };

    const handleCardRedirect = (id: string | number) => {
        history.push(`/campaign/${id}`)
    }

    return (
        <Grid container justifyContent={"center"}>
            <Dialog title={"Add campaign"} open={open} onSave={handleDialogSave} onClose={handleClose}/>
            <Grid container style={{padding: 20}}>
                <Button variant={"contained"} color={"primary"} startIcon={<AddIcon/>} onClick={handleClickOpen}>Add
                    Campaign</Button>
            </Grid>
            {campaigns.map(campaign => (
                <Grid item key={campaign.id} style={{padding: 10}}>
                    <Card data={campaign} onCardButtonClick={handleCardRedirect} openCampaignInfo={openCampaignInfo}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default Builder


