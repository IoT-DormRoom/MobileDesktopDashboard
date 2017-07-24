import React, { Component } from 'react';
import * as firebase from 'firebase';

import BulletinPostDetail from './BulletinPostDetail.jsx';

class BulletinPost extends Component {

    /********************
    *     VARIABLES    *
    ********************/

    static SIZE = 150;


    /********************
    *  INITIALIZATION  *
    ********************/

    constructor() {
        super();

        this.state = {
            content:null,      // some kind of component (html element)
            uploader:"",       // The id of the uploader.
            uploaderName:'',
            uploadDate:0,       // The date of upload.
            title:'',          // the title of the post when uploaded
            type: 'message',
            id:'',

            border:'none',
            preview: <div></div>,
            showUploadModal: false
        }
    }

    componentDidMount() {
        this.configureTitle();
        this.setState({
            content: this.props.content,
            uploader: this.props.uploader,
            uploadDate: this.props.uploadDate,
            type: this.props.type,
            id: this.props.id
        }, () => {
            this.postDetail.setType(this.state.type);
            firebase.database().ref().child('Users').child(this.state.uploader).once('value', (snap) => {
                var obj = snap.val();
                this.setState({ 
                    uploaderName: obj.firstName + " " + obj.lastName
                }, () => {
                    this.postDetail.setUploaderName(this.state.uploaderName);
                    this.postDetail.formatDate(this.state.uploadDate);
                    this.postDetail.setContent(this.state.content);
                    this.postDetail.setID(this.state.id);
                });
            });
            this.loadThumbnail();
        });
    }


    /********************
    *      STYLES       *
    *********************/

    getStyles() {
        return {
            position:'absolute',
            top:this.props.yPos,
            left:this.props.xPos,
            width:'150px',
            height:'150px',
            backgroundColor:'white',
            border: this.state.border,
            transform:'rotate('+this.props.rotation+'deg)',
        }
    }
    getContentStyles() {
        return {
            position:'relative',
            left:'5%',
            top:'3%',
            width:'90%',
            height:'80%',
            backgroundColor:'lightblue'
        }
    }
    getTitleStlyes() {
        return {
        position:'relative',
        top:'-2%',
        left:'2%',
        width:'98%',
        fontFamily:'Marmelad'
        }
    }




    /*********************
     *      RENDER       *
     *********************/

    render() {
        return (
            <div style={this.getStyles()}
                onClick={this.didSelectBulletinPost.bind(this)}
                onMouseEnter={this.handleHover.bind(this)}
                onMouseLeave={this.handleUnhover.bind(this)}>

                <div style={this.getContentStyles()}>
                    {this.state.preview}
                </div>


                <div style={this.getTitleStlyes()}>
                    <h4 style={{fontFamily:'Marmelad',fontSize:'15px'}}>{this.state.title}</h4>
                </div>


                <BulletinPostDetail ref={(BulletinPostDetail)=>{this.postDetail = BulletinPostDetail}}
                                    show={this.state.showUploadModal}
                                    onHide={()=>{this.handleCloseModal()}}
                                    title={this.state.title}
                                    uploader={this.state.uploaderName}
                                    uploadDate={this.state.uploadDate}
                                    content={this.state.content}>
                </BulletinPostDetail>
            </div>
        );
    }


    /********************
    *      METHODS      *
    *********************/

    handleHover() {
        this.setState({
            border:'2px yellow solid'
        })
    }

    handleUnhover() {
        this.setState({
            border:'none'
        })
    }

    configureTitle() {
        var title = this.props.title;
        const MAX_LENGTH = 15;

        if(title.length > MAX_LENGTH) {
            title = this.props.title.substring(0,MAX_LENGTH) + "...";
        }

        this.setState({ title: title });
    }



    didSelectBulletinPost() {
        this.setState({ showUploadModal: true });
    }


    /**********************
    *    MODAL CONTROLS   *
    ***********************/
        
    handleCloseModal() { 
        this.setState({ showUploadModal: false });
        return
    }





    /********************
    *      CONTENT      *
    *********************/

    loadThumbnail() {
        var content = this.state.content;
        var type = this.props.type;
        
        if(type === 'link') {

            // Load a preview
            var frame = <iframe src={"" + content} scrolling='no' frameBorder="0" style={{position:'absolute',width:'100%', height:'100%'}}/>
            this.setState({ preview: frame });

        } else if(type === 'photo') {

            // Load preview
            var img = <img src={"" + content} alt="preview" style={{position:'absolute',width:'100%',height:'100%'}}/>
            this.setState({ preview: <div>{img}</div> });

        } else if(type === 'video') {

            // Load preview
            var vid = <video src={""+content}></video>
            this.setState({ preview: <div>{vid}</div> });

        } else {

            // Message preview
            var text = <p style={{position:'absolute',left:'5px',right:'5px'}}>{content.substring(0, 80)}...</p>
            this.setState({ preview: <div>{text}</div> });

        }
    }


}

export default BulletinPost;