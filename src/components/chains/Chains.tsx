import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "../../util/Axios";
import {Button, Grid} from "@material-ui/core";
import Card from "./ChainCard";
import AddIcon from '@material-ui/icons/Add';
import {chainsUrl} from '../../util/Urls'
import Dialog from '../dialogs/Dialog'

type RouterParams = { campaignId: string }
type ChainParams = { id: number, campaign: number, name: string, description?: string };
export type NewChainParams = { campaign: number, name: string, description?: string }

const Builder = () => {
    const [chains, setChains] = useState<ChainParams[]>([])
    const [open, setOpen] = useState(false);
    const {campaignId} = useParams<RouterParams>()

    useEffect(() => {
        axios.get(chainsUrl)
            .then(res => res.data)
            .then(res => {
                console.log(res)
                const filtered = res.filter((chain: { campaign: number, name: string, description: string, id: number }) => chain.campaign?.toString() === campaignId)
                setChains(filtered)
            })
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
        }
        else {
            alert('error: No name or campaign')
        }
    }

    const handleAddChain = (data: NewChainParams) => {
        console.log(data)
        axios.post(chainsUrl, data)
            .then(res => {
                console.log(res)
                window.location.reload();
            })
    };

    return (
        <Grid container justify={"center"}>
            <Dialog title={"Add Chain"} open={open} onSave={handleDialogSave} onClose={handleClose}/>
            <Grid container style={{padding: 20}}>
                <Button variant={"contained"} color={"primary"} startIcon={<AddIcon/>} onClick={handleClickOpen}>Add
                    Chain</Button>
            </Grid>
            {chains.map(chain => (
                <Grid item style={{padding: 10}}>
                    <Card key={chain.id} chain={chain}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default Builder


