import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAg1m_fcpcgbQ2WtNUWH5ciQngSMS43jNw",
    authDomain: "newton-webshop.firebaseapp.com",
    projectId: "newton-webshop",
    storageBucket: "newton-webshop.appspot.com",
    messagingSenderId: "979700648685",
    appId: "1:979700648685:web:c0696b86b6e3b9b5159ae4",
    measurementId: "G-XQTYCYF0JQ"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};