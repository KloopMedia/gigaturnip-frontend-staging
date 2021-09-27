import React, {useContext, useEffect, useState} from 'react';
import clsx from 'clsx';
import {createStyles, makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MenuIcon from '@material-ui/icons/Menu'

import {
    AppBar,
    Button,
    CssBaseline,
    Drawer,
    FormControl,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    Toolbar,
    Typography
} from "@material-ui/core";
import {signInWithGoogle, signOut} from '../../util/Firebase';
import {AuthContext} from "../../util/Auth";
import {useHistory, useParams} from "react-router-dom";
import axios from '../../util/Axios';

import {campaignsUrl} from '../../util/Urls';
import { AppbarParams, CampaignParams } from '../../util/Types';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            // padding: theme.spacing(3),
        },
        title: {
            flexGrow: 1
        },
        formControl: {
            margin: theme.spacing(1),
            alignItems: 'center'
            // minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        select: {},
        selectIcon: {
            fill: 'white',
            top: 'calc(50% - 14px)'
        },
    }),
);


const Appbar = (props: AppbarParams) => {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const {campaignId} = useParams<{ campaignId: string }>();
    const {currentUser} = useContext(AuthContext)
    const {children} = props;

    const [open, setOpen] = useState(false);
    const [campaign, setCampaign] = useState<number | string | unknown>(campaignId);
    const [allCampaigns, setAllCampaigns] = useState<CampaignParams[]>([])

    console.log("CURRENT CAMPAIGN", campaignId)

    useEffect(() => {
        axios.get(campaignsUrl)
            .then(res => res.data)
            .then(res => {
                console.log(res)
                setAllCampaigns(res)
            })
    }, [])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleOptionClick = (page: string) => {
        history.push(`/campaign/${campaignId}/${page}`)
    };

    const handleCampaignChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        let value = event.target.value;
        console.log(value)
        setCampaign(value)
        history.push(`/campaign/${value}`)
    }

    const redirectToMain = () => {
        history.push('/')
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap style={{cursor: "pointer"}} onClick={redirectToMain}>
                        GigaTurnip Admin
                    </Typography>
                    <Grid className={classes.title} />
                    <FormControl className={classes.formControl} size="small">
                        <Select
                            className={classes.select}
                            autoWidth
                            labelId="campaign-select-label"
                            id="campaign-select-label"
                            value={campaign}
                            onChange={handleCampaignChange}
                            label="Campaign"
                            disableUnderline
                            style={{color: 'white'}}
                            inputProps={{
                                classes: {
                                    icon: classes.selectIcon,
                                },
                            }}
                        >
                            {allCampaigns.map(camp => <MenuItem key={`${camp.name}_${camp.id}`}
                                                                value={camp.id}>{camp.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    {currentUser ?
                        <Button onClick={signOut} color={"inherit"}>
                            Log out
                        </Button>
                        :
                        <Button onClick={signInWithGoogle} color={"inherit"}>
                            Login
                        </Button>
                    }
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    {/*<ListItem button onClick={() => handleOptionClick("manual")}>*/}
                    {/*    <ListItemIcon><MenuBookIcon/></ListItemIcon>*/}
                    {/*    <ListItemText primary={"Manual"}/>*/}
                    {/*</ListItem>*/}
                    <ListItem button onClick={() => handleOptionClick("chain")}>
                        <ListItemIcon><InboxIcon/></ListItemIcon>
                        <ListItemText primary={"Chains"}/>
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                {children}
            </main>
        </div>
    );
}

export default Appbar
