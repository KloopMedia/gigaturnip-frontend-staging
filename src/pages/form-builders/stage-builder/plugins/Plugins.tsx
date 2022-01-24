import React from 'react';
import ExpandableCard from "../../../../components/card/ExpandableCard";
import Plugin from "./Plugin";
import {Grid} from "@mui/material";
import BuilderLayout from "../../../../components/layout/common-layouts/BuilderLayout";


type Props = {};

const Plugins = (props: Props) => {
    const {} = props;
    const pluginsList = [1, 2];

    return (
        <BuilderLayout>
            <Grid container py={2} spacing={2}>
                {pluginsList.map((p, index) =>
                    <Grid item xs={12} key={index}>
                        <ExpandableCard data={{name: p}} showExpandButton={true}>
                            <Plugin id={p}/>
                        </ExpandableCard>
                    </Grid>
                )}
            </Grid>
        </BuilderLayout>
    );
};

export default Plugins