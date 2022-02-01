import React, {Component} from 'react';
import {Box, IconButton, Stack, Tooltip} from "@mui/material";
import {ViewModeProps} from "../StageBuilder.types";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {styled} from "@mui/material/styles";

type Props = {
    mode: ViewModeProps,
    allModes: { [mode: string]: { title: string, icon: Component } },
    onChange: (mode: ViewModeProps) => void,
    onBack: () => void
};

const GoBackButton = styled(IconButton)(({theme}) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));

const Controls = (props: Props) => {
    const {mode, allModes, onChange, onBack} = props;

    const renderButtons = () => {
        const types = Object.keys(allModes);
        return types.map((type: any) => {
            const fill = mode === type ? "primary" : "default";
            const title = allModes[type].title;
            const icon = allModes[type].icon;
            return (
                <Box key={type}>
                    <Tooltip title={title}>
                        <IconButton color={fill} onClick={() => onChange(type as ViewModeProps)}>
                            {icon}
                        </IconButton>
                    </Tooltip>
                </Box>
            );
        });
    };

    return (
        <Box display={"flex"} justifyContent={"flex-end"} sx={{position: "sticky", top: 60}} p={1} zIndex={1}>
            <Box flex={1}>
                <Tooltip title={"Назад"}>
                    <GoBackButton onClick={onBack}>
                        {<ArrowBackIcon fontSize={"large"}/>}
                    </GoBackButton>
                </Tooltip>
            </Box>
            <Stack direction="row" spacing={1}>
                {renderButtons()}
            </Stack>
        </Box>
    );
};

export default Controls