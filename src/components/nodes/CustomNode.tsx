import React from 'react';
import {Handle, Position} from 'react-flow-renderer';
import {createStyles, Grid, makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            background: '#FFF',
            borderColor: '#000',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderRadius: '3px',
            fontSize: '12px',
            width: '150px',
            textAlign: 'center',
            padding: 10
        },
    }));

type NodeProps = { data: {label: string}, style: object }

const CustomNode = ({data, style}: NodeProps) => {
    const classes = useStyles();

    return (
        <Grid className={classes.root} style={style}>
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
        </Grid>
    );
};

export default CustomNode