import React from 'react';
import * as firebase from 'firebase';

import Page from '../components/General/Page.jsx';
import MessageCell from '../components/Messaging/MessageCell.jsx';
import MessageInput from '../components/Messaging/MessageInput.jsx';
import RoundRectButton from '../components/Buttons/RoundRectButton.jsx';

class Messaging extends Page {
    
    /********************
    *  INITIALIZATION  *
    ********************/

    constructor() {
        super();
        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        this.loadAllMessages();
    }


    /********************
    *      STYLES       *
    ********************/

    contentAreaStyles() {
        return {
            position:'absolute',
            width:'100%',
            height:'100%',
            overflow: 'scroll',
            backgroundColor:'rgb(51, 153, 221)'
        }
    }

    messageAreaStyles() {
        return {
            width:'100%',
            height:'100%',
            margin:'auto',
            textAlign:'center',
            paddingTop:'10px'
        }
    }
    submitButtonStyles() {
        return {
            color:'white',
            fontSize:'20px',
            fontFamily:'Marmelad'
        }
    }



    /*******************
    *      RENDER      *
    ********************/

    render() {
        return (
            <div style={this.contentAreaStyles()} onMouseDown={()=>{ super.userDidClickPage(); }}>
                <h1 style={super.getTitleStyles()}>Messaging</h1>

                <div style={this.messageAreaStyles()}>
                    {/* Area to type a new message. */}
                    <div style={{display:'inline'}}>
                        <MessageInput style={{display:'inline-block'}} placeholder='Type a message'></MessageInput>
                        <RoundRectButton style={{display:'inline-block'}} 
                                        normalColor='rgb(30, 125, 188)' 
                                        hoverColor='rgb(12, 97, 150)'
                                        width='100px'
                                        height='100px'>
                            <h4 style={this.submitButtonStyles()}>Send</h4>
                        </RoundRectButton>
                    </div>


                    {this.state.messages}
                </div>

                {this.props.children}
            </div>
        );
    }


    /********************
    *      METHODS      *
    ********************/

    /** Loads all messages sent between us. */
    loadAllMessages() {
        const ref = firebase.database().ref()
        ref.child('Messages').orderByChild('timestamp').endAt(Date.now()).on('child_added', this.observeEvent.bind(this));
    }



    /** The firebase observe function. */
    observeEvent(snap) {

    }

}

export default Messaging;
