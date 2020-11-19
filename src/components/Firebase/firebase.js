import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAJngE6b-uhhnPR6UV1YnnBrwKldqKlrE8",
    authDomain: "csc322-group-p.firebaseapp.com",
    databaseURL: "https://csc322-group-p.firebaseio.com",
    projectId: "csc322-group-p",
    storageBucket: "csc322-group-p.appspot.com",
    messagingSenderId: "784129974552",
    appId: "1:784129974552:web:1a4c41f03663cf58e4be6d",
    measurementId: "G-32H9T882JH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore();

  export default firebase;