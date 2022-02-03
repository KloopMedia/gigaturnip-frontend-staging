import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import {useLocation} from "react-router-dom";
import ListContent from "./ListContent";
import ListHeader from "./ListHeader";
import {ViewProps} from "./List.types";


type Props = {
    data: any[],
    id: string,
    label?: string,
    defaultView?: ViewProps;
    hideCreateButton?: boolean,
    hideViewButton?: boolean,
    onSelect: (id: number) => void,
};

const List = (props: Props) => {
    const {id, data, label, defaultView, hideCreateButton, hideViewButton, onSelect} = props;
    const location = useLocation();

    const [view, setView] = useState<ViewProps>(defaultView ?? "grid");

    useEffect(() => {
        if (!defaultView) {
            const view = localStorage.getItem(`${id}_view`) as ViewProps || "grid";
            if (view) {
                setView(view)
            }
        }
    }, [])

    const handleViewChange = (view: ViewProps) => {
        setView(view)
        localStorage.setItem(`${id}_view`, view);
    }

    return (
        <Box>
            <ListHeader label={label} view={view} onViewChange={handleViewChange} location={location}
                        hideCreateButton={hideCreateButton} hideViewButton={hideViewButton}/>
            <ListContent data={data} view={view} onSelect={onSelect}/>
        </Box>
    );
};

export default List