import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCAJL-2bdi1zFyz6e4CO0_h_vzJEAtcmi4",
    authDomain: "parq-chat.firebaseapp.com",
    projectId: "parq-chat",
    storageBucket: "parq-chat.appspot.com",
    messagingSenderId: "278174829832",
    appId: "1:278174829832:web:6321f89e3d88680c55f0bd"
})

const db = firebaseApp.firestore()

const auth = firebase.auth()

export { db, auth }