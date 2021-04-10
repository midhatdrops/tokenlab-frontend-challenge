import React from 'react';
import { Homepage } from './Pages/Homepage';
import { DashBoard } from './Pages/Dashboard';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/dashboard" component={DashBoard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
