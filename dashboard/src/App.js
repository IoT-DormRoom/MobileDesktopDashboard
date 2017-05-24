import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Sidebar from './components/Sidebar/Sidebar.jsx';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';

// This component just handles the routing between pages.
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Sidebar></Sidebar>

                    <Route exact path="/" component={Home}></Route>
                    <Route path="/about" component={About}></Route>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
