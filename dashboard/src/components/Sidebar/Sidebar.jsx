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
            width:'25%',
            height:'100%',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            backgroundColor:'rgb(154, 234, 200)',
            WebkitTransitionDuration:'0.3s'
         }
     }



    /********************
     *      RENDER      *
     ********************/

    render() {
        return (
            <div style={this.getSidebarStyle()}>
                
                <TitleArea backgroundColor='rgb(158, 237, 203)'></TitleArea>


                <div style={{position:'relative',top:'10%',margin:'0px',padding:'0px'}}>
                    <MenuItem click={()=>{this.navigateTo('')}} title='Home'></MenuItem>
                    <MenuItem click={()=>{this.navigateTo('bulletin')}} title='Bulletin'></MenuItem>
                    <MenuItem click={()=>{this.navigateTo('messaging')}} title='Messaging'></MenuItem>
                    <MenuItem click={()=>{this.navigateTo('todoshared')}} title='Todo (shared)'></MenuItem>
                    <MenuItem click={()=>{this.navigateTo('todopersonal')}} title='Todo (personal)'></MenuItem>
                    <MenuItem click={()=>{this.navigateTo('lights')}} title='Lights'></MenuItem>
                    <MenuItem click={()=>{this.navigateTo('account')}} title='Account'></MenuItem>
                </div>
            </div>
        );
    }


    /*********************
     *      BUTTONS      *
     *********************/

     navigateTo(page) {
        this.props.history.push(page);
     }

}

export default Sidebar;