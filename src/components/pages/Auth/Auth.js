import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import authData from '../../../helpers/data/authData';
import playerData from '../../../helpers/data/playerData';

import './Auth.scss';

const Auth = () => {
  const savePlayer = () => {
    const newPlayer = {
      display_name: authData.getDisplayName(),
      email: authData.getEmail(),
      uid: authData.getUid(),
    };
    playerData.postPlayer(newPlayer)
      .then((response) => {
        const playerId = response.data.name;
        console.log(playerId);
      })
      .catch((err) => console.error('There was an issue with registering a new player at login:', err));
  };

  const playerCheck = () => {
    playerData.getPlayerByEmail(authData.getEmail())
      .then((response) => {
        if (response.length === 0) {
          savePlayer();
        } else {
          console.log('This player exists already.');
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
    <div className="Auth">
        <h1 className="display-4">Welcome to Tandem For 400!</h1>
        <button className="btn auth-btn" onClick={loginEvent}>Login</button>
    </div>
  );
};

export default Auth;
