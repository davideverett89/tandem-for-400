import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import './Auth.scss';

const Auth = () => {
  const loginEvent = (e) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  return (
    <div className="Auth">
        <h1 className="display-4">Welcome to Tandem For 400!</h1>
        <button className="btn auth-btn" onClick={loginEvent}>Login</button>
    </div>
  );
};

export default Auth;
