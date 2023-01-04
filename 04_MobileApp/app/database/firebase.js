import * as firebase from 'firebase';
import '@firebase/auth';

var firebaseConfig = {
  <<Firebase Config>>
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;