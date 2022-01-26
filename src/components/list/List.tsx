import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import {useLocation} from "react-router-dom";
import ListContent from "./ListContent";
import ListHeader from "./ListHeader";
import {ViewProps} from "./List.types";


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
            <ListHeader label={label} view={view} onViewChange={handleViewChange} location={location}
                        showCreateButton={showCreateButton} showViewButton={showViewButton}/>
            <ListContent data={data} view={view} onSelect={onSelect}/>
        </Box>
    );
};

export default List