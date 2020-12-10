import React, { useState, useEffect } from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import InputTable from './components/InputTable';
import Drawer from './components/Drawer';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from './UserContext';
import Cookie from 'js-cookie';

function App() {
  const token = Cookie.get('token');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:1337/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          setUser(response.username);
        });
    }
  });
  return (
    <BrowserRouter>
      <div>
        <UserContext.Provider value={user}>
          <Drawer />

          <Route exact path="/" component={withRouter(InputTable)} />
          <Route exact path="/login" component={withRouter(Login)} />
          <Route exact path="/sign-up" component={withRouter(SignUp)} />
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
