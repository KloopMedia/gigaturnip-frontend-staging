import React, { useEffect, useState } from "react";
import firebase from '../../util/Firebase'
import {
    useHistory,
    useParams
} from "react-router-dom";

import { Button, FormControl, Grid, Select, InputLabel, MenuItem, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Builder = () => {
    const [taskExist, setTaskExist] = useState(false)
    const [presets, setPresets] = useState([])
    const [showPresets, setShowPresets] = useState(false)

    let { id } = useParams();
    const history = useHistory();

    const classes = useStyles();
    const [presetId, setPresetId] = React.useState('');

    const handleChange = (event) => {
        const preset = event.target.value
        firebase.firestore().collection('presets').doc(preset).get().then(doc => {
            if (doc && doc.exists) {
                firebase.firestore().collection('stage').doc(id).set(doc.data(), { merge: true })
                    .then(() => history.push('/createStage/' + id))
            }
        })
        setPresetId(preset);
        console.log("PRESET", preset)
    };

    useEffect(() => {
        firebase.firestore().collection('stage').doc(id).get().then(doc => {
            if (doc && doc.exists) {
                setTaskExist(true)
            }
        })
    }, [id])

    useEffect(() => {
        if (showPresets) {
            firebase.firestore().collection('presets').get().then(snap => {
                let preset = []
                snap.forEach(doc => {
                    preset.push(doc.id)
                })
                return preset
            }).then(preset => setPresets(preset))
        }
    }, [showPresets])

    const handleCreate = () => {
        history.push('/createStage/' + id)
    }

    const handleOpen = () => {
        history.push('/t/' + id)
    }

    const handleRedirect = () => {
        setShowPresets(!showPresets)
    }

    return (
        <Grid>
            <Grid container display="flex" justify="center" style={{ background: '#7FB3D5' }}>
                <Grid item style={{ margin: 20 }}><Button onClick={handleCreate}>Create Form</Button></Grid>
                <Grid item style={{ margin: 20 }}><Button disabled={!taskExist} onClick={handleOpen}>Open Form</Button></Grid>
                <Grid item style={{ margin: 20 }}><Button onClick={handleRedirect}>Presets</Button></Grid>
            </Grid>
            {showPresets && <Grid container display="flex" justify="center">
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Presets</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={presetId}
                        onChange={handleChange}
                    >
                        {presets.map(preset => <MenuItem key={preset} value={preset}>{preset}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>}
        </Grid>
    )
}

export default Builder