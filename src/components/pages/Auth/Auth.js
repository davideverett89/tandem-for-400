import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import authData from '../../../helpers/data/authData';
import playerData from '../../../helpers/data/playerData';

import './Auth.scss';

const Auth = () => {
  const handleCreatePlayer = () => {
    const newPlayer = {
      display_name: authData.getDisplayName(),
      email: authData.getEmail(),
      uid: authData.getUid(),
    };
    playerData.postPlayer(newPlayer)
      .then()
      .catch((err) => console.error('There was an issue with registering a new player at login:', err));
  };

  const playerCheck = () => {
    playerData.getPlayerByEmail(authData.getEmail())
      .then((response) => {
        if (response.length === 0) {
          handleCreatePlayer();
        }
      })
      .catch((err) => console.error('There was an issue checking for a player at login:', err));
  };

  const loginEvent = (e) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(() => {
        playerCheck();
      })
      .catch((err) => console.error('There was an issue with logging in:', err));
  };

  return (
    <div className="Auth d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-4 m-5">Welcome to Tandem For 400!</h1>
        <button className="btn auth-btn m-5" onClick={loginEvent}>Login</button>
    </div>
  );
};

export default Auth;
