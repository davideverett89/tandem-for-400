import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import './MyNavBar.scss';

const MyNavBar = ({ authed }) => {
  const logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  };

  return (
      <div className="MyNavBar">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="/home">Tandem For 400</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            {
              authed
                ? (
                  <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                      <button className="btn logout-btn" onClick={logMeOut}>Logout</button>
                    </li>
                  </ul>
                )
                : (
                  ''
                )
            }
          </div>
        </nav>
      </div>
  );
};

export default MyNavBar;
