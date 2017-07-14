import React from 'react';
import * as firebase from 'firebase';

import sCode from '../../public/specialcode.json';

import Page from '../components/General/Page.jsx';
import RoundInput from '../components/General/RoundInput.jsx';
import RoundRectButton from '../components/Buttons/RoundRectButton.jsx';

class SignUp extends Page {

    /********************
    *  INITIALIZATION  *
    ********************/

    constructor() {
        super();

        this.state = {
            buttonBG: 'rgb(51, 155, 127)'
        }
    }


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



    /********************
     *      RENDER      *
     ********************/

    render() {
        return (
            <div style={this.getPageStyles()} onMouseDown={()=>{ super.userDidClickPage(); }}>
            <h1 style={this.getTitleStyle()}>Sign Up</h1>


            <div>
                <RoundInput ref={(RoundInput)=>{this.firstNameField = RoundInput}} type='text' placeholder='First Name'/>
                <br/><br/>
                <RoundInput ref={(RoundInput)=>{this.lastNameField = RoundInput}} type='text' placeholder='Last Name'/>
                <br/><br/>
                <RoundInput ref={(RoundInput)=>{this.emailField = RoundInput}} type='email' placeholder='Enter your email'/>
                <br/><br/>
                <RoundInput ref={(RoundInput)=>{this.passwordField = RoundInput}} type='password' placeholder='Enter your email'/>
                <br/><br/>
                <RoundInput ref={(RoundInput)=>{this.confirmPasswordField = RoundInput}} type='password' placeholder='Re-enter your password'/>
                <br/><br/>
                <RoundInput ref={(RoundInput)=>{this.specialCodeField = RoundInput}} type='text' placeholder='Enter the code required for account creation'/>
                <br/><br/><br/><br/>

                <RoundRectButton normalColor='rgb(51, 155, 127)'
                                 hoverColor='rgb(29, 135, 107)'
                                 width='120px'
                                 height='70px'
                                 click={this.createAccount.bind(this)}>
                    Create Account
                </RoundRectButton>
                <br/><br/>
            </div>


            {this.props.children}
            </div>
        );
    }



    /********************
     *      BUTTONS     *
     ********************/

    createAccount() {
    var firstName = this.firstNameField.value;
    var lastName = this.lastNameField.value;
    var email = this.emailField.value;
    var password = this.passwordField.value;
    var confirmPassword = this.confirmPasswordField.value;
    var specialCode = this.specialCodeField.value;
    
    // If values exist for all of the elements.
    if(this.valueExists(firstName) && this.valueExists(lastName) && this.valueExists(email) && this.valueExists(password) && this.valueExists(confirmPassword)) {
        
        // If the passwords match.
        if(password === confirmPassword) {

            // Make sure the special code is correct.
            if(specialCode === sCode.code) {

                // Create the user in firebase auth.
                firebase.auth().createUserWithEmailAndPassword(email, password).then( (user) => {
                    
                    /* This is the completion block. Once the user has been created, save the actual
                    data to the database. */

                    firebase.database().ref().child('Users').child(user.uid).set({

                        'firstName':firstName,
                        'lastName':lastName,
                        'email':email,
                        'uid':user.uid

                    }); // End of saving user to database.

                    // Go to the account page.
                    this.props.rStore.dispatch({ type:'LOGIN' });
                    this.props.sidebar.navigateTo('account');

                }); // End of creating user.

            } else {
                alert('The special code is incorrect. Could not create account.');
            }

        } else {
            alert('Passwords do not match. Try again.');
        }
    } else {
        alert('Make sure you enter information for each field.');
    }

    } // End of method.



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

export default SignUp;