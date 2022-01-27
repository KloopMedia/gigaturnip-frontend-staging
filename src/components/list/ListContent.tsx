import React from 'react';
import {Grid, Typography} from "@mui/material";
import Card from "../card/Card";
import ExpandableCard from "../card/ExpandableCard";
import {ViewProps} from "./List.types";

type Props = {
    data: any[],
    view: ViewProps,
    onSelect: (id: number) => void
};

const ListContent = (props: Props) => {
    const {data, view, onSelect} = props;
    if (!data) {
        return <Typography>Error</Typography>;
    }
    if (view === "grid") {
        return (
            <Grid container py={2} spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                {data.map((item, index) =>
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <Card data={item} onClick={onSelect}/>
                    </Grid>
                )}
            </Grid>
        );
    }
    if (view === "list") {
        return (
            <Grid container py={2} spacing={2}>
                {data.map((item, index) =>
                    <Grid item xs={12} key={index}>
                        <ExpandableCard data={item} hideExpandButton={true} onClick={onSelect}/>
                    </Grid>
                )}
            </Grid>
        );
    }
    return null;
};

export default ListContent