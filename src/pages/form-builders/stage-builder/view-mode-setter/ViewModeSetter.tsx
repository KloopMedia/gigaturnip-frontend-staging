import React, {Component} from 'react';
import {IconButton, Stack, Tooltip} from "@mui/material";
import {ViewModeProps} from "../StageBuilder.types";

type Props = {
    mode: ViewModeProps,
    allModes: {[mode: string]: {title: string, icon: Component}},
    onChange: (mode: ViewModeProps) => void
};

const ViewModeSetter = (props: Props) => {
    const {mode, allModes, onChange} = props;

    const renderButtons = () => {
        const types = Object.keys(allModes);
        return types.map((type: any) => {
            const fill = mode === type ? "primary" : "default";
            const title = allModes[type].title;
            const icon = allModes[type].icon;
            return (
                <Tooltip title={title} key={type}>
                    <IconButton color={fill} onClick={() => onChange(type as ViewModeProps)}>
                        {icon}
                    </IconButton>
                </Tooltip>
            );
        });
    };

    return (
        <Stack direction="row" spacing={1}>
            {renderButtons()}
        </Stack>
    );
};

export default ViewModeSetter