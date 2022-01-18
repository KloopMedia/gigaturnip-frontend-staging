import React, {useEffect, useState} from 'react';
import {Box, Grid, TextField, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";


const Node = styled(Box)<{ type: "stage" | "logic" }>(({theme, type}) => ({
    fontSize: '12px',
    width: '150px',
    textAlign: 'center',
    color: type === "stage" ? theme.palette.success.contrastText : theme.palette.primary.contrastText,
    backgroundColor: type === "stage" ? theme.palette.success.main : theme.palette.primary.main,
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    cursor: "grab",
    margin: 8,
}));

const Sidebar = () => {
    const [draggable, setDraggable] = useState(false)
    const [label, setLabel] = useState("")

    useEffect(() => {
        if (label && label !== "") {
            setDraggable(true)
        } else {
            setDraggable(false)
        }
    }, [label])

    const onDragStart = (event: { dataTransfer: DataTransfer }, nodeLabel: string, nodeType: string) => {
        let data = JSON.stringify({label, type: nodeType})
        event.dataTransfer.setData('application/reactflow', data);
        event.dataTransfer.effectAllowed = 'move';
    };

    const onDragEnd = () => {
        setLabel("")
    }

    return (
        <Grid item container justifyContent={"center"} px={1}>
            <Grid container item mt={2} justifyContent={"center"}>
                <TextField label={"Label"} size="small" value={label} onChange={(e) => setLabel(e.target.value)}/>
                <Typography py={1} variant={"caption"} color={"red"} align={"center"}>
                    {!draggable && 'Enter label to drag the node'}
                </Typography>
            </Grid>
            <Grid item>
                <Node type={"stage"} onDragEnd={onDragEnd}
                      onDragStart={(event) => onDragStart(event, label ? label : '', 'STAGE')}
                      draggable={draggable}>
                    Stage Node
                </Node>
                <Node type={"logic"} onDragEnd={onDragEnd}
                      onDragStart={(event) => onDragStart(event, label ? label : '', 'LOGIC')}
                      draggable={draggable}>
                    Logic Node
                </Node>
            </Grid>
        </Grid>
    );
};

export default Sidebar