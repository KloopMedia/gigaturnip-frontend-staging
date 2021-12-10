import React from 'react';
import {Handle, Position} from 'react-flow-renderer';
import {styled} from "@mui/material/styles";
import {NodeType} from "./Node.types";


const Node = styled('div')(({theme}) => ({
    // background: '#FFF',
    // borderColor: '#000',
    // borderWidth: '1px',
    // borderStyle: 'solid',
    // borderRadius: '3px',
    fontSize: '12px',
    width: '150px',
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
}));


const BaseNode = (props: NodeType) => {
    const {data, style} = props;

    return (
        <Node style={style}>
            <div>{data.label}</div>
            <Handle
                type="target"
                position={Position.Top}
                style={{borderRadius: '100%'}}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                style={{borderRadius: '100%'}}
            />
        </Node>
    );
};

export default BaseNode