import React, { Component } from 'react';

class Account extends Component {
    
    /********************
     *  INITIALIZATION  *
     ********************/


     componentDidMount() {
         const store = this.props.rStore.getState();

         // Auto-Login
         if(window.localStorage.getItem('currentUser') !== null) {
            this.props.rStore.dispatch({
                type: 'LOGIN',
                currentUser: JSON.parse(window.localStorage.getItem('currentUser'))
            })
         }

         // Upon getting to this page, if the user is not already logged in, go to the login page instead.
         if(store.currentUser == null) {
             this.props.sidebar.navigateTo('login');
         }
     }



     /********************
     *      STYLES       *
     ********************/

     contentAreaStyles() {
         return {
             position:'relative',
             left:'25%',
             top:'0px',
             width:'75%',
             height:'100%',
             backgroundColor:'red'
         }
     }


    /********************
     *      RENDER      *
     ********************/

    render() {
        return (
            <div style={this.contentAreaStyles()}>
                <button onClick={this.handleLogout.bind(this)}>Logout</button>
            </div>
        );
    }


    /********************
     *      BUTTONS      *
     ********************/

    handleLogout() {
        this.props.rStore.dispatch({
            type:'LOGOUT'
        })
        window.localStorage.removeItem('currentUser');
    }
}

export default Account;
