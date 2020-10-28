import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getSessionAnswers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/session_answers.json`)
    .then((response) => {
      const sessionAnswerObject = response.data;
      const sessionAnswers = [];
      if (sessionAnswerObject !== null) {
        Object.keys(sessionAnswerObject).forEach((sessionAnswerId) => {
          sessionAnswerObject[sessionAnswerId].id = sessionAnswerId;
          sessionAnswers.push(sessionAnswerObject[sessionAnswerId]);
        });
      }
      resolve(sessionAnswers);
    })
    .catch((err) => reject(err));
});

const postSessionAnswer = (newSessionAnswer) => axios.post(`${baseUrl}/session_answers.json`, newSessionAnswer);

const exportObject = { getSessionAnswers, postSessionAnswer };

export default exportObject;
