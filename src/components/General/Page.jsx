import React, { Component } from 'react';

/** A general class which all other pages stem from. */
class Page extends Component {

    /********************
    *       STYLES      *
    *********************/

    /** Returns the styling to use for the title on every page. */
    getTitleStyles() {
        return {
            color:'black',
            opacity:'0.35',
            fontSize:'40px',
            textAlign:'center',
            fontFamily:'Marmelad',
        }
    }





    render() {
        return (
            <div>

            </div>
        );
    }


    /********************
    *      METHODS      *
    *********************/

    /** The action to perform everytime the user clicks the page. */
    userDidClickPage() {
        this.props.sidebar.closeMenu();
    }







}

export default Page;