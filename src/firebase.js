import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyD1Emzu3OSkAh5fXPt9bpIb-4QQQ9ftpNk",
  authDomain: "todoproject-8cdb3.firebaseapp.com",
  projectId: "todoproject-8cdb3",
  storageBucket: "todoproject-8cdb3.firebasestorage.app",
  messagingSenderId: "730659504336",
  appId: "1:730659504336:web:2f54bfe9a198c4d212ded5",
  databaseURL: "https://todoproject-8cdb3-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)