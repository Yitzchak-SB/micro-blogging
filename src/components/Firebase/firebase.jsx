import firebase from "firebase";

const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  user = (userId) => this.database.ref(`users/${userId}`);

  users = () => this.database.ref("users");

  tweet = (tweetId) => this.database.ref(`tweets/${tweetId}`);

  tweets = () => this.database.ref("tweets");

  profile = (fileName, userId) =>
    this.storage.ref(`profiles/${userId}/${fileName}`);

  googleProvider = () => new firebase.auth.GoogleAuthProvider();
}

export default Firebase;
