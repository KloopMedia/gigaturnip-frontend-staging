import React from 'react';
import {Button, IconButton, Stack} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import SettingsIcon from '@mui/icons-material/Settings';
import {baseUrl, tasksUrl} from "../../services/api/Urls";

type Props = {
    id: number,
    stage: any,
    onDownloadClick: (id: number, stage: number) => void,
    onSettingsClick: (id: number) => void
};

const ResponseFlattenerCard = (props: Props) => {
    const {id, stage, onDownloadClick, onSettingsClick} = props;

    const handleDownloadClick = () => {
        onDownloadClick(stage.id, id);
    }

    const handleSettingsClick = () => {
        onSettingsClick(id);
    }

    console.log(id, stage)

    return (
        <Card sx={{width: '100%'}}>
            <CardHeader
                action={
                    <Stack direction="row" spacing={1}>
                        <IconButton onClick={handleSettingsClick}><SettingsIcon/></IconButton>
                        <Button key={"open_button"} variant={"contained"} onClick={handleDownloadClick}>Скачать</Button>
                    </Stack>
                }
                title={`Stage: ${stage.name}`}
                subheader={`ID: ${id}`}
                titleTypographyProps={{variant: "h6"}}
                subheaderTypographyProps={{variant: "caption"}}
            />
        </Card>
    );
};

export default ResponseFlattenerCard