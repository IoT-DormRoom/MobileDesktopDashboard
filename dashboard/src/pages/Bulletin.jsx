import React, { Component } from 'react';

class Bulletin extends Component {
    
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
             backgroundColor:'green'
         }
     }



    /********************
     *      RENDER      *
     ********************/

    render() {
        return (
            <div style={this.contentAreaStyles()}>
                <h1>Header</h1>
            </div>
        );
    }


    /********************
     *      BUTTONS      *
     ********************/
}

export default Bulletin;
