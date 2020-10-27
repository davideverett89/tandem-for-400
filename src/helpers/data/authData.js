import firebase from 'firebase/app';
import 'firebase/auth';

const getUid = () => firebase.auth().currentUser.uid;

const getEmail = () => firebase.auth().currentUser.email;

const getDisplayName = () => firebase.auth().currentUser.displayName;

const exportObject = {
  getUid,
  getEmail,
  getDisplayName,
};

export default exportObject;
