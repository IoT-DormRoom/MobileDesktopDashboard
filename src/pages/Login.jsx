import React from 'react';
import * as firebase from 'firebase';

import Page from '../components/General/Page.jsx';
import RoundInput from '../components/General/RoundInput.jsx';
import RoundRectButton from '../components/Buttons/RoundRectButton.jsx';

class Login extends Page {
    
    /********************
    *  INITIALIZATION  *
    ********************/


    /********************
    *      STYLES       *
    ********************/

    getPageStyles() {
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
    getTitleStyle() {
        return {
            color:'rgb(51, 155, 127)',
            fontSize:'50px',
            textAlign:'center',
            fontFamily:'Marmelad',
            paddingBottom:'20px'
        }
    }




    /*******************
    *      RENDER      *
    ********************/

    render() {
        return (
            <div style={this.getPageStyles()} onMouseDown={()=>{ super.userDidClickPage(); }}>
                <h1 style={this.getTitleStyle()}>Login</h1>

                <div>
                    <RoundInput ref={(RoundInput)=>{this.emailField = RoundInput}} type='email' placeholder='Enter your email'/>
                    <br/><br/>
                    <RoundInput ref={(RoundInput)=>{this.passwordField = RoundInput}} type='password' placeholder='Enter your password'/>
                    <br/><br/><br/><br/>


                    <RoundRectButton normalColor='rgb(51, 155, 127)'
                                     hoverColor='rgb(29, 135, 107)'
                                     click={this.handleLogin.bind(this)}>
                        Login
                    </RoundRectButton>
                    <br/><br/>
                    <RoundRectButton normalColor='rgb(51, 155, 127)'
                                     hoverColor='rgb(29, 135, 107)'
                                     click={this.goToSignUp.bind(this)}>
                        Sign Up
                    </RoundRectButton>
                </div>


                {this.props.children}
            </div>
        );
    }


    /********************
    *      BUTTONS      *
    ********************/

    /** Handles logging in. */
    handleLogin() {
        var email = this.emailField.getText();
        var password = this.passwordField.getText();

        // Login with firebase
        firebase.auth().signInWithEmailAndPassword(email, password).then( (user) => {

            // Get the user credentials from the database.
            firebase.database().ref().child('Users').child(user.uid).once('value', (snap) => {
                
                this.props.rStore.dispatch({ type:'LOGIN', currentUser: snap.val() });
                window.localStorage.setItem('currentUser', JSON.stringify(snap.val()) );
                this.props.sidebar.navigateTo('account');

            }); // End of getting data.

        }).catch( (err) => {

            alert(err.message);

        }); // End of logging in.
    }



    /** Goes to the sign up page.  */
    goToSignUp() {
        this.props.sidebar.navigateTo('signup');
    }
}

export default Login;
