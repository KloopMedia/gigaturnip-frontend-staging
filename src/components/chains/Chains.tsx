import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {Button, Grid} from "@material-ui/core";
import Card from "../cards/Card";
import AddIcon from '@material-ui/icons/Add';
import Dialog from '../dialogs/Dialog'
import {ChainParams, CreateChainParams, RouterParams} from "../../util/Types";
import {createChain, getChains} from "../../util/Util";

const Builder = () => {
    const history = useHistory()
    const [chains, setChains] = useState<ChainParams[]>([])
    const [open, setOpen] = useState(false);
    const {campaignId} = useParams<RouterParams>()

    useEffect(() => {
        getChains(campaignId).then(res => setChains(res))
    }, [campaignId])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDialogSave = (data: any) => {
        if (data.name && campaignId) {
            let parsedData = {...data, campaign: parseInt(campaignId)}
            handleAddChain(parsedData)
            setOpen(false);
        } else {
            alert('error: No name or campaign')
        }
    }

    const handleAddChain = (data: CreateChainParams) => {
        createChain(data).then(res => window.location.reload())
    };

    const handleCardRedirect = (id: string | number) => {
        history.push(`${history.location.pathname}/${id}`)
    }

    return (
        <Grid container justifyContent={"center"}>
            <Dialog title={"Add Chain"} open={open} onSave={handleDialogSave} onClose={handleClose}/>
            <Grid container style={{padding: 20}}>
                <Button variant={"contained"} color={"primary"} startIcon={<AddIcon/>} onClick={handleClickOpen}>Add
                    Chain</Button>
            </Grid>
            {chains.map(chain => (
                <Grid item style={{padding: 10}} key={chain.id}>
                    <Card data={chain} onCardButtonClick={handleCardRedirect}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default Builder


