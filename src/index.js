import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// FIREBASE
import * as firebase from 'firebase';
var config = {
    apiKey: "AIzaSyDK7Vc9FQHA8en946cabzxues36IpYeyYk",
    authDomain: "iot-dormroom-9558c.firebaseapp.com",
    databaseURL: "https://iot-dormroom-9558c.firebaseio.com",
    projectId: "iot-dormroom-9558c",
    storageBucket: "iot-dormroom-9558c.appspot.com"
};
firebase.initializeApp(config);
// var admin = require("firebase-admin");
// var serviceAccount = require("../public/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://iot-dormroom-9558c.firebaseio.com"
// });

ReactDOM.render( <App />,document.getElementById('root') );
