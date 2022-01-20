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
            <CardContent sx={{pb: 1}}>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography gutterBottom variant={"caption"} color="text.secondary">ID: {id}</Typography>
                <Typography overflow={"hidden"} textOverflow={"ellipsis"} variant="body2" sx={{height: 60, maxWidth: 500}}>
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