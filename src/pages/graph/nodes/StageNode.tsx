import React from 'react';
import BaseNode from "./BaseNode";
import { NodeType, Rank } from "./Node.types";
import { styled } from "@mui/material/styles";
import { Avatar, Box, Icon, Typography } from '@mui/material';


const Node = styled(BaseNode)(({ theme }) => ({
    // borderColor: '#32CD32'
    color: theme.palette.success.contrastText,
    backgroundColor: theme.palette.success.main,
}));

const RankRow = (props: { ranks: Rank[] }) => {
    const { ranks } = props;

    return <Box display={"flex"}>
        {ranks.map((item, index) => <Box key={`rank_${index}`} display={"flex"} flexDirection="column" justifyContent={"center"} alignItems="center" bgcolor={"orange"} p={0.3} border={"1px solid"}>
            <Avatar sx={{ width: 30, height: 30 }} src={`data:image/svg+xml;utf8,${item.avatar}`} />
            <Typography variant='body2'>{item.name}</Typography>
        </Box>)}
    </Box>
}

const CustomStageNode = ({ data }: NodeType) => <Box display={"flex"}>
    <Node data={data} type={"stage"} />
    <RankRow ranks={data.ranks}/>
</Box>;

export default CustomStageNode