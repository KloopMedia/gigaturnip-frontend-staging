import React from 'react';
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import AuthProvider from "./context/authentication/AuthProvider";
import RequireAuth from "./pages/login/RequireAuth";
import {ROUTES} from "./utils/constants/Paths";
import Campaigns from "./pages/campaigns/Campaigns";
import Login from "./pages/login/Login";
import Layout from "./components/layout/Layout";
import Chains from "./pages/chains/Chains";
import Graph from "./pages/graph/Graph";
import StageBuilder from "./pages/form-builders/stage-builder/StageBuilder";
import LogicBuilder from "./pages/form-builders/logic-builder/LogicBuilder";
import CreateChain from "./pages/chains/create-chain/CreateChain";
import ToastProvider from "./context/toast/ToastProvider";


const App = () => (
    <AuthProvider>
        <ToastProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<RequireAuth><Layout/></RequireAuth>}>
                        <Route path={"campaign"}>
                            <Route path=":campaignId">
                                <Route path="chain">
                                    <Route path=":chainId">
                                        <Route path={"createstage/:stageId"} element={<StageBuilder/>}/>
                                        <Route path={"createlogic/:stageId"} element={<LogicBuilder/>}/>
                                        <Route index element={<Graph/>}/>
                                    </Route>
                                    <Route path="new" element={<CreateChain/>}/>
                                    <Route index element={<Chains/>}/>
                                </Route>
                            </Route>
                            <Route index element={<Campaigns/>}/>
                        </Route>
                        <Route index element={<Campaigns/>}/>
                    </Route>
                    <Route path={ROUTES.login.path} element={<Login/>}/>
                </Routes>
            </Router>
        </ToastProvider>
    </AuthProvider>
);

export default App;
