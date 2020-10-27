import React, { useState, useEffect, useCallback } from 'react';

import sessionData from '../../../helpers/data/sessionData';

import Question from '../../shared/Question/Question';

import './Session.scss';

const Session = ({ match }) => {
  const [counter, setCounter] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [session, setSession] = useState({});
  const [previousQuestions, setPreviousQuestions] = useState([]);

  const getData = useCallback(() => {
    const { sessionId } = match.params;
    sessionData.getSessionById(sessionId)
      .then((response) => {
        if (isMounted) {
          const currentSession = response.data;
          currentSession.id = sessionId;
          setSession(currentSession);
        }
      })
      .catch((err) => console.error('There was an error loading this trivia session:', err));
  }, [isMounted, match.params]);

  const handlePreviousQuestions = (newQuestionId) => {
    const questionList = [...previousQuestions];
    questionList.push(newQuestionId);
    setPreviousQuestions(questionList);
  };

  useEffect(() => {
    setIsMounted(true);
    getData();
    return () => setIsMounted(false);
  }, [getData, isMounted, match.params]);

  return (
    <div className="Session mt-5 mx-auto">
        <h1>Question {counter} </h1>
        <Question
            previousQuestions={previousQuestions}
            handlePreviousQuestions={handlePreviousQuestions}
            counter={counter}
            setCounter={setCounter}
        />
    </div>
  );
};

export default Session;
