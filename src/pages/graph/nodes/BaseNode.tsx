import React from 'react';
import {Handle, Position} from 'react-flow-renderer';
import {styled, Theme} from "@mui/material/styles";
import {NodeType} from "./Node.types";
import {Box, BoxProps as MuiBoxProps, Typography} from "@mui/material";


interface NodeProps extends MuiBoxProps {
    type: "logic" | "stage";
}

const Node = styled(Box)<NodeProps>(({theme, type}) => ({
    fontSize: '12px',
    width: '150px',
    textAlign: 'center',
    color: type === "stage" ? theme.palette.success.contrastText : theme.palette.primary.contrastText,
    backgroundColor: type === "stage" ? theme.palette.success.main : theme.palette.primary.main,
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
}));


const BaseNode = (props: NodeType) => {
    const {data, type} = props;

    return (
        <Node type={type}>
            <Typography>{data.label}</Typography>
            <Handle
                type="target"
                position={Position.Top}
                style={{borderRadius: '100%', width: 10, height: 10}}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                style={{borderRadius: '100%', width: 10, height: 10}}
            />
        </Node>
    );
};

export default BaseNode