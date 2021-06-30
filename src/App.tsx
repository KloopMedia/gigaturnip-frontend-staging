import React, {useContext} from "react";
import Graph from './components/graph/Graph'
import StageBuilder from './components/form-builders/StageBuilder'
import LogicBuilder from './components/form-builders/LogicBuilder'
import Actions from './components/actions/Actions'
import Task from './components/task/Task'
import Appbar from "./components/appbar/Appbar";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {AuthContext} from "./util/Auth";
import Chains from "./components/chains/Chains";
import Campaigns from "./components/campaigns/Campaigns";
import SimpleAppbar from "./components/appbar/SimpleAppbar";


const App = () => {
    const {currentUser} = useContext(AuthContext)

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
                            <Route exact path="/campaign/:campaignId/t/:id">
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