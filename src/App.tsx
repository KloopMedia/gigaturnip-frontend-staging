import React from "react";
import Graph from './components/graph/Graph'
import StageBuilder from './components/form-builders/StageBuilder'
import LogicBuilder from './components/form-builders/LogicBuilder'
import Actions from './components/actions/Actions'
import Task from './components/task/Task'
import Appbar from "./components/appbar/Appbar";

import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Chains from "./components/chains/Chains";
import Campaigns from "./components/campaigns/Campaigns";
import SimpleAppbar from "./components/appbar/SimpleAppbar";


const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path={"/campaign/:campaignId"}>
                        <Appbar>
                            <Route exact path="/campaign/:campaignId/chain/:chainId/createstage/:id">
                                <StageBuilder/>
                            </Route>
                            <Route exact path="/campaign/:campaignId/chain/:chainId/createlogic/:id">
                                <LogicBuilder/>
                            </Route>
                            <Route exact path="/campaign/:campaignId/chain/:chainId/task/:id">
                                <Task/>
                            </Route>
                            <Route exact path="/campaign/:campaignId/chain/:chainId/actions/:id">
                                <Actions/>
                            </Route>
                            <Route exact path="/campaign/:campaignId/chain">
                                <Chains/>
                            </Route>
                            <Route exact path="/campaign/:campaignId/chain/:chainId">
                                <Graph/>
                            </Route>
                        </Appbar>
                    </Route>
                    <Route path="/">
                        <SimpleAppbar>
                            <Campaigns/>
                        </SimpleAppbar>
                    </Route>
                </Switch>
            </Router>

        </div>
    );
}

export default App