import React, {useEffect, useState} from "react";
import firebase from '../../util/Firebase'
import {
    useHistory,
    useParams
} from "react-router-dom";

import {
    Button,
    FormControl,
    Grid,
    Select,
    InputLabel,
    MenuItem,
    createStyles,
    makeStyles,
    Theme
} from '@material-ui/core'
import axios from "axios";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 150,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

type RouterParams = { id: string }

const Builder = () => {
    const [taskExist, setTaskExist] = useState(false)
    const [presets, setPresets] = useState<string[]>([])
    const [showPresets, setShowPresets] = useState(false)

    let {id} = useParams<RouterParams>();
    const history = useHistory();

    const classes = useStyles();
    const [presetId, setPresetId] = React.useState('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const preset = event.target.value as string
        firebase.firestore().collection('presets').doc(preset).get().then(doc => {
            if (doc && doc.exists) {
                let data = doc.data()
                if (data) {
                    firebase.firestore().collection('stage').doc(id).set(data, {merge: true})
                        .then(() => history.push('/createStage/' + id))
                }
            }
        })
        setPresetId(preset);
        console.log("PRESET", preset)
    };

    // useEffect(() => {
    //     firebase.firestore().collection('stage').doc(id).get().then(doc => {
    //         if (doc && doc.exists) {
    //             setTaskExist(true)
    //         }
    //     })
    // }, [id])

    const handleCreate = () => {
        history.push('/createStage/' + id)
    }

    const handleOpen = () => {
        let data = {stage: id}
        axios.post('/', data)
            .then(res => res.data)
            .then(res => {
                console.log(res)
                history.push('/t/' + id)
            })
    }

    return (
        <Grid>
            <Grid container justify="center" style={{background: '#7FB3D5'}} component={"div"}>
                <Grid item style={{margin: 20}}><Button onClick={handleCreate}>Create Form</Button></Grid>
                <Grid item style={{margin: 20}}><Button onClick={handleOpen}>Open
                    Form</Button></Grid>
            </Grid>
        </Grid>
    )
}

export default Builder