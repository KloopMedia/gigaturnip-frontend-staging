import React, {useEffect, useState} from "react";
import axios from "../../util/Axios";
import {Button, Grid} from "@material-ui/core";
import Card from "../cards/Card";
import AddIcon from '@material-ui/icons/Add';
import {campaignsUrl} from "../../util/Urls"
import Dialog from '../dialogs/Dialog'
import {CampaignParams, CreateCampaignParams} from "../../util/Types";
import {useHistory} from "react-router-dom";


const Builder = () => {
    const [campaigns, setCampaigns] = useState<CampaignParams[]>([])
    const [open, setOpen] = useState(false);
    const history = useHistory()

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

    const handleCampaignAdd = (data: CreateCampaignParams) => {
        axios.post(campaignsUrl, data)
            .then(res => {
                console.log(res)
                window.location.reload();
            })
    };

    const handleCardRedirect = (id: string | number) => {
        history.push(`/campaign/${id}`)
    }

    return (
        <Grid container justify={"center"}>
            <Dialog title={"Add campaign"} open={open} onSave={handleDialogSave} onClose={handleClose}/>
            <Grid container style={{padding: 20}}>
                <Button variant={"contained"} color={"primary"} startIcon={<AddIcon/>} onClick={handleClickOpen}>Add
                    Campaign</Button>
            </Grid>
            {campaigns.map(campaign => (
                <Grid item style={{padding: 10}}>
                    <Card key={campaign.id} data={campaign} onCardButtonClick={handleCardRedirect}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default Builder


