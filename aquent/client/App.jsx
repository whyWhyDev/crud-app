import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import BaseContainer from './pages/BaseContainer'

import "./sass/App.scss";

const App = React.memo(({ history }) => {

  return (
    <div className="main-container">
      <Switch>
      <Route exact path="/">
        <BaseContainer />
        </Route>
      </Switch>
    </div>
  );
});

export default withRouter(App);
