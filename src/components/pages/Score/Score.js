import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';

import smash from '../../../helpers/data/smash';
import authData from '../../../helpers/data/authData';
import sessionData from '../../../helpers/data/sessionData';

import './Score.scss';

const Score = ({ match, history }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [endedSession, setEndedSession] = useState({});
  const [player, setPlayer] = useState({});
  const [sessionAnswers, setSessionAnswers] = useState([]);

  const getData = useCallback(() => {
    const { sessionId } = match.params;
    smash.getCompletedSessionWithAnswersBySessionId(sessionId)
      .then((completedSession) => {
        if (isMounted) {
          setEndedSession(completedSession);
          setPlayer(completedSession.player);
          setSessionAnswers(completedSession.answers);
        }
      })
      .catch((err) => console.error('There was an issue getting this completed session with answers:', err));
  }, [isMounted, match.params]);

  const calculateElapsedTime = () => {
    const startTime = endedSession.start_time;
    const endTime = endedSession.end_time;
    const elapsedTimeInMilliseconds = moment(endTime).diff(moment(startTime));
    return elapsedTimeInMilliseconds;
  };

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

  const handleCreateSession = (e) => {
    e.preventDefault();
    const newSession = {
      player_uid: authData.getUid(),
      start_time: moment().format(),
      end_time: '',
    };
    if (isMounted) {
      sessionData.postSession(newSession)
        .then((response) => {
          const sessionId = response.data.name;
          history.replace(`/session/${sessionId}`);
        })
        .catch((err) => console.error('There was an issue creating a new session for this player:', err));
    }
  };

  useEffect(() => {
    setIsMounted(true);
    getData();
    return () => setIsMounted(false);
  }, [isMounted, getData]);

  return (
    <div className="Score d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-4 mb-5">Session has ended!</h1>
        <ul className="list-group">
            <li className="list-group-item">Player Name: {player.display_name}</li>
            <li className="list-group-item">Email: {player.email}</li>
            <li className="list-group-item">
                Time elapsed:
                {
                    calculateElapsedTime() > 60000
                      ? ` ${moment.duration(calculateElapsedTime()).as('minutes').toFixed(2)} minutes.`
                      : ` ${moment.duration(calculateElapsedTime()).as('seconds').toFixed(2)} seconds.`
                }
            </li>
            <li className="list-group-item">Percentage Correct: {calculateScorePercentage()}%</li>
        </ul>
        <button className="btn restart-btn m-5" onClick={handleCreateSession}>Play Again!</button>
    </div>
  );
};

export default Score;
