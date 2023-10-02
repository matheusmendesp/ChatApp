import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBN27rO9VtjtmexDRDZom9OyZXzsqLKERw",
  authDomain: "chatapp-3f092.firebaseapp.com",
  projectId: "chatapp-3f092",
  storageBucket: "chatapp-3f092.appspot.com",
  messagingSenderId: "12014051853",
  appId: "1:12014051853:web:eeb0e94ecb2d04794aab44"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()

export { auth, db };