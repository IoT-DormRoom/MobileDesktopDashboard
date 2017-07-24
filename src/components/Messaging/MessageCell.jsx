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
            margin: 'auto',
            textAlign: 'center',
            marginBottom: '30px',
            backgroundColor: this.props.color || 'rgba(255, 255, 255, 0.5)'
        }
    }
    getSenderNameStyles() {
        return {
            width:'100%',
            height:'10%',
            color:'white',
            margin:'margin',
            textAlign:'center',
            paddingTop:'10px'
        }
    }
    getTimeStyles() {
        return {
            width:'100%',
            height:'5%',
            color:'white',
            margin:'margin',
            textAlign:'center',
            paddingTop:'-5px',
            paddingBottom:'10px',
            fontSize:'16px'
        }
    }
    getMessageContentStyles() {
        return {
            position:"relative",
            top:'10%',
            width:'80%',
            height:'90%',
            color:'white',
            margin:'auto',
            textAlign:'center',
            paddingBottom:'20px',
            wordWrap:'break-word',
            fontSize:'16px'
        }
    }


    /*******************
    *      RENDER      *
    ********************/

    render() {
        return (
            <div onClick={this.props.click || (()=>{})} style={this.getCellStyles()}>
                <h4 style={this.getSenderNameStyles()}>{this.props.senderName}</h4>
                <p style={this.getTimeStyles()}>{this.props.time}</p>
                <p style={this.getMessageContentStyles()}>{this.props.content}</p>
            </div>
        );
    }


    /*******************
    *      METHODS     *
    ********************/


}

export default MessageCell;