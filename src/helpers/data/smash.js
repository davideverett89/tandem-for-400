import questionData from './questionData';
import questionOptionData from './questionOptionData';
import sessionData from './sessionData';
import sessionAnswerData from './sessionAnswerData';

const shuffle = (a) => {
  const arr = [...a];
  // eslint-disable-next-line no-plusplus
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const getRandomQuestionWithOptions = () => new Promise((resolve, reject) => {
  questionData.getQuestions().then((questions) => {
    questionOptionData.getQuestionOptions().then((questionOptions) => {
      const finalQuestions = [];
      questions.forEach((question) => {
        const singleQuestion = { ...question, options: [] };
        questionOptions.forEach((questionOption) => {
          if (questionOption.question_id === singleQuestion.id) {
            singleQuestion.options.push(questionOption);
          }
        });
        const shuffledOptions = shuffle(singleQuestion.options);
        singleQuestion.options = shuffledOptions;
        finalQuestions.push(singleQuestion);
      });
      const randomNumber = Math.floor(Math.random() * finalQuestions.length);
      const randomQuestion = finalQuestions[randomNumber];
      resolve(randomQuestion);
    });
  })
    .catch((err) => reject(err));
});

const getCompletedSessionWithAnswersBySessionId = (sessionId) => new Promise((resolve, reject) => {
  sessionData.getSessionById(sessionId).then((response) => {
    const completedSession = response.data;
    completedSession.id = sessionId;
    completedSession.answers = [];
    sessionAnswerData.getSessionAnswers().then((sessionAnswers) => {
      questionOptionData.getQuestionOptions().then((questionOptions) => {
        sessionAnswers.forEach((sessionAnswer) => {
          const newSessionAnswer = { ...sessionAnswer, correctAnswer: false };
          if (newSessionAnswer.session_id === sessionId) {
            const selectedOption = questionOptions.find((x) => x.id === newSessionAnswer.question_option_id);
            if (selectedOption.is_correct) {
              newSessionAnswer.correctAnswer = true;
              completedSession.answers.push(newSessionAnswer);
            } else {
              completedSession.answers.push(newSessionAnswer);
            }
          }
        });
        resolve(completedSession);
      });
    });
  })
    .catch((err) => reject(err));
});

const exportObject = { getRandomQuestionWithOptions, getCompletedSessionWithAnswersBySessionId };

export default exportObject;
