import React from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import InputTable from './components/InputTable';
import Drawer from './components/Drawer';
import Login from './components/Login';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Drawer />
        <Switch>
          <Route exact path="/" component={withRouter(InputTable)} />
          <Route exact path="/login" component={withRouter(Login)} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
