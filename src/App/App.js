import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import fbConnection from '../helpers/data/connection';

import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import Main from '../components/pages/Main/Main';

import MyNavBar from '../components/shared/MyNavBar/MyNavBar';

import './App.scss';

fbConnection();

const App = () => {
  const [authed, setAuthed] = useState(false);

  const removeListener = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setAuthed(true);
    } else {
      setAuthed(false);
    }
  });

  useEffect(() => {
    removeListener();
  });

  return (
      <div className="App">
        <h2>{authed ? 'Logged In' : 'Logged Out'}</h2>
        <MyNavBar />
        <Auth />
        <Home />
        <Main />
      </div>
  );
};

export default App;
