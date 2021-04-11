import React from 'react';
import { Homepage } from './Pages/Homepage';
import { DashBoard } from './Pages/Dashboard';
import { RegisterForm } from './Pages/Register';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/dashboard" component={DashBoard} />
        <Route path="/register" component={RegisterForm} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
