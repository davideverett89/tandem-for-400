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
  const [previousQuestionIds, setPreviousQuestionIds] = useState([]);
  const [sessionAnswers, setSessionAnswers] = useState([]);

  const handlePreviousQuestions = (newQuestionId) => {
    const questionIdList = [...previousQuestionIds];
    questionIdList.push(newQuestionId);
    setPreviousQuestionIds(questionIdList);
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
    const endTime = moment().format();
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
      const getData = () => {
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
      };
      getData();
    }
    return () => setIsMounted(false);
  }, [isMounted, match.params, counter, endSession]);

  return (
    <div className="Session mt-5 mx-auto d-flex flex-column justify-content-center align-items-center">
        <Question
          session={session}
          endSession={endSession}
          previousQuestionIds={previousQuestionIds}
          handlePreviousQuestions={handlePreviousQuestions}
          handleSessionAnswers={handleSessionAnswers}
          counter={counter}
          setCounter={setCounter}
        />
    </div>
  );
};

export default Session;
