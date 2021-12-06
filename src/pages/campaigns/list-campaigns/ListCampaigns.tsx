import React from 'react';
import Card from "./Card";
import {Box, Grid, Typography} from "@mui/material";

type Props = {
    campaigns: any[]
};

const ListCampaigns = (props: Props) => {
    const {campaigns} = props;

    return (

        <Box px={3}>
            <Typography variant={"h4"}>Кампании</Typography>
            <Grid container py={2} spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
            {campaigns.map((campaign, index) =>
                <Grid item xs={2} sm={4} md={4} key={index}>
                    <Card data={campaign}/>
                </Grid>
            )}
        </Grid></Box>
    );
};

export default ListCampaigns