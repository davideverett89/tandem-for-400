import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const postSessionAnswer = (newSessionAnswer) => axios.post(`${baseUrl}/session_answers.json`, newSessionAnswer);

const exportObject = { postSessionAnswer };

export default exportObject;
