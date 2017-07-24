import React, { Component } from 'react';
import * as firebase from 'firebase';
import Alertify from 'alertify.js';

import FileChooser from '../General/FileChooser.jsx';



function valueExists(element) {
    return (element !== '' && element !== " " && element !== null && element !== undefined);
}



/* eslint-disable */
export class MessageCreationArea extends Component {

    /********************
     *      STYLES      *
     ********************/

     getHeaderStyles() {
         return {
             fontSize:'25px',
             fontFamily:'Marmelad'
         }
     }
     getTextAreaStyle() {
         return {
             resize:'none'
         }
     }
     getSubmitButtonStyles() {
         return {
             width:'80px',
             height:'35px',
             border:'none',
             outline:'none',
             fontSize:'16px',
             background:'none',
             borderRadius:'25px',
             fontFamily:'Marmelad',
             textDecoration:'none',
             backgroundColor:'rgb(106, 215, 232)',
         }
     }


    /********************
     *      RENDER      *
     ********************/

    render() {
        return (
            <div>
                <br/>
                <h1 style={this.getHeaderStyles()}>Message</h1>
                <br/>
                <div>
                    <p style={{display:'inline-block'}}>Title: </p>
                    &nbsp;&nbsp;&nbsp;
                    <input style={{width:'200px'}} ref={(input)=>{this.titleField = input}} style={{display:'inline-block'}} type="text"/>
                </div>
                <textarea ref={(textarea)=>{this.textArea = textarea}} style={this.getTextAreaStyle()} cols="55" rows="10"></textarea>
                <br/>
                <div>
                    <p style={{display:'inline-block'}}>Rotation: </p>
                    &nbsp;&nbsp;&nbsp;
                    <input style={{width:'200px'}} ref={(input)=>{this.rotationField = input}} style={{display:'inline-block'}} type="number" value={0}/>
                </div>
                <br/><br/>
                <button style={this.getSubmitButtonStyles()} onClick={this.handleSubmit.bind(this)}>Submit</button>
            </div>
        );
    }

    /********************
     *      METHODS     *
     ********************/

    handleSubmit() {
        const store = this.props.rStore.getState();
        var message = this.textArea.value
        var title = this.titleField.value
        var rotation = this.rotationField.value

        if(valueExists(message) && valueExists(title) && valueExists(rotation)) {

            // Set the data in firebase.
            var path = firebase.database().ref().child('Bulletin').push()
            path.set({
                "uploader":store.currentUser.uid,
                "content":message,
                "type":"message",
                "uploadDate":Date.now(),
                "title":title,
                "xCoord":this.props.xCoord,
                "yCoord":this.props.yCoord,
                "rotation":rotation,
                "id":path.key
            }).then( () => {
                window.location.reload(true);
            });
        } else {
            Alertify.error('Please enter all credentials before submitting a post.');
        }
    }
}


export class PhotoCreationArea extends Component {

    /********************
     *       INIT       *
     ********************/

    constructor() {
        super();
        this.state = {
            visible:'hidden',
            chosenFile: null,
            backgroundColor:'lightcoral'
        }
    }

    componentDidMount() {
        
    }

    
    /********************
    *      STYLES      *
    ********************/

    getHeaderStyles() {
        return {
            fontSize:'25px',
            fontFamily:'Marmelad'
        }
    }
    uploadFromFileButton() {
        return {
            width:'180px',
            height:'35px',
            border:'none',
            cursor:'pointer',
            paddingTop:'10px',
            borderRadius:'25px',
            backgroundColor:this.state.backgroundColor
        }
    }
    getSubmitButtonStyles() {
        return {
            width:'80px',
            height:'35px',
            border:'none',
            outline:'none',
            fontSize:'16px',
            background:'none',
            borderRadius:'25px',
            fontFamily:'Marmelad',
            textDecoration:'none',
            backgroundColor:'rgb(106, 215, 232)',
        }
    }
    getUploadLabelStyles() {
        return {
            color:'green',
            visibility:this.state.visible
        }
    }


    /********************
    *      RENDER      *
    ********************/

    render() {
        return (
            <div>
                <br/>
                <h1 style={this.getHeaderStyles()}>Photos/GIF</h1>
                <br/>
                <div>
                    <p style={{display:'inline-block'}}>Title: </p>
                    &nbsp;&nbsp;&nbsp;
                    <input style={{width:'200px'}} ref={(input)=>{this.titleField = input}} style={{display:'inline-block'}} type="text"/>
                </div>
                <p style={this.getUploadLabelStyles()}>Uploaded File</p>
                <FileChooser name='photoChooser' id='photoChooser' accept='image/*' fileSelectedHandler={(e)=>{this.chooseFile(e)}}>
                    <h5 style={this.uploadFromFileButton()} onMouseOver={this.onHover.bind(this)} onMouseLeave={this.onRelease.bind(this)}>
                        Upload from file
                    </h5>
                </FileChooser>

                <h5>Or</h5>

                <div>
                    <p style={{display:'inline-block'}}>Enter the URL for the image: </p>
                    &nbsp;&nbsp;&nbsp;
                    <input ref={(input)=>{this.urlField = input}} style={{width:'300px',display:'inline-block'}} type="text"/>
                </div>
                <br/>
                <div>
                    <p style={{display:'inline-block'}}>Rotation: </p>
                    &nbsp;&nbsp;&nbsp;
                    <input style={{width:'200px'}} ref={(input)=>{this.rotationField = input}} style={{display:'inline-block'}} type="number" value={0}/>
                </div>

                <br/><br/>
                <button style={this.getSubmitButtonStyles()} onClick={this.handleSubmit.bind(this)}>Submit</button>
            </div>
        );
    }

    /********************
    *      METHODS     *
    ********************/

    onHover() {
        this.setState({
            backgroundColor:'rgb(216, 95, 111)'
        })
    }

    onRelease() {
        this.setState({
            backgroundColor:'lightcoral'
        })
    }

    chooseFile(e) {
        this.setState({
            visible:'visible',
            chosenFile: e
        })
    }

    handleSubmit() {
        const store = this.props.rStore.getState();
        var title = this.titleField.value
        var rotation = this.rotationField.value

        var url = this.urlField.value;
        var image = this.state.chosenFile;

        if(this.valueExists(title) && this.valueExists(rotation)) {

            // The path in the database and storage (storing base64s ???? ).
            var databasePath = firebase.database().ref().child('Bulletin').push();

            // Handle if an image is uploaded.
            if(image !== null && image !== undefined) {

                // Create a file version.
                var uploadTask = firebase.storage().ref().child('images').child(databasePath.key).putString(image, 'data_url').then( (snap) => {
                    // Set the database path.
                    databasePath.set({
                        "uploader":store.currentUser.uid,
                        "content": snap.downloadURL,
                        "type":"photo",
                        "uploadDate":Date.now(),
                        "title":title,
                        "xCoord":this.props.xCoord,
                        "yCoord":this.props.yCoord,
                        "rotation":rotation,
                        "id":databasePath.key
                    }).then( () => {
                        window.location.reload(true);
                    });
                });

            } 
            // Handle when a url is posted.
            else if(this.valueExists(url)) {

                // Set the database path.
                databasePath.set({
                    "uploader":store.currentUser.uid,
                    "content": url,
                    "type":"photo",
                    "uploadDate":Date.now(),
                    "title":title,
                    "xCoord":this.props.xCoord,
                    "yCoord":this.props.yCoord,
                    "rotation":rotation,
                    "id":databasePath.key
                }).then( () => {
                    window.location.reload(true);
                });

            }

            // Otherwise, show error alert.
            else {
                Alertify.error('You must either upload a photo or enter a url to a photo.');
                return;
            }

        } else {
            Alertify.error('Please enter all credentials before submitting a post.');
            return;
        }
    }



    valueExists(element) {
        return (element !== '' && element !== " " && element !== null && element !== undefined);
    }
}


export class LinkCreationArea extends Component {
    /********************
     *       INIT       *
     ********************/

     constructor() {
         super();
         this.state = {
             visible:'hidden',
             backgroundColor:'lightgreen'
         }
     }

    
    /********************
     *      STYLES      *
     ********************/

     getHeaderStyles() {
         return {
             fontSize:'25px',
             fontFamily:'Marmelad'
         }
     }
     getSubmitButtonStyles() {
         return {
             width:'80px',
             height:'35px',
             border:'none',
             outline:'none',
             fontSize:'16px',
             background:'none',
             borderRadius:'25px',
             fontFamily:'Marmelad',
             textDecoration:'none',
             backgroundColor:'rgb(106, 215, 232)',
         }
     }


    /********************
     *      RENDER      *
     ********************/

    render() {
        return (
            <div>
                <br/>
                <h1 style={this.getHeaderStyles()}>Link</h1>
                <br/>
                <div>
                    <p style={{display:'inline-block'}}>Title: </p>
                    &nbsp;&nbsp;&nbsp;
                    <input style={{width:'200px'}} ref={(input)=>{this.titleField = input}} style={{display:'inline-block'}} type="text"/>
                </div>
                <br/>
                <div>
                    <p style={{display:'inline-block'}}>Enter the URL for the page you are trying to link to: </p>
                    &nbsp;&nbsp;&nbsp;
                    <input ref={(input)=>{this.urlField = input}} style={{width:'300px',display:'inline-block'}} type="text"/>
                </div>
                <br/>
                <div>
                    <p style={{display:'inline-block'}}>Rotation: </p>
                    &nbsp;&nbsp;&nbsp;
                    <input style={{width:'200px'}} ref={(input)=>{this.rotationField = input}} style={{display:'inline-block'}} type="number" value={0}/>
                </div>

                <br/><br/>
                <button style={this.getSubmitButtonStyles()} onClick={this.handleSubmit.bind(this)}>Submit</button>
            </div>
        );
    }

    /********************
     *      METHODS     *
     ********************/

    handleSubmit() {
        const store = this.props.rStore.getState();
        var title = this.titleField.value
        var url = this.urlField.value
        var rotation = this.rotationField.value

        if(valueExists(url) && valueExists(title) && valueExists(rotation)) {

            // Set the data in firebase.
            var path = firebase.database().ref().child('Bulletin').push()
            path.set({
                "uploader":store.currentUser.uid,
                "content":url,
                "type":"link",
                "uploadDate":Date.now(),
                "title":title,
                "xCoord":this.props.xCoord,
                "yCoord":this.props.yCoord,
                "rotation":rotation,
                "id":path.key
            }).then( () => {
                window.location.reload(true);
            });
        } else {
            Alertify.alert('Please enter all credentials before submitting a post.');
        }
    }
}