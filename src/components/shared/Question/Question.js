import React, { useState, useEffect, useCallback } from 'react';

import OptionRadio from '../OptionRadio/OptionRadio';

import smash from '../../../helpers/data/smash';

import './Question.scss';

const Question = ({
  session,
  previousQuestions,
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

  const selectRandomQuestion = useCallback(() => {
    smash.getRandomQuestionWithOptions()
      .then((question) => {
        if (isMounted) {
          setCurrentQuestion({});
          const checkRepeat = previousQuestions.indexOf(question.id);
          console.log(checkRepeat);
          if (checkRepeat !== -1) {
            selectRandomQuestion();
          } else {
            setSelectedOptionId('');
            setRevealAnswer(false);
            setCurrentQuestion(question);
          }
          // if (previousQuestions.length > 0) {
          //   previousQuestions.forEach((questionId) => {
          //     if (questionId === question.id) {
          //       selectRandomQuestion();
          //     }
          //   });
          //   setSelectedOptionId('');
          //   setRevealAnswer(false);
          //   setCurrentQuestion(question);
          // } else {
          //   setSelectedOptionId('');
          //   setRevealAnswer(false);
          //   setCurrentQuestion(question);
          // }
        }
      });
  }, [isMounted, previousQuestions]);

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
      if (counter === 10) {
        handleCreateSessionAnswers();
        endSession();
      } else {
        handlePreviousQuestions(currentQuestion.id);
        handleCreateSessionAnswers();
        selectRandomQuestion();
        setCounter(counter + 1);
      }
    });
  };

  useEffect(() => {
    setIsMounted(true);
    selectRandomQuestion();
    return () => setIsMounted(false);
  }, [selectRandomQuestion]);

  return (
    <div className="Question mt-5 col-6 mx-auto">
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
