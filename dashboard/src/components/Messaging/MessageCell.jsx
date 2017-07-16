import React, { Component } from 'react';

class MessageCell extends Component {

    /*******************
    *  INITIALIZATION  *
    ********************/



    /*******************
    *      STYLES      *
    ********************/

    getCellStyles() {
        return {
            ...this.props.style,
            width: '90%',
            height: '90px',
            margin: 'auto',
            cursor: 'pointer',
            textAlign: 'center',
            marginBottom: '30px',
            backgroundColor: this.props.color || 'rgba(0, 0, 0, 0.1)'
        }
    }
    getSenderNameStyles() {
        return {
            width:'100%',
            height:'10%',
            color:'white',
            margin:'margin',
            textAlign:'center'
        }
    }
    getMessageContentStyles() {
        return {
            position:"relative",
            top:'10%',
            width:'100%',
            height:'90%',
            color:'white',
            margin:'margin',
            textAlign:'center'
        }
    }


    /*******************
    *      RENDER      *
    ********************/

    render() {
        return (
            <div onClick={this.props.click || (()=>{})} style={this.getCellStyles()}>
                <h4 style={this.getSenderNameStyles()}>{this.props.senderName}</h4>

                <p style={this.getMessageContentStyles()}>{this.props.content}</p>
            </div>
        );
    }


    /*******************
    *      METHODS     *
    ********************/
}