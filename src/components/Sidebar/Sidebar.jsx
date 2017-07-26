import React, { Component } from 'react';

import TitleArea from './TitleArea.jsx';
import MenuItem from './MenuItem.jsx';

// This is the sidebar that takes the user to all of the different pages.
class Sidebar extends Component {

    /********************
     *  INITIALIZATION  *
     ********************/

    constructor(props) {
        super(props);
        
        this.state = {
            menuLeft: '-300px'
        }
    }


     /********************
     *      STYLES       *
     *********************/

     getSidebarStyle() {
         return {
            position:'fixed',
            left: this.state.menuLeft,
            top:'0px',
            width:'300px',
            height:'100%',
            zIndex:'5000',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            backgroundColor:'rgb(154, 234, 200)',
            WebkitTransitionDuration:'0.3s'
         }
     }
     getButtonStyles() {
         return {
             position:'absolute',
             right:'-70px',
             top:'-10px',
             width:'80px',
             height:'80px',
             border:'none',
             color:'white',
             opacity:'0.5',
             outline:'none',
             background:'none',
             textDecoration:'none'
         }
     }



    /********************
     *      RENDER      *
     ********************/

    render() {
        return (
            <div ref={(div)=>{this.sb = div}} style={this.getSidebarStyle()}>
                <button onClick={this.toggleMenu.bind(this)} style={this.getButtonStyles()}><span className='fa fa-bars'></span></button>
                <TitleArea backgroundColor='rgb(158, 237, 203)'></TitleArea>


                <div style={{position:'relative',top:'10%',margin:'0px',padding:'0px'}}>
                    <MenuItem click={()=>{this.navigateTo('')}} title='Bulletin'></MenuItem>
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
     *      METHODS      *
     *********************/

    navigateTo(page) {
        this.props.history.push(page);
    }

    closeMenu() {
        this.setState({
            menuLeft:'-300px'
        });
    }

    toggleMenu() {
        this.setState({
            menuLeft: this.state.menuLeft === '-300px' ? '0px' : '-300px'
        })
    }


}

export default Sidebar;