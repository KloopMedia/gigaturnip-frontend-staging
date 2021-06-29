import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {blue} from '@material-ui/core/colors';
import {DialogActions, DialogContent, Grid, TextField} from "@material-ui/core";
import {NewChainParams} from "./Chains";


const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

type ChainDialogProps = {
    open: boolean;
    onClose: () => void;
    onSave: (data: NewChainParams) => void;
}

const AddChainDialog = (props: ChainDialogProps) => {
    const classes = useStyles();
    const {onClose, onSave, open} = props;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [campaign, setCampaign] = useState<number>();

    const handleClose = () => {
        onClose();
    };

    const handleSave = () => {
        if (name && campaign) {
            let data = {name, description, campaign}
            onSave(data)
        }
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        if (value) {
            setName(value)
        }
        else {
            setName('')
        }
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        if (value) {
            setDescription(value)
        }
        else {
            setDescription('')
        }
    };

    const handleCampaignChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(event.target.value)
        if (value) {
            setCampaign(value)
        }
        else {
            setCampaign(undefined)
        }
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle>Add Chain</DialogTitle>
            <DialogContent>
                <Grid container justify={"center"}>
                    <Grid container item><TextField fullWidth label={"Name"} onChange={handleNameChange}/></Grid>
                    <Grid container item>
                        <TextField fullWidth label={"Campaign"} type="number" onChange={handleCampaignChange}/>
                    </Grid>
                    <Grid container item>
                        <TextField fullWidth label={"Description"} multiline rows={4} onChange={handleDescriptionChange}/>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddChainDialog