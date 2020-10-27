import questionData from './questionData';
import questionOptionData from './questionOptionData';

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

const exportObject = { getRandomQuestionWithOptions };

export default exportObject;
