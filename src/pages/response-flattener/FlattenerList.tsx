import React, {useEffect, useState} from 'react';
import useAxios from "../../services/api/useAxios";
import {Box, Button, Grid} from "@mui/material";
import ResponseFlattenerCard from "../../components/card/ResponseFlattenerCard";
import {useNavigate} from "react-router-dom";
import {useToast} from "../../context/toast/hooks/useToast";


const FlattenerList = () => {
    const {getResponseFlattenerList, downloadFlattenedResponses} = useAxios();
    const navigate = useNavigate();
    const {openToast} = useToast();

    const [data, setData] = useState([]);

    useEffect(() => {
        getResponseFlattenerList().then(res => {
            console.log(res)
            setData(res);
        });
    }, [])

    const handleDownload = (stage: number, flattener: number) => {
        downloadFlattenedResponses(stage, flattener)
            .catch(error => openToast(error.message));
    }

    const handleOpen = (id: number) => {
        navigate(`${id}`);
    }

    const handleCreate = () => {
        navigate('new')
    }

    return (
        <Box px={3} py={1} width={"100%"}>
            <Button variant={"contained"} onClick={handleCreate}>
                Создать
            </Button>
            <Grid container py={2} spacing={2}>
                {data.map((item: { task_stage: number, id: number }, index) =>
                    <Grid item xs={12} key={index}>
                        <ResponseFlattenerCard id={item.id} stage={item.task_stage} onDownloadClick={handleDownload}
                                               onSettingsClick={handleOpen}/>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default FlattenerList