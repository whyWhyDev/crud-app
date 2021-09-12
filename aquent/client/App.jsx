import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
// import { BaseContainer } from './components';
import BaseContainer from './components/BaseContainer'
import { ContactEditor, CompanyEditor } from './components';
import { Contacts } from './pages'
// import 'bootstrap';

import './sass/MainContainer.scss'
import "./sass/App.scss";

const App = React.memo(({ history }) => {

  return (
    <div className="main-container">
      <Switch>
      <Route exact path="/">
        <BaseContainer />
      {/* <Contacts /> */}
        </Route>
        <Route exact path="/home">
        </Route>
        <Route path="/profile">
        </Route>
        <Route path="/matches">
        </Route>
      </Switch>
    </div>
  );
});

// export default App;
export default withRouter(App);
