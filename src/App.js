import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
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
          <Route exact path="/" component={InputTable} />
          <Route path="/Login" component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
