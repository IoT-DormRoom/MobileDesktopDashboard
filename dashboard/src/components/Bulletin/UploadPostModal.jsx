import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import { MessageCreationArea, PhotoCreationArea,
         VideoCreationArea, LinkCreationArea } from './ContentCreationArea.jsx';

class UploadPostModal extends Component {

    /********************
     *  INITIALIZATION  *
     ********************/

     constructor() {
         super();

         this.state = {
             contentArea: <div></div>
         }
     }




    /********************
     *      STYLES      *
     ********************/




    /********************
     *      RENDER      *
     ********************/

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} aria-labelledby="contained-modal-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm" style={{textAlign:'center',fontFamily:'Marmelad'}}>
                        Upload Bulletin Post
                    </Modal.Title>
                </Modal.Header>


                <Modal.Body style={{textAlign:'center'}}>
                    <h5>Creating a new bulletin post at (x: {this.props.xCoord}, y: {this.props.yCoord})</h5>
                    <br/>
                    <p>What type of post are you making?</p>
                    <input ref={(input)=>{this.messageChecker = input}} type="radio" name="postType" value="message" onChange={this.configureCreationOptions.bind(this)}/> Message &nbsp;
                    <input ref={(input)=>{this.photoChecker = input}} type="radio" name="postType" value="photo" onChange={this.configureCreationOptions.bind(this)}/> Photo/GIF &nbsp;
                    <input ref={(input)=>{this.videoChecker = input}} type="radio" name="postType" value="video" onChange={this.configureCreationOptions.bind(this)}/> Video &nbsp;
                    <input ref={(input)=>{this.linkChecker = input}} type="radio" name="postType" value="link" onChange={this.configureCreationOptions.bind(this)}/> Link <br/>


                    {/* The area for actually adding stuff. */}
                    <div>
                        {this.state.contentArea}
                    </div>

                </Modal.Body>


                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        );
    }



    /********************
     *      METHODS     *
     ********************/

     /** Changes the area where content is added based on the type of post.  */
     configureCreationOptions() {
         if(this.messageChecker.checked) {
             this.setState({
                contentArea: <MessageCreationArea rStore={this.props.rStore} xCoord={this.props.xCoord} yCoord={this.props.yCoord}></MessageCreationArea>
             })
        } else if(this.photoChecker.checked) {
            this.setState({
                contentArea: <PhotoCreationArea rStore={this.props.rStore} xCoord={this.props.xCoord} yCoord={this.props.yCoord}></PhotoCreationArea>
            })
        } else if(this.videoChecker.checked) {
            this.setState({
                contentArea: <VideoCreationArea rStore={this.props.rStore} xCoord={this.props.xCoord} yCoord={this.props.yCoord}></VideoCreationArea>
            })
        } else if(this.linkChecker.checked) {
            this.setState({
                contentArea: <LinkCreationArea rStore={this.props.rStore} xCoord={this.props.xCoord} yCoord={this.props.yCoord}></LinkCreationArea>
            })
        } else {
            this.setState({
                contentArea: <div></div>
            })
        }
    }

};

export default UploadPostModal;