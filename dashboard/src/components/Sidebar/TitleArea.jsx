import React, { Component } from 'react';

class TitleArea extends Component {

    /********************
     *  INITIALIZATION  *
     ********************/



     /********************
     *      STYLES       *
     *********************/

     getSidebarStyle() {
         return {
            position:'absolute',
            left:'0px',
            top:'0px',
            width:'100%',
            height:'10%',
            padding:'0px',
            margin:'0px',
            zIndex:'2',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.05)',
            backgroundColor: this.props.backgroundColor
         }
     }
     getMenuTitleStyles() {
         return {
             color:'gray',
             textAlign:'center',
             marginTop:'15px'
         }
     }
     getButtonStyles() {
         return {
             border:'none',
             background:'none',
             textDecoration:'none',
             backgroundImage: 'none',
             outline: '0',
             WebkitBoxShadow: 'none',
             boxShadow: 'none',
             fontSize:'15px',
             color:'gray',
             height: '50%',
             cursor:'pointer'
         }
     }



    /********************
     *      RENDER      *
     ********************/

    render() {
        return (
            <div style={this.getSidebarStyle()}>
                <h3 style={this.getMenuTitleStyles()}> 
                    Dashboard
                </h3>
            </div>
        );
    }


    /*********************
     *      BUTTONS      *
     *********************/

}

export default TitleArea;