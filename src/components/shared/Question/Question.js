import React, {
  useState,
  useEffect,
} from 'react';

import OptionRadio from '../OptionRadio/OptionRadio';

import smash from '../../../helpers/data/smash';

import './Question.scss';

const Question = ({
  session,
  previousQuestionIds,
  handlePreviousQuestions,
  handleSessionAnswers,
  counter,
  setCounter,
  endSession,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [selectedOptionId, setSelectedOptionId] = useState('');
  const [revealAnswer, setRevealAnswer] = useState(false);

  const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));

  const handleCreateSessionAnswers = () => {
    const newSessionAnswer = {
      session_id: session.id,
      question_id: currentQuestion.id,
      question_option_id: selectedOptionId,
    };
    handleSessionAnswers(newSessionAnswer);
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    setRevealAnswer(true);
    delay(1500).then(() => {
      if (counter > 10) {
        handleCreateSessionAnswers();
        endSession();
      } else {
        handlePreviousQuestions(currentQuestion.id);
        handleCreateSessionAnswers();
        setCounter(counter + 1);
      }
    });
  };

  useEffect(() => {
    setIsMounted(true);
    const selectRandomQuestion = () => {
      smash.getRandomQuestionWithOptions()
        .then((question) => {
          if (isMounted) {
            const checkForRepeat = previousQuestionIds.indexOf(question.id);
            if (checkForRepeat === -1) {
              setSelectedOptionId('');
              setRevealAnswer(false);
              setCurrentQuestion(question);
            } else {
              selectRandomQuestion();
            }
          }
        });
    };
    selectRandomQuestion();
    return () => setIsMounted(false);
  }, [counter, isMounted, previousQuestionIds]);

  return (
    <div className="Question mt-5 col-6 mx-auto">
      <h1>Question {counter <= 10 ? counter : '10'} </h1>
          <h3>{currentQuestion.id ? currentQuestion.text : ''}</h3>
          <form className="my-5 mx-auto">
              {
                  currentQuestion.id
                    ? currentQuestion.options.map((option) => (
                      <OptionRadio
                        key={option.id}
                        option={option}
                        selectedOptionId={selectedOptionId}
                        setSelectedOptionId={setSelectedOptionId}
                        revealAnswer={revealAnswer}
                      />
                    ))
                    : ''
              }
          </form>
        <button
          className="btn answer-btn m-3"
          onClick={handleSubmitAnswer}
          disabled={selectedOptionId === ''}
        >
          Submit Answer
        </button>
    </div>
  );
};

export default Question;
