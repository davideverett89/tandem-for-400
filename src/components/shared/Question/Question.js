import React, { useState, useEffect, useCallback } from 'react';

import OptionRadio from '../OptionRadio/OptionRadio';

import smash from '../../../helpers/data/smash';

import './Question.scss';

const Question = ({
  previousQuestions,
  handlePreviousQuestions,
  counter,
  setCounter,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [selectedOptionId, setSelectedOptionId] = useState('');
  const [revealAnswer, setRevealAnswer] = useState(false);

  const selectRandomQuestion = useCallback(() => {
    smash.getRandomQuestionWithOptions()
      .then((question) => {
        if (isMounted) {
          setCurrentQuestion(question);
        }
      });
  }, [isMounted]);

  const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    setRevealAnswer(true);
    delay(3000).then(() => {
      setRevealAnswer(false);
      handlePreviousQuestions(currentQuestion.id);
      selectRandomQuestion();
      setSelectedOptionId('');
      setCounter(counter + 1);
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
                    <OptionRadio key={option.id} option={option} selectedOptionId={selectedOptionId} setSelectedOptionId={setSelectedOptionId} revealAnswer={revealAnswer}/>
                  ))
                  : ''
            }
        </form>
        <button className="btn answer-btn m-3" onClick={handleSubmitAnswer} disabled={selectedOptionId === ''}>Submit Answer</button>
    </div>
  );
};

export default Question;
