import React from 'react';
import BaseNode from "./BaseNode";
import { NodeType, ConditionType } from "./Node.types";
import { styled } from "@mui/material/styles";
import { Box, Typography } from '@mui/material';

const Node = styled(BaseNode)(({ theme }) => ({
    // borderColor: '#0041d0'
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
}));


const buildConditionText = (condition: ConditionType) => {
    return `${condition.field} ${condition.condition} ${condition.value}`
}

const ConditionList = (props: { conditions: ConditionType[] }) => {
    const { conditions } = props;
    return <Box>
        {conditions.map((item, index) =>
            <Typography key={`condition_${index}`} style={{ border: '1px solid', borderRadius: '10px', background: 'lightgrey' }} px={1} variant={'body2'}>
                {buildConditionText(item)}
            </Typography>
        )}
    </Box>
}

const CustomLogicNode = ({ data }: NodeType) => <Box display={"flex"} alignItems="center">
    <Node data={data} type={"logic"} />
    <ConditionList conditions={data.conditions} />
</Box>;

export default CustomLogicNode