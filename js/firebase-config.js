export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDSS7uM_3ohyNbpCUPElcAqGHHiaTehIbc",
  authDomain: "geography-quiz-861fa.firebaseapp.com",
  databaseURL: "https://geography-quiz-861fa-default-rtdb.firebaseio.com",
  projectId: "geography-quiz-861fa",
  storageBucket: "geography-quiz-861fa.firebasestorage.app",
  messagingSenderId: "481451699372",
  appId: "1:481451699372:web:aaea77b2f1280031cb8309"
};

firebase.initializeApp(FIREBASE_CONFIG);
export const db = firebase.database();
