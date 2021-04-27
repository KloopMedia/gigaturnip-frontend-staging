import Graph from "react-graph-vis";
import React, { useEffect, useState } from "react";
import firebase from './util/Firebase'
import FormBuilder from './Components/FormBuilder'
import RelationBuilder from './Components/RelationBuilder'
import Home from './Components/Home'
import Task from './Components/Task'
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";


const App = () => {

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/createStage/:id">
            <FormBuilder />
          </Route>
          <Route exact path="/createRelation/:id">
            <RelationBuilder />
          </Route>
          <Route exact path="/t/:id">
            <Task />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>

    </div>
  );

}

export default App