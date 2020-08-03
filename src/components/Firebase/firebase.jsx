import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBdjPNzIsKAYFiXXl42iK8vMC772XdCJ9s",
  authDomain: "micro-blogging-project-7c05d.firebaseapp.com",
  databaseURL: "https://micro-blogging-project-7c05d.firebaseio.com",
  projectId: "micro-blogging-project-7c05d",
  storageBucket: "micro-blogging-project-7c05d.appspot.com",
  messagingSenderId: "174201994223",
  appId: "1:174201994223:web:4c11fdcf4fa8f11012541a",
  measurementId: "G-RBSZKWZ78V",
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
