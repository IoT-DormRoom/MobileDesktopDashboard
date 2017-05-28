import React, { Component } from 'react';

class Login extends Component {
    
    /********************
     *  INITIALIZATION  *
     ********************/



     /********************
     *      STYLES       *
     ********************/

     contentAreaStyles() {
         return {
             position:'relative',
             left:'25%',
             top:'0px',
             width:'75%',
             height:'100%'
         }
     }
     getTitleStyle() {
         return {
            color:'gray',
            textAlign:'center'
         }
     }


    /********************
     *      RENDER      *
     ********************/

    render() {
        return (
            <div style={this.contentAreaStyles()}>
                <h1 style={this.getTitleStyle()}>Login</h1>

                <input type='email' placeholder='Enter your email'/>
                <input type='password' placeholder='Enter your password'/>
            </div>
        );
    }


    /********************
     *      BUTTONS      *
     ********************/
}

export default Login;
