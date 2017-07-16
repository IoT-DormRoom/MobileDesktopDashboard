import React from 'react';

import Page from '../components/General/Page.jsx';

class Messaging extends Page {
    
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

    

    /*******************
    *      RENDER      *
    ********************/

    render() {
        return (
            <div style={this.contentAreaStyles()} onMouseDown={()=>{ super.userDidClickPage(); }}>
                <h1 style={super.getTitleStyles()}>Messaging</h1>

                {this.props.children}
            </div>
        );
    }


    /********************
    *      BUTTONS      *
    ********************/
}

export default Messaging;
