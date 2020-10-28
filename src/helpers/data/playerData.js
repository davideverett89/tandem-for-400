import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPlayerByEmail = (email) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/players.json?orderBy="email"&equalTo="${email}"`)
    .then((response) => {
      const playerObject = response.data;
      const player = [];
      if (playerObject !== null) {
        Object.keys(playerObject).forEach((playerId) => {
          playerObject[playerId].id = playerId;
          player.push(playerObject[playerId]);
        });
      }
      resolve(player);
    })
    .catch((err) => reject(err));
});

const getPlayers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/players.json`)
    .then((response) => {
      const playersObject = response.data;
      const players = [];
      if (playersObject !== null) {
        Object.keys(playersObject).forEach((playerId) => {
          playersObject[playerId].id = playerId;
          players.push(playersObject[playerId]);
        });
      }
      resolve(players);
    })
    .catch((err) => reject(err));
});

const postPlayer = (newPlayer) => axios.post(`${baseUrl}/players.json`, newPlayer);

const exportObject = { getPlayerByEmail, postPlayer, getPlayers };

export default exportObject;
