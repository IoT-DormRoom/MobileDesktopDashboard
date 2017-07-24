import React from 'react';
import ReactDOM from 'react-dom';

// FIREBASE
import * as firebase from 'firebase';
var config = {
    apiKey: "AIzaSyDK7Vc9FQHA8en946cabzxues36IpYeyYk",
    authDomain: "iot-dormroom-9558c.firebaseapp.com",
    databaseURL: "https://iot-dormroom-9558c.firebaseio.com",
    projectId: "iot-dormroom-9558c",
    storageBucket: "iot-dormroom-9558c.appspot.com",
    messagingSenderId: "105656743007"
  };
  firebase.initializeApp(config);

import App from './App';



ReactDOM.render( <App />,document.getElementById('root') );
