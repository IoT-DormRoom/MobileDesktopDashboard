import React, { Component } from 'react';

import TitleArea from './TitleArea.jsx';
import MenuItem from './MenuItem.jsx';

// This is the sidebar that takes the user to all of the different pages.
class Sidebar extends Component {

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
            width:'250px',
            height:'100%',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            backgroundColor:'lightblue'
         }
     }



    /********************
     *      RENDER      *
     ********************/

    render() {
        return (
            <div style={this.getSidebarStyle()}>
                
                <TitleArea backgroundColor='rgb(200, 236, 247)'></TitleArea>


                <div style={{position:'relative',top:'10%',margin:'0px',padding:'0px'}}>
                    <MenuItem title='Home' backgroundColor='rgb(156, 212, 229)'></MenuItem>
                    <MenuItem title='Bulletin' backgroundColor='rgb(156, 212, 229)'></MenuItem>
                    <MenuItem title='Messaging' backgroundColor='rgb(156, 212, 229)'></MenuItem>
                    <MenuItem title='Todo (shared)' backgroundColor='rgb(156, 212, 229)'></MenuItem>
                    <MenuItem title='Todo (personal)' backgroundColor='rgb(156, 212, 229)'></MenuItem>
                    <MenuItem title='Lights' backgroundColor='rgb(156, 212, 229)'></MenuItem>
                </div>
            </div>
        );
    }


    /*********************
     *      BUTTONS      *
     *********************/

}

export default Sidebar;