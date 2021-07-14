import React, {useEffect, useState} from "react";
import axios from "../../util/Axios";
import {Button, Grid} from "@material-ui/core";
import Card from "./CampaignCard";
import AddIcon from '@material-ui/icons/Add';
import {campaignsUrl} from "../../util/Urls"
import Dialog from '../dialogs/Dialog'

type CampaignParams = { id: number, name: string, description?: string };
export type NewCampaignParams = { name: string, description?: string }

const Builder = () => {
    const [campaigns, setCampaigns] = useState<CampaignParams[]>([])
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get(campaignsUrl)
            .then(res => res.data)
            .then(res => {
                console.log(res)
                setCampaigns(res)
            })
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

    const handleCampaignAdd = (data: NewCampaignParams) => {
        axios.post(campaignsUrl, data)
            .then(res => {
                console.log(res)
                window.location.reload();
            })
    };

    return (
        <Grid container justify={"center"}>
            <Dialog title={"Add campaign"} open={open} onSave={handleDialogSave} onClose={handleClose}/>
            <Grid container style={{padding: 20}}>
                <Button variant={"contained"} color={"primary"} startIcon={<AddIcon/>} onClick={handleClickOpen}>Add
                    Campaign</Button>
            </Grid>
            {campaigns.map(campaign => (
                <Grid item style={{padding: 10}}>
                    <Card key={campaign.id} chain={campaign}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default Builder


