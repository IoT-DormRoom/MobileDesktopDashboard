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

    componentWillUnmount() {
        firebase.database().ref().child('Messaging').off();
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
                    <MessageInput ref={(MessageInput)=>{this.messageInput = MessageInput}} placeholder='Type a message'></MessageInput>
                    <br/>
                    <RoundRectButton normalColor='rgb(30, 125, 188)' 
                                    hoverColor='rgb(12, 97, 150)'
                                    width='80%'
                                    height='50px'
                                    click={this.sendMessage.bind(this)}>
                        <h4 style={this.submitButtonStyles()}>Send</h4>
                    </RoundRectButton>


                    <br/><br/><br/><br/>
                    {this.state.messages}
                </div>

                {this.props.children}
            </div>
        );
    }


    /********************
    *      METHODS      *
    ********************/

    /** Handles sending a message through the database. */
    sendMessage() {
        const store = this.props.rStore.getState();
        const cUser = store.currentUser;
        if(cUser === null || cUser === undefined) { return; }

        // Get the message from the input field.
        var message = this.messageInput.getText();
        if(message !== "") {
            // Save to the database.
            const ref = firebase.database().ref().child('Messaging').push();
            ref.set({
                "id":ref.key,
                "content":message,
                "timestamp":Date.now(),
                "senderName":cUser.firstName + " " + cUser.lastName
            });

            // Clear the input field.
            this.messageInput.clearText();
        }
    }


    /** Loads all messages sent between us. */
    loadAllMessages() {
        const ref = firebase.database().ref()
        ref.child('Messaging').on('child_added', this.observeEvent.bind(this));
    }



    /** The firebase observe function. */
    observeEvent(snap) {
        var singleMsg = snap.val();
        var timePostedAgo = new Date( singleMsg.timestamp );

        var hours = timePostedAgo.getHours() - 12;
        var minutes = "0" + timePostedAgo.getMinutes();
        var amOrPm = "";
        
        if(timePostedAgo.getHours() > 12) {
            amOrPm = "pm";
        } else {
            amOrPm = "am";
        }

        var formattedTime = hours + ':' + minutes.substr(-2) + amOrPm;
        

        const messageCell = <MessageCell key={singleMsg.id}
                                        senderName={singleMsg.senderName}
                                        time={'Sent: ' + formattedTime}
                                        content={singleMsg.content} />
        this.setState({ 
            messages: this.state.messages.concat([messageCell])
        });
    }

}

export default Messaging;
