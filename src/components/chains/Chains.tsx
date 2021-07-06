import React, {useEffect, useState} from "react";
import {
    useHistory,
    useParams
} from "react-router-dom";
import axios from "../../util/Axios";
import {Button, Grid, Typography} from "@material-ui/core";
import Card from "./ChainCard";
import AddIcon from '@material-ui/icons/Add';
import AddChainDialog from "./Dialog";
import {chainsUrl} from '../../util/Urls'

type RouterParams = {campaignId: string}
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
                const filtered = res.filter((chain: {campaign: number, name: string, description: string, id: number}) => chain.campaign?.toString() == campaignId)
                setChains(filtered)
            })
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDialogSave = (data: NewChainParams) => {
        setOpen(false);
        handleAddChain(data)
    }

    const handleAddChain = (data: NewChainParams) => {
        console.log(data)
        axios.post(chainsUrl, data)
            .then(res => {
                console.log(res)
                window.location.reload(false);
            })
    };

    return (
        <Grid container justify={"center"}>
            <AddChainDialog open={open} onSave={handleDialogSave} onClose={handleClose}/>
            <Grid container style={{padding: 20}}>
                <Button variant={"contained"} color={"primary"} startIcon={<AddIcon/>} onClick={handleClickOpen}>Add Chain</Button>
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


