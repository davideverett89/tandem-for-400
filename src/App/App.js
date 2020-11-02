import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import fbConnection from '../helpers/data/connection';

import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import Session from '../components/pages/Session/Session';
import Score from '../components/pages/Score/Score';

import MyNavBar from '../components/shared/MyNavBar/MyNavBar';

import './App.scss';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const App = () => {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthed(true);
      } else {
        setAuthed(false);
      }
    });
    return removeListener;
  }, [authed]);

  return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavBar authed={authed} />
            <Switch>
              <PrivateRoute path="/home" component={Home} authed={authed} />
              <PrivateRoute path="/session/:sessionId" component={Session} authed={authed} />
              <PrivateRoute path="/score/:sessionId" component={Score} authed={authed} />
              <PublicRoute path='/auth' component={Auth} authed={authed} />
              <Redirect from="*" to="/home"/>
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
  );
};

export default App;
