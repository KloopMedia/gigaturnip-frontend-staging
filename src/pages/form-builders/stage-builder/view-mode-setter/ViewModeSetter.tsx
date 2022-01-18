import React from 'react';
import {IconButton, Stack} from "@mui/material";
import {ViewModeProps} from "../StageBuilder.types";
import BuildIcon from '@mui/icons-material/Build';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

type Props = {
    mode: ViewModeProps,
    onChange: (mode: ViewModeProps) => void
};

const ViewModeSetter = (props: Props) => {
    const {mode, onChange} = props;
    const types = ["builder", "text", "preview", "editor"]

    const getIcon = (type: ViewModeProps) => {
        const fill = mode === type ? "blue" : "grey";
        switch (type) {
            case "builder":
                return <BuildIcon sx={{fill}} fontSize={"large"}/>
            case "text":
                return <EditIcon sx={{fill}} fontSize={"large"}/>
            case "preview":
                return <VisibilityIcon sx={{fill}} fontSize={"large"}/>
            case "editor":
                return <CompareArrowsIcon sx={{fill}} fontSize={"large"}/>
        }
    }

    const renderButtons = () => {
        return types.map((type: any) =>
            (
                <IconButton key={type} onClick={() => onChange(type as ViewModeProps)}>
                    {getIcon(type)}
                </IconButton>
            ))
    }

    return (
        <Stack direction="row" spacing={1}>
            {renderButtons()}
        </Stack>
    );
};

export default ViewModeSetter