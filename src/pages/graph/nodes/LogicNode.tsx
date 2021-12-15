import React from 'react';
import BaseNode from "./BaseNode";
import {NodeType} from "./Node.types";
import {styled} from "@mui/material/styles";

const Node = styled(BaseNode)(({theme}) => ({
    // borderColor: '#0041d0'
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
}));

const CustomLogicNode = ({data}: NodeType) => <Node data={data} type={"logic"}/>;

export default CustomLogicNode