import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getQuestions = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/questions.json`)
    .then((response) => {
      const questionObject = response.data;
      const questions = [];
      if (questionObject !== null) {
        Object.keys(questionObject).forEach((questionId) => {
          questionObject[questionId].id = questionId;
          questions.push(questionObject[questionId]);
        });
      }
      resolve(questions);
    })
    .catch((err) => reject(err));
});

const exportObject = { getQuestions };

export default exportObject;
