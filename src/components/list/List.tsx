import React, {useEffect, useState} from 'react';
import Card from "../card/Card";
import {Box, Button, Grid, IconButton, Typography} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import {Link, useLocation} from "react-router-dom";

type ViewProps = "grid" | "list";

type Props = {
    data: any[],
    id: string,
    label: string,
    showCreateButton?: boolean,
    showViewButton?: boolean,
    onSelect: (id: number) => void,
};

const List = (props: Props) => {
    const {id, data, label, showCreateButton, showViewButton, onSelect} = props;
    const location = useLocation();

    const [view, setView] = useState<ViewProps>("grid");

    useEffect(() => {
        const view = localStorage.getItem(`${id}_view`) as ViewProps || "grid";
        if (view) {
            setView(view)
        }
    }, [])

    const handleViewChange = (view: ViewProps) => {
        setView(view)
        localStorage.setItem(`${id}_view`, view);
    }

    return (
        <Box>
            <Grid container alignItems={"center"} spacing={1}>
                <Grid item flex={1}>
                    <Typography variant={"h4"}>{label}</Typography>
                </Grid>
                {showCreateButton && <Grid item>
                    <Button component={Link} to={"new"} state={{from: location}} variant={"contained"} sx={{
                        '&:hover': {
                            color: 'white',
                            boxShadow: 'none',
                        }
                    }}>Создать</Button>
                </Grid>}
                {showViewButton && <Grid item>
                    <IconButton color={view === "grid" ? "primary" : "default"} onClick={() => handleViewChange("grid")}>
                        <GridViewIcon/>
                    </IconButton>
                    <IconButton color={view === "list" ? "primary" : "default"} onClick={() => handleViewChange("list")}>
                        <ViewListIcon/>
                    </IconButton>
                </Grid>}
            </Grid>

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

export default List