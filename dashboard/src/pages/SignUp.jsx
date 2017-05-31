import React, { Component } from 'react';
import * as firebase from 'firebase';

class SignUp extends Component {

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
             backgroundColor:'rgb(90, 201, 173)'
        }
     }
     contentAreaStyles() {
         return {
             position:'relative',
             left:'25%',
             top:'0px',
             width:'75%',
             height:'100%',
             textAlign:'center'
         }
     }
     getTitleStyle() {
         return {
            color:'rgb(51, 155, 127)',
            fontSize:'50px',
            textAlign:'center',
            fontFamily:'Marmelad'
         }
     }
     getInputStyles() {
         return {
             width:'300px',
             height:'30px',
             border:'none',
             outline:'none',
             fontSize:'14px',
             background:'none',
             paddingLeft:'10px',
             borderRadius:'25px',
             textDecoration:'none',
             fontFamily:'Marmelad',
             backgroundColor:'white'
         }
     }
     getButton1Styles() {
         return {
             width:'110px',
             height:'50px',
             border:'none',
             outline:'none',
             fontSize:'18px',
             fontStyle:'bold',
             cursor:'pointer',
             background:'none',
             borderRadius:'10px',
             fontFamily:'Marmelad',
             textDecoration:'none',
             color:'rgb(9, 84, 61)',
             backgroundColor:this.state.buttonBG
         }
     }



    /********************
     *      RENDER      *
     ********************/

    render() {
        return (
            <div style={this.getPageStyles()}>
                <div id='contentArea' style={this.contentAreaStyles()}>


                    <h1 style={this.getTitleStyle()}>Sign Up</h1>


                    <div>
                        <input ref={(input)=>{this.firstNameField = input}} type='text' placeholder='First name' style={this.getInputStyles()}/>
                        <br/><br/>
                        <input ref={(input)=>{this.lastNameField = input}} type='text' placeholder='Last name' style={this.getInputStyles()}/>
                        <br/><br/>
                        <input ref={(input)=>{this.emailField = input}} type='email' placeholder='Enter your email' style={this.getInputStyles()}/>
                        <br/><br/>
                        <input ref={(input)=>{this.passwordField = input}} type='password' placeholder='Enter your password' style={this.getInputStyles()}/>
                        <br/><br/>
                        <input ref={(input)=>{this.confirmPasswordField = input}} type='password' placeholder='Re-enter your password' style={this.getInputStyles()}/>
                        <br/><br/><br/><br/>

                        <button style={this.getButton1Styles()} 
                                onMouseEnter={this.handleHover.bind(this)}
                                onMouseLeave={this.handleUnhover.bind(this)}
                                onClick={this.createAccount.bind(this)}> Create Account </button>
                        <br/><br/>
                    </div>


                </div>
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
        

        // If values exist for all of the elements.
        if(this.valueExists(firstName) && this.valueExists(lastName) && this.valueExists(email) && this.valueExists(password) && this.valueExists(confirmPassword)) {
            
            // If the passwords match.
            if(password === confirmPassword) {

                // Create the user in firebase auth.
                firebase.auth().createUserWithEmailAndPassword(email, password).then( (user) => {
                    
                    /* This is the completion block. Once the user has been created, save the actual
                    data to the database. */

                    firebase.database().ref().child('Users').child(user.uid).set({

                        'firstName':firstName,
                        'lastName':lastName,
                        'email':email

                    }); // End of saving user to database.

                    // Go to the account page.
                    this.props.rStore.dispatch({ type:'LOGIN' });
                    this.props.sidebar.navigateTo('account');

                }); // End of creating user.

            }
        }

     } // End of method.


     handleHover() {
        this.setState({
            buttonBG:'rgb(31, 119, 94)'
        })
     }
     handleUnhover() {
         this.setState({
            buttonBG:'rgb(51, 155, 127)'
        })
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

export default SignUp;