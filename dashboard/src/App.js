import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Sidebar from './components/Sidebar/Sidebar.jsx';

import Home from './pages/Home.jsx';
import Bulletin from './pages/Bulletin.jsx';
import Messaging from './pages/Messaging.jsx';
import TodoShared from './pages/TodoShared.jsx';
import TodoPersonal from './pages/TodoPersonal.jsx';
import Lights from './pages/Lights.jsx';
import Account from './pages/Account.jsx';
import Login from './pages/Login.jsx';


// REDUX
const defaultState = {
    
}
const sidebar = (state = defaultState, action) => {
    switch (action.type) {
        default: break;
    }

    return state;
};
import { createStore } from 'redux';
const store = createStore(sidebar);


// This component just handles the routing between pages.
class App extends Component {
    render() {
        const SB = new Sidebar();
        const SidebarComponent = () => { return SB }
        const HomePage = () => { return <Home sidebar={SB} rStore={store}></Home> }
        const BulletinPage = () => { return <Bulletin sidebar={SB} rStore={store}></Bulletin> }
        const MessagingPage = () => { return <Messaging sidebar={SB} rStore={store}></Messaging> }
        const TodoSharedPage = () => { return <TodoShared sidebar={SB} rStore={store}></TodoShared> }
        const TodoPersonalPage = () => { return <TodoPersonal sidebar={SB} rStore={store}></TodoPersonal> }
        const LightsPage = () => { return <Lights sidebar={SB} rStore={store}></Lights> }
        const AccountPage = () => { return <Account sidebar={SB} rStore={store}></Account> }
        const LoginPage = () => { return <Login sidebar={SB} rStore={store}></Login> }

        return (
            <BrowserRouter>
                <div>
                    <Route path="*" component={SidebarComponent}></Route>
                    <Route exact path="/" component={HomePage}></Route>
                    <Route path="/bulletin" component={BulletinPage}></Route>
                    <Route path="/messaging" component={MessagingPage}></Route>
                    <Route path="/todoshared" component={TodoSharedPage}></Route>
                    <Route path="/todopersonal" component={TodoPersonalPage}></Route>
                    <Route path="/lights" component={LightsPage}></Route>
                    <Route path="/account" component={AccountPage}></Route>
                    <Route path="/login" component={LoginPage}></Route>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
