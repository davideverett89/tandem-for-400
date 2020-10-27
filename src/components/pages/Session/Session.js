import React, { useState, useEffect, useCallback } from 'react';

import sessionData from '../../../helpers/data/sessionData';
import smash from '../../../helpers/data/smash';

import './Session.scss';

const Session = ({ match }) => {
  const [counter, setCounter] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [session, setSession] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState({});

  const selectRandomQuestion = useCallback(() => {
    if (isMounted && questions.length > 0) {
      const randomNumber = Math.floor(Math.random() * questions.length);
      const randomQuestion = questions[randomNumber];
      setCurrentQuestion(randomQuestion);
    }
  }, [questions, isMounted]);

  const getData = useCallback(() => {
    const { sessionId } = match.params;
    sessionData.getSessionById(sessionId)
      .then((response) => {
        if (isMounted) {
          const currentSession = response.data;
          setSession(currentSession);
          smash.getAllQuestionsWithOptions()
            .then((allQuestions) => {
              setQuestions(allQuestions);
            });
        }
      })
      .catch((err) => console.error('There was an error loading this trivia session:', err));
  }, [isMounted, match.params]);

  useEffect(() => {
    setIsMounted(true);
    getData();
    return () => setIsMounted(false);
  }, [isMounted, match.params]);

  return (
    <div className="Session">
        <h1>Session {session.id}, Question {counter} </h1>
        <h3>{currentQuestion !== undefined ? currentQuestion.text : ''}</h3>
    </div>
  );
};

export default Session;
