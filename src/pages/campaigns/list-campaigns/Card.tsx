import React from 'react';
import {Button, CardActions, CardContent, Typography} from '@mui/material'
import MuiCard from '@mui/material/Card';
import {useCampaign} from "../../../utils/hooks/useCampaign";
import {useNavigate} from "react-router-dom";

type Props = {
    data: any;
};

const Card = (props: Props) => {
    const {name, description, id} = props.data;
    const {select} = useCampaign();
    const navigate = useNavigate();

    const handleClick = () => {
        select(id, () => navigate(`chains/${id}`))
    }

    return (
        <MuiCard>
            <CardContent>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography gutterBottom variant={"caption"} color="text.secondary">ID: {id}</Typography>
                <Typography noWrap={true} variant="body1" sx={{height: 40}}>
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleClick}>Открыть</Button>
            </CardActions>
        </MuiCard>
    );
};

export default Card