I tried to test https://www.creative-tim.com material designs with Firebase

It is an open House App, in this app you can register, login and create a house page with images.

You could find;

Vue, firebase login/auth, register/auth Vue, firebase storage upload multiple images, Vue, firebase creating a page with uniq qr code

You could try app at https://openhouse-7ef82.web.app

If you want to use the code you must create your own firebase credentials file;

Example;

import firebase from "firebase/app"; import "firebase/firestore";

// Your web app's Firebase configuration

var firebaseConfig = { apiKey: "Your-Api-Key", authDomain: "Your-Domain", databaseURL: "Your-Database", projectId: "Your-Project-Id", storageBucket: "Your-Storage", messagingSenderId: "Your-Sender-Id", appId: "Your-AppId", }; // Initialize Firebase firebase.initializeApp(firebaseConfig); firebase.functions().useFunctionsEmulator("http://localhost:4000");

const db = firebase.firestore();

export default db;
