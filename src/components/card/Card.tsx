import React from 'react';
import {Button, CardActions, CardContent, Typography} from '@mui/material'
import MuiCard from '@mui/material/Card';

type Props = {
    data: any;
    onClick: (id: number) => void;
};

const Card = (props: Props) => {
    const {data, onClick} = props;
    const {name, description, id} = data;

    const handleClick = () => {
        onClick(id)
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