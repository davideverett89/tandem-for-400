/* eslint-disable max-len */
import React from 'react';
import moment from 'moment';

import sessionData from '../../../helpers/data/sessionData';
import authData from '../../../helpers/data/authData';

import './Home.scss';

const Home = ({ history }) => {
  const handleCreateSession = (e) => {
    const newSession = {
      player_uid: authData.getUid(),
      start_time: moment().format('MMMM Do YYYY, h:mm:ss a'),
      end_time: '',
    };
    sessionData.postSession(newSession)
      .then((response) => {
        const sessionId = response.data.name;
        history.push(`session/${sessionId}`);
      })
      .catch((err) => console.error('There was an issue creating a new session for this player:', err));
  };

  return (
    <div className="Home">
        <h1 className="display-4">Welcome to Tandem For 400!</h1>
        <p className="lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <button className="btn start-btn" onClick={handleCreateSession}>Start</button>
    </div>
  );
};

export default Home;
