import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getSessionById = (sessionId) => axios.get(`${baseUrl}/sessions/${sessionId}.json`);

const postSession = (newSession) => axios.post(`${baseUrl}/sessions.json`, newSession);

const patchSession = (sessionId, endTime) => axios.patch(`${baseUrl}/sessions/${sessionId}.json`, { end_time: endTime });

const exportObject = { postSession, getSessionById, patchSession };

export default exportObject;
