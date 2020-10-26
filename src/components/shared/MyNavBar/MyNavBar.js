import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import './MyNavBar.scss';

const MyNavBar = () => {
  const logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  };

  return (
      <div className="MyNavBar">
            <h1>Navbar</h1>
            <button className="btn btn-warning logout-btn" onClick={logMeOut}>Logout</button>
      </div>
  );
};

export default MyNavBar;
