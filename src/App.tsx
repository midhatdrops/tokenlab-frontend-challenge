/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Homepage } from './Pages/Homepage';
import { DashBoard } from './Pages/Dashboard';
import { RegisterForm } from './Pages/Register';
import { EditEventForm } from './Pages/EditEvent';
import { DeleteEventForm } from './Pages/DeleteEvent';
import { CreateEventForm } from './Pages/CreateEvent';
import { Logout } from './Pages/Logout';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/dashboard" component={DashBoard} />
        <Route path="/user/register" component={RegisterForm} />
        <Route path="/events/edit" component={EditEventForm} />
        <Route path="/events/delete" component={DeleteEventForm} />
        <Route path="/events/create" component={CreateEventForm} />
        <Route path="/logout" component={Logout} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
