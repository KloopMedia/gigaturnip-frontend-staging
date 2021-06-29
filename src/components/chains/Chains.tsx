import React, {useEffect, useState} from "react";
import {
    useHistory,
    useParams
} from "react-router-dom";
import axios from "axios";
import {Button, Grid, Typography} from "@material-ui/core";
import Card from "./ChainCard";
import AddIcon from '@material-ui/icons/Add';
import AddChainDialog from "./Dialog";

type ChainParams = { id: number, campaign: number, name: string, description?: string };
export type NewChainParams = { campaign: number, name: string, description?: string }

const Builder = () => {
    const [chains, setChains] = useState<ChainParams[]>([])
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get('/api/v1/allchains/')
            .then(res => res.data)
            .then(res => {
                console.log(res)
                setChains(res)
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
        axios.post('/api/v1/allchains/', data)
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


