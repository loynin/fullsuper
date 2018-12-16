import * as firebase from 'firebase';

// const config = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
// };

// firebase.initializeApp(config);

// const database = firebase.database();
// const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// export { firebase, googleAuthProvider, database as default };


var config = {
  apiKey: "AIzaSyA4_90T7W5iz2G9Wbj7WQlK2VQbo2wgKVM",
  authDomain: "getthingdone100.firebaseapp.com",
  databaseURL: "https://getthingdone100.firebaseio.com",
  projectId: "getthingdone100",
  storageBucket: "getthingdone100.appspot.com",
  messagingSenderId: "280452834057"
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default};