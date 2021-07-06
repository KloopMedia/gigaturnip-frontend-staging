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
import axios from "../../util/Axios";

import {casesUrl, tasksUrl} from '../../util/Urls'

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

type RouterParams = { id: string, chainId: string }

const Builder = () => {
    let {id, chainId} = useParams<RouterParams>();
    const history = useHistory();

    const handleCreateStage = () => {
        let location = history.location.pathname.split('/actions')[0]
        console.log(location)
        history.push(`${location}/createstage/${id}`)
    }

    const handleCreateTask = async () => {
        let location = history.location.pathname.split('/actions')[0]
        let caseData = await axios.post(casesUrl, {chain: chainId})
            .then(res => res.data)
        console.log(caseData)
        let taskData = await axios.post(tasksUrl, {case: caseData.id, stage: id})
            .then(res => res.data)
        console.log(taskData)
        history.push(`${location}/task/${taskData.id}`)
    }

    return (
        <Grid>
            <Grid container justify="center" style={{background: '#7FB3D5'}} component={"div"}>
                <Grid item style={{margin: 20}}>
                    <Button onClick={handleCreateStage}>Create Form</Button>
                </Grid>
                <Grid item style={{margin: 20}}>
                    <Button onClick={handleCreateTask}>Create Task (for test)</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Builder