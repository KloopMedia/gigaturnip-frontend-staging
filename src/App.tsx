import React from "react";
import Home from './components/graph/Graph'
import StageBuilder from './components/form-builders/StageBuilder'
import LogicBuilder from './components/form-builders/LogicBuilder'
import Actions from './components/actions/Actions'
import Task from './components/task/Task'
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// import Loader from './util/TestLoader'


const App = () => {

  return (
    <div>
      {/* <button onClick={() => Loader()}>тест</button> */}
      <Router>
        <Switch>
          <Route exact path="/createStage/:id">
            <StageBuilder />
          </Route>
          <Route exact path="/createLogic/:id">
            <LogicBuilder />
          </Route>
          <Route exact path="/t/:id">
            <Task />
          </Route>
          <Route exact path="/actions/:id">
            <Actions />
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