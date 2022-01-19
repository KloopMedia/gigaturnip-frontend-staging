import React from 'react';
import {Grid} from "@mui/material";

type Props = {};

const ListLayout: React.FC<Props> = (props) => {
    const {children} = props;
    return (
        <Grid container py={2} spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
            {children}
        </Grid>
    );
};

export default ListLayout