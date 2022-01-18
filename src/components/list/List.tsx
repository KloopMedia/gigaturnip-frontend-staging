import React from 'react';
import Card from "../card/Card";
import {Box, Grid, Typography} from "@mui/material";

type Props = {
    data: any[],
    label: string,
    onSelect: (id: number) => void;
};

const ListCampaigns = (props: Props) => {
    const {data, label, onSelect} = props;

    return (
        <Box px={3}>
            <Typography variant={"h4"}>{label}</Typography>
            <Grid container py={2} spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                {data.map((item, index) =>
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <Card data={item} onClick={onSelect}/>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default ListCampaigns