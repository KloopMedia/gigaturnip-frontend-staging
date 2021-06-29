import React, {useContext, useEffect} from "react";
import Graph from './components/graph/Graph'
import StageBuilder from './components/form-builders/StageBuilder'
import LogicBuilder from './components/form-builders/LogicBuilder'
import Actions from './components/actions/Actions'
import Task from './components/task/Task'
import Appbar from "./components/appbar/Appbar";

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import axios from "axios";

import {AuthContext} from "./util/Auth";
import Chains from "./components/chains/Chains";
import Campaigns from "./components/campaigns/Campaigns";
import SimpleAppbar from "./components/appbar/SimpleAppbar";


// import Loader from './util/TestLoader'


const App = () => {
    const {currentUser} = useContext(AuthContext)

    useEffect(() => {
        if (currentUser) {
            currentUser.getIdToken(/* forceRefresh */ true).then((idToken: any) => {
                axios.interceptors.request.use((config) => {
                    const token = `JWT ${idToken}`;
                    config.headers.Authorization = token;

                    return config;
                });
            })
        }

    }, [currentUser])


    return (
        <div>
            {/* <button onClick={() => Loader()}>тест</button> */}

            <Router>
                    <Switch>
                        <Route path={"/campaign/:campaignId"}>
                            <Appbar>
                                <Route exact path="/campaign/:campaignId/chain/:chainId/createStage/:id">
                                    <StageBuilder/>
                                </Route>
                                <Route exact path="/campaign/:campaignId/chain/:chainId/createLogic/:id">
                                    <LogicBuilder/>
                                </Route>
                                <Route exact path="/campaign/:campaignId/t/:id">
                                    <Task/>
                                </Route>
                                <Route exact path="/campaign/:campaignId/chain/:chainId/actions/:id">
                                    <Actions/>
                                </Route>
                                <Route exact path="/campaign/:campaignId/chain">
                                    <Chains/>
                                </Route>
                                <Route exact path="/campaign/:campaignId/chain:chainId">
                                    <Graph/>
                                </Route>
                            </Appbar>
                        </Route>
                        <Route path="/">
                            <SimpleAppbar><Campaigns/></SimpleAppbar>
                        </Route>
                    </Switch>
            </Router>

        </div>
    );
}

export default App