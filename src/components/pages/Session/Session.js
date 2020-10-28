import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';

import sessionData from '../../../helpers/data/sessionData';
import sessionAnswerData from '../../../helpers/data/sessionAnswerData';

import Question from '../../shared/Question/Question';

import './Session.scss';

const Session = ({ match, history }) => {
  const [counter, setCounter] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [session, setSession] = useState({});
  const [previousQuestions, setPreviousQuestions] = useState([]);
  const [sessionAnswers, setSessionAnswers] = useState([]);

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

  const handleSessionAnswers = (newSessionAnswer) => {
    const sessionAnswerList = [...sessionAnswers];
    sessionAnswerList.push(newSessionAnswer);
    setSessionAnswers(sessionAnswerList);
  };

  const saveSessionAnswers = (finalSessionAnswers) => {
    finalSessionAnswers.forEach((singleSessionAnswer) => {
      sessionAnswerData.postSessionAnswer(singleSessionAnswer);
    });
  };

  const handlePatchSession = useCallback(() => {
    const { sessionId } = match.params;
    const endTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    sessionData.patchSession(sessionId, endTime)
      .then(() => {
        history.replace(`/score/${sessionId}`);
      })
      .catch((err) => console.error('There was an error logging session end_time:', err));
  }, [history, match.params]);

  const endSession = useCallback(() => {
    saveSessionAnswers(sessionAnswers);
    handlePatchSession();
  }, [handlePatchSession, sessionAnswers]);

  useEffect(() => {
    setIsMounted(true);
    if (counter > 10) {
      endSession();
    } else {
      getData();
    }
    return () => setIsMounted(false);
  }, [getData, isMounted, match.params, counter, endSession]);

  return (
    <div className="Session mt-5 mx-auto d-flex flex-column justify-content-center align-items-center">
        <h1>Question {counter} </h1>
        <Question
          session={session}
          endSession={endSession}
          previousQuestions={previousQuestions}
          handlePreviousQuestions={handlePreviousQuestions}
          handleSessionAnswers={handleSessionAnswers}
          counter={counter}
          setCounter={setCounter}
        />
    </div>
  );
};

export default Session;
