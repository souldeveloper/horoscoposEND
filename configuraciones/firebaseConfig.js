import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyC_BhQrHJHcPdWyrxxj3pKdNpXQf7sCpCA",
    authDomain: "textfirebase-6b17c.firebaseapp.com",
    databaseURL: "https://textfirebase-6b17c.firebaseio.com",
    projectId: "textfirebase-6b17c",
    storageBucket: "textfirebase-6b17c.appspot.com",
    messagingSenderId: "735857302873",
    appId: "1:735857302873:web:0854934acb218a28df4048"
};
// Initialize Firebase
if (firebase.apps.length == 0) {
    firebase.initializeApp(firebaseConfig);
}
//firebase.initializeApp(firebaseConfig);
const aut = firebase.auth()
const googleProvider = new firebase.auth.GoogleAuthProvider()
const db = firebase.firestore()

export { aut, googleProvider, db }
