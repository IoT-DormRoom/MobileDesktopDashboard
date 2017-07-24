import React, { Component } from 'react';

class MessageInput extends Component {

    /*******************
    *  INITIALIZATION  *
    ********************/


    /********************
    *      STYLES       *
    ********************/

    getStyle() {
        return {
            ...this.props.style,
            width:'80%',
            height:'100px',
            border:'none',
            outline:'none',
            background:'none',
            borderRadius:'10px',
            textDecoration:'none',
            backgroundColor:'white',
        }
    }
    



    /*******************
    *      RENDER      *
    ********************/

    render() {
        return (
            <textarea ref={(textarea)=>{this.area = textarea}} type="text" style={this.getStyle()} placeholder={this.props.placeholder}>
            </textarea>
        );
    }


    /********************
    *      METHODS      *
    ********************/

    getText() {
        return this.area.value
    }

    clearText() {
        this.area.value = ""
    }

}

export default MessageInput;