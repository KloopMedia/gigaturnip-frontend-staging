import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {CardParams} from "../../util/Types";

const useStyles = makeStyles({
    root: {
        width: 300,
        // height: 200
    },
    extra: {
        marginBottom: 15
    }
});

const ParentCard = (props: CardParams) => {
    const classes = useStyles();
    const {id, name, description, campaign} = props.data;
    const {onCardButtonClick, openCampaignInfo} = props;

    const handleOpen = () => {
        onCardButtonClick(id)
    }

    const redirectToInfoPage = () => {
        if (openCampaignInfo) {
            openCampaignInfo(id)
        }
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom={true}>
                    {name}
                </Typography>
                <Typography className={classes.extra} variant="subtitle2" color="textSecondary">
                    ID: {id} {campaign && `Campaign: ${campaign}`}
                </Typography>
                <Typography variant="body1" component="p">
                    {description ? description : <br/>}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleOpen}>Open</Button>
                {/*<Button size="small" onClick={redirectToInfoPage}>Info</Button>*/}
            </CardActions>
        </Card>
    );
};

export default ParentCard