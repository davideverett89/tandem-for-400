import React, { useState, useEffect, useCallback } from 'react';
// import moment from 'moment';

import smash from '../../../helpers/data/smash';

import './Score.scss';

const Score = ({ match }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [endedSession, setEndedSession] = useState('');
  const [sessionAnswers, setSessionAnswers] = useState([]);

  const getData = useCallback(() => {
    const { sessionId } = match.params;
    smash.getCompletedSessionWithAnswersBySessionId(sessionId)
      .then((completedSession) => {
        if (isMounted) {
          setEndedSession(completedSession);
          setSessionAnswers(completedSession.answers);
        }
      })
      .catch((err) => console.error('There was an issue getting this completed session with answers:', err));
  }, [isMounted, match.params]);

  const calculateScorePercentage = () => {
    let numRight = 0;
    sessionAnswers.forEach((answer) => {
      if (answer.correctAnswer) {
        numRight += 1;
      }
    });
    const percentage = numRight / 10 * 100;
    return percentage;
  };

  useEffect(() => {
    setIsMounted(true);
    getData();
    return () => setIsMounted(false);
  }, [isMounted, getData]);

  return (
    <div className="Score d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-4 m-5">Session has ended!</h1>
        <ul className="list-group">
            <li className="list-group-item">Start Time: {endedSession.start_time}</li>
            <li className="list-group-item">End Time: {endedSession.end_time}</li>
            <li className="list-group-item">Percentage: {calculateScorePercentage()}%</li>
        </ul>
    </div>
  );
};

export default Score;
