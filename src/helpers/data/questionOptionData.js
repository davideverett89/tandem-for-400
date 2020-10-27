import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getQuestionOptions = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/question_options.json`)
    .then((response) => {
      const questionOptionObject = response.data;
      const questionOptions = [];
      if (questionOptionObject !== null) {
        Object.keys(questionOptionObject).forEach((questionOptionId) => {
          questionOptionObject[questionOptionId].id = questionOptionId;
          questionOptions.push(questionOptionObject[questionOptionId]);
        });
      }
      resolve(questionOptions);
    })
    .catch((err) => reject(err));
});

const getQuestionOptionsByQuestionId = (questionId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/question_options.json?orderBy="question_id"&equalTo="${questionId}"`)
    .then((response) => {
      const questionOptionsObject = response.data;
      const questionOptions = [];
      if (questionOptionsObject !== null) {
        Object.keys(questionOptionsObject).forEach((questionOptionId) => {
          questionOptionsObject[questionOptionId].id = questionOptionId;
          questionOptions.push(questionOptionsObject[questionOptionId]);
        });
      }
      resolve(questionOptions);
    })
    .catch((err) => reject(err));
});

const exportObject = { getQuestionOptionsByQuestionId, getQuestionOptions };

export default exportObject;
