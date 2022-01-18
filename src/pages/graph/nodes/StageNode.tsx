import React from 'react';
import BaseNode from "./BaseNode";
import {NodeType} from "./Node.types";
import {styled} from "@mui/material/styles";


const Node = styled(BaseNode)(({theme}) => ({
    // borderColor: '#32CD32'
    color: theme.palette.success.contrastText,
    backgroundColor: theme.palette.success.main,
}));

const CustomStageNode = ({ data }: NodeType) => <Node data={data} type={"stage"} />;

export default CustomStageNode