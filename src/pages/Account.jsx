import React from 'react';
import Alertify from 'alertify.js';
import * as firebase from 'firebase';

import Page from '../components/General/Page.jsx';
import RoundInput from '../components/General/RoundInput.jsx';
import RoundRectButton from '../components/Buttons/RoundRectButton';

class Account extends Page {
    
    /********************
    *  INITIALIZATION  *
    ********************/

    constructor() {
        super();

        this.state = {
            emailPlaceholder: ''
        }
    }

    componentDidMount() {
        const store = this.props.rStore.getState();

        // Auto-Login
        if(window.localStorage.getItem('currentUser') !== null && window.localStorage.getItem('currentUser') !== undefined) {
            this.props.rStore.dispatch({
                type: 'LOGIN',
                currentUser: JSON.parse(window.localStorage.getItem('currentUser'))
            })

            this.setState({ 
                emailPlaceholder: store.currentUser.email
            });
        }

        // Upon getting to this page, if the user is not already logged in, go to the login page instead.
        if(store.currentUser === null) {
            this.props.sidebar.navigateTo('login');
        }
    }



    /********************
    *      STYLES       *
    ********************/

    contentAreaStyles() {
        return {
            position:'absolute',
            top:'0px',
            left:'0px',
            width:'100%',
            height:'100%',
            textAlign:'center',
            backgroundColor:'rgb(90, 201, 173)'
        }
    }
    getButtonStyles() {
        return {
            position:'absolute',
            top:'10px',
            right:'10px'
        }
    }
    getInputTitleStyles() {
        return {
            color:'black',
            opacity:'0.4',
            fontFamily:'Marmelad'
        }
    }


    /********************
    *      RENDER      *
    ********************/

    render() {
        return (
            <div style={this.contentAreaStyles()} onMouseDown={()=>{ super.userDidClickPage(); }}>
                {/* Title label */}
                <h1 style={super.getTitleStyles()}>Account</h1>


                {/* Logout button */}
                <RoundRectButton color='white'
                                 normalColor='rgb(51, 155, 127)'
                                 hoverColor='rgb(29, 135, 107)'
                                 style={this.getButtonStyles()}
                                 click={this.handleLogout.bind(this)}>
                    Logout
                </RoundRectButton>
                <br/>

                {/* The form */}
                <h4 style={this.getInputTitleStyles()}>Update Email: </h4>
                <RoundInput ref={(RoundInput)=>{this.emailField = RoundInput}} type='text' placeholder={this.state.emailPlaceholder || 'Enter new email'}/>

                <h4 style={this.getInputTitleStyles()}>Update Password: </h4>
                <RoundInput ref={(RoundInput)=>{this.passwordField = RoundInput}} type='text' placeholder='New Password'/>

                <h4 style={this.getInputTitleStyles()}>Re-enter new password: </h4>
                <RoundInput ref={(RoundInput)=>{this.confirmPasswordField = RoundInput}} type='text' placeholder='Re-enter New Password'/>

                <br/><br/><br/>

                {/* Logout button */}
                <RoundRectButton width='150px' height='50px' color='white'
                                 normalColor='rgb(51, 155, 127)'
                                 hoverColor='rgb(29, 135, 107)'
                                 click={this.handleSaveChanges.bind(this)}>
                    Save Changes
                </RoundRectButton>




                {this.props.children}
            </div>
        );
    }


    /********************
    *      BUTTONS      *
    *********************/

    /** Handles logging out. */
    handleLogout() {
        this.props.rStore.dispatch({
            type:'LOGOUT'
        })
        window.localStorage.removeItem('currentUser');
        this.props.sidebar.navigateTo('login');
    }



    /** Handles saving the changes to a user's profile. */
    handleSaveChanges() {
        const store = this.props.rStore.getState();

        var email = this.emailField.getText();
        var password = this.passwordField.getText();
        var confirmPass = this.confirmPasswordField.getText();

        if(this.valueExists(email)) {
            // Update email
            firebase.auth().currentUser.updateEmail(email).then( () => {
                // Update the local user object.
                let usr = store.currentUser;
                usr.email = email;
                window.localStorage.setItem('currentUser', JSON.stringify(usr));

                Alertify.success('Updated email!');
                return;
            }).catch( (err) => {
                Alertify.error(err.message);
                return;
            });
        }

        if(this.valueExists(password) && this.valueExists(confirmPass)) {
            if(password === confirmPass) {
                // Update password
                firebase.auth().currentUser.updatePassword(password).then( () => {
                    Alertify.success('Updated password!');
                    return;
                }).catch( (err) => {
                    Alertify.error(err.message);
                    return;
                });
            } else {
                Alertify.error('Passwords do not match.');
                return;
            }
        }
    }




    /********************
     *      UTILITY      *
     ********************/

    valueExists(element) {
        if(element !== '' && element !== null && element !== undefined) {
            return true;
        }
        return false;
    }


}

export default Account;
