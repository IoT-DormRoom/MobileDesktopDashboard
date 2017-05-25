import React, { Component } from 'react';

class Messaging extends Component {
    
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
             backgroundColor:'blue'
         }
     }


    /********************
     *      RENDER      *
     ********************/

    render() {
        return (
            <div style={this.contentAreaStyles()}>
                <h1>Title</h1>
            </div>
        );
    }


    /********************
     *      BUTTONS      *
     ********************/
}

export default Messaging;
