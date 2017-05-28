import React, { Component } from 'react';

class Account extends Component {
    
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
                
            </div>
        );
    }


    /********************
     *      BUTTONS      *
     ********************/
}

export default Account;
