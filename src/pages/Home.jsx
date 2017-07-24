import React from 'react';

import Page from '../components/General/Page.jsx';

// This is the home page.
class Home extends Page {

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
             backgroundColor:'whitesmoke'
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
            <div style={this.contentAreaStyles()} onMouseDown={()=>{ super.userDidClickPage(); }}>
                

                {this.props.children}
            </div>
        );
    }


    /********************
     *      BUTTONS      *
     ********************/

}

export default Home;
