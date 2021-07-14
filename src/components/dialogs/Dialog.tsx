import React, {useState} from "react";
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Grid,
    TextField,
    Button
} from "@material-ui/core";
import {DialogParams} from "../../util/Types";


const ParentDialog = (props: DialogParams) => {
    const {title, onClose, onSave, open} = props;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleClose = () => {
        onClose();
    };

    const handleSave = () => {
        let data = {name, description}
        onSave(data)
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        if (value) {
            setName(value)
        } else {
            setName('')
        }
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        if (value) {
            setDescription(value)
        } else {
            setDescription('')
        }
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Grid container justify={"center"}>
                    <Grid container item><TextField fullWidth label={"Name"} onChange={handleNameChange}/></Grid>
                    <Grid container item>
                        <TextField fullWidth label={"Description"} multiline rows={4}
                                   onChange={handleDescriptionChange}/>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ParentDialog