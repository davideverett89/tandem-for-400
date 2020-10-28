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
        history.push(`/session/${sessionId}`);
      })
      .catch((err) => console.error('There was an issue creating a new session for this player:', err));
  };

  return (
    <div className="Home d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-4 m-5">Welcome to Tandem For 400!</h1>
        <button className="btn start-btn m-5" onClick={handleCreateSession}>Start Trivia!</button>
    </div>
  );
};

export default Home;
