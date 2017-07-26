import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import * as firebase from 'firebase';

import Sidebar from './components/Sidebar/Sidebar.jsx';

import Bulletin from './pages/Bulletin.jsx';
import Messaging from './pages/Messaging.jsx';
import TodoShared from './pages/TodoShared.jsx';
import TodoPersonal from './pages/TodoPersonal.jsx';
import Lights from './pages/Lights.jsx';
import Account from './pages/Account.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';


// REDUX
const defaultState = {
    currentUser: null,
}
const sidebar = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN':
            state.currentUser = action.currentUser;
            //console.log(state.currentUser);
            break;
        case 'LOGOUT':
            state.currentUser = null;
            //console.log(state.currentUser);
            break;

        default: break;
    }

    return state;
};
import { createStore } from 'redux';
const store = createStore(sidebar);


// This component just handles the routing between pages.
class App extends Component {

    constructor() {
        super();
        this.handleAutoLogin();
    }

    handleAutoLogin(callback) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.database().ref().child('Users').child(user.uid).once('value', (snap) => {
                    var usr = snap.val();
                
                    store.dispatch({
                        type:'LOGIN',
                        currentUser: usr
                    });
                    //console.log(store.getState().currentUser);
                    
                    if(callback) { callback(); }
                })
            } else {
                return;
            }
        });
    }


    render() {
        const side = new Sidebar();
        const SB = () => { return side }

        const BulletinPage = () => { return <Bulletin sidebar={side} rStore={store}>{SB}</Bulletin> }
        const MessagingPage = () => { return <Messaging sidebar={side} rStore={store}>{SB}</Messaging> }
        const TodoSharedPage = () => { return <TodoShared sidebar={side} rStore={store}>{SB}</TodoShared> }
        const TodoPersonalPage = () => { return <TodoPersonal sidebar={side} rStore={store}>{SB}</TodoPersonal> }
        const LightsPage = () => { return <Lights sidebar={side} rStore={store}>{SB}</Lights> }
        const AccountPage = () => { return <Account sidebar={side} rStore={store}>{SB}</Account> }
        const LoginPage = () => { return <Login sidebar={side} rStore={store}>{SB}</Login> }
        const SignupPage = () => { return <SignUp sidebar={side} rStore={store}>{SB}</SignUp> }

        return (
            <BrowserRouter>
                <div>
                    <Route path="*" component={SB}></Route>
                    <Route path="/" component={BulletinPage}></Route>
                    <Route path="/messaging" component={MessagingPage}></Route>
                    <Route path="/todoshared" component={TodoSharedPage}></Route>
                    <Route path="/todopersonal" component={TodoPersonalPage}></Route>
                    <Route path="/lights" component={LightsPage}></Route>
                    <Route path="/account" component={AccountPage}></Route>
                    <Route path="/login" component={LoginPage}></Route>
                    <Route path="/signup" component={SignupPage}></Route>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
