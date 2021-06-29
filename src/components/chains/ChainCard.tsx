import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        width: 300,
        // height: 200
    },
    extra: {
        marginBottom: 15
    }
});

type CardProps = { chain: { id: number, campaign: number, name: string, description?: string } }

const ChainCard = (props: CardProps) => {
    const classes = useStyles();
    const {id, campaign, name, description} = props.chain;
    const history = useHistory()

    const handleOpen = () => {
        history.push(`${history.location.pathname}/${id}`)
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom={true}>
                    {name}
                </Typography>
                <Typography className={classes.extra} variant="subtitle2" color="textSecondary">
                    ID: {id} Campaign: {campaign}
                </Typography>
                <Typography variant="body1" component="p">
                    {description ? description : <br/>}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleOpen}>Open</Button>
            </CardActions>
        </Card>
    );
};

export default ChainCard