import React, { Component } from 'react';
import * as firebase from 'firebase';

class Login extends Component {
    
    /********************
     *  INITIALIZATION  *
     ********************/

     constructor() {
         super();

         this.state = {
             button1BG: 'rgb(51, 155, 127)',
             button2BG: 'rgb(51, 155, 127)'
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
             width:'100px',
             height:'40px',
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
             backgroundColor:this.state.button1BG
         }
     }
     getButton2Styles() {
         return {
             width:'100px',
             height:'40px',
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
             backgroundColor:this.state.button2BG
         }
     }



    /********************
     *      RENDER      *
     ********************/

    render() {
        return (
            <div style={this.getPageStyles()}>
                <div id='contentArea' style={this.contentAreaStyles()}>


                    <h1 style={this.getTitleStyle()}>Login</h1>


                    <div>
                        <input ref={(input)=>{this.emailField = input}} type='email' placeholder='Enter your email' style={this.getInputStyles()}/>
                        <br/><br/>
                        <input ref={(input)=>{this.passwordField = input}} type='password' placeholder='Enter your password' style={this.getInputStyles()}/>
                        <br/><br/><br/><br/>

                        <button style={this.getButton1Styles()} 
                                onMouseEnter={this.handleHover1.bind(this)}
                                onMouseLeave={this.handleUnhover1.bind(this)}
                                onClick={this.handleLogin.bind(this)}> Login</button>
                        <br/><br/>
                        <button style={this.getButton2Styles()} 
                                onMouseEnter={this.handleHover2.bind(this)} 
                                onMouseLeave={this.handleUnhover2.bind(this)}
                                onClick={this.goToSignUp.bind(this)}> Sign Up</button>
                    </div>


                </div>
            </div>
        );
    }


    /********************
     *      BUTTONS      *
     ********************/

     handleLogin() {
         var email = this.emailField.value;
         var password = this.passwordField.value;

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

     goToSignUp() {
         this.props.sidebar.navigateTo('signup');
     }


     handleHover1() {
        this.setState({
            button1BG:'rgb(31, 119, 94)'
        })
     }
     handleUnhover1() {
         this.setState({
            button1BG:'rgb(51, 155, 127)'
        })
     }
     handleHover2() {
        this.setState({
            button2BG:'rgb(31, 119, 94)'
        })
     }
     handleUnhover2() {
         this.setState({
            button2BG:'rgb(51, 155, 127)'
        })
     }
}

export default Login;
