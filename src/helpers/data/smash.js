import questionData from './questionData';
import questionOptionData from './questionOptionData';

const getAllQuestionsWithOptions = () => new Promise((resolve, reject) => {
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
        finalQuestions.push(singleQuestion);
      });
      resolve(finalQuestions);
    });
  })
    .catch((err) => reject(err));
});

const exportObject = { getAllQuestionsWithOptions };

export default exportObject;
