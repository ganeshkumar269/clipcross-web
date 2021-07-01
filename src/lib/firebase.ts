import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyBneKlUlgj9HvwCZ-5B8aw2KcowtacVB6U",
    authDomain: "clipboard-api.firebaseapp.com",
    databaseURL: "https://clipboard-api-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "clipboard-api",
    storageBucket: "clipboard-api.appspot.com",
    messagingSenderId: "17614232618",
    appId: "1:17614232618:web:f77bcea8cdda0c68e2f753",
    measurementId: "G-R3R98Y2X98"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

}else {
   firebase.app(); // if already initialized, use that one
}
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();