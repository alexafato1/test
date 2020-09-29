import * as firebase from 'firebase';
import 'firebase/firestore';
import {Permissions, Notifications} from 'expo';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDHd5n6kq9C4qKbyt7kgcd6jeCuJlzsAiw",
  authDomain: "reminder-app-diana.firebaseapp.com",
  databaseURL: "https://reminder-app-diana.firebaseio.com",
  projectId: "reminder-app-diana",
  storageBucket: "reminder-app-diana.appspot.com",
  messagingSenderId: "877353721217",
  appId: "1:877353721217:web:6df016cae38a5546a15c80",
  measurementId: "G-6CLDV5LQG5"
});



const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };