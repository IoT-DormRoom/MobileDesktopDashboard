import React from 'react';
import * as firebase from 'firebase';
import Alertify from 'alertify.js';

import Page from '../components/General/Page.jsx';

import BulletinPost from '../components/Bulletin/BulletinPost.jsx';
import UploadPostModal from '../components/Bulletin/UploadPostModal.jsx';
import RoundRectButton from '../components/Buttons/RoundRectButton.jsx';

class Bulletin extends Page {
    
    /*******************
    *  INITIALIZATION  *
    ********************/

    constructor() {
        super();

        this.state =  {
            posts:[],
            showUploadModal:false,
            xCoord:0,
            yCoord:0,
            allowOpenModal: false
        }
    }

    componentDidMount() {
        this.loadBulletinPosts();
    }




    /********************
    *      STYLES       *
    ********************/

    getPageStyles() {
        return {
            position:'absolute',
            top:'0px',
            left:'0px',
            width:'100%',
            height:'100%',
            overflow: 'scroll',
            backgroundColor:'rgb(188, 139, 75)'
        }
    }
    getBulletinAreaStyles() {
        return {
            position:'absolute',
            width:'100%',
            height:'100%',
            overflow:'scroll'
        }
    }
    getAddButtonStyles() {
        return {
            position: 'absolute',
            top: '20px',
            right: '10px'
        }
    }
        




    /*******************
    *      RENDER      *
    ********************/

    render() {
        return (
            <div ref={(div)=>{this.bulletinArea = div}} 
                onMouseDown={(e)=>{ super.userDidClickPage(); this.getMouseLocation(e); }} 
                style={this.getPageStyles()}>

                {/* Title label */}
                <h1 style={super.getTitleStyles()}>Bulletin Board</h1>
                
                <RoundRectButton ref={(RoundRectButton)=>{this.addBtn = RoundRectButton}}
                                 width='50px' height='50px' color='white'
                                 normalColor='rgb(142, 95, 32)'
                                 hoverColor='rgb(107, 68, 17)'
                                 style={this.getAddButtonStyles()}
                                 click={this.changeAddingPermission.bind(this)}>
                    +
                </RoundRectButton>


                {/* All of the bulletin posts. */}
                {this.state.posts}


                {/* Modal used for uploading. */}
                <UploadPostModal show={this.state.showUploadModal}
                                 onHide={()=>{this.handleCloseModal()}}
                                 rStore={this.props.rStore}
                                 xCoord={this.state.xCoord}
                                 yCoord={this.state.yCoord}>
                </UploadPostModal>

                {this.props.children}
            </div>
        );
    }


    /*******************
    *      BUTTONS     *
    ********************/

    /** Loads all of the bulletin board posts from the firebase database. */
    loadBulletinPosts() {
        var temp = [];
        this.setState({ posts: [] });

        firebase.database().ref().child('Bulletin').once('value', (snap) => {
            var posts = snap;

            if(posts) {
                posts.forEach( (p) => {
                    var post = p.val();

                    var postItem = <BulletinPost key={p.key}
                                                content={post.content} 
                                                title={post.title} 
                                                xPos={post.xCoord} 
                                                yPos={post.yCoord} 
                                                rotation={post.rotation}
                                                uploader={post.uploader}
                                                type={post.type}
                                                id={p.key}
                                                read={post.read || false}
                                                uploadDate={post.uploadDate}></BulletinPost>;
                    temp.push(postItem);

                    this.setState({
                        posts: temp
                    });
                });
            }
        });

    } // End of class.



    /** Looks for the location of the mouse click. Really only executes if the user is
    trying to post a new bulletin item. */
    getMouseLocation(event) {
        if(this.state.allowOpenModal === true) {
            var xCoord = event.clientX - (BulletinPost.SIZE / 2);
            var yCoord = event.clientY - (BulletinPost.SIZE / 2);

            this.setState({
                xCoord: xCoord,
                yCoord: yCoord,
                allowOpenModal: false
            })
            
            this.handleOpenModal();
        }
    }



    /**********************
    *    MODAL CONTROLS   *
    ***********************/
        
    handleCloseModal() { 
        this.setState({ showUploadModal: false });
        return
    }

    handleOpenModal() { 
        this.setState({ showUploadModal: true });
        return
    }


    changeAddingPermission() {
        this.setState({ allowOpenModal: true });

        Alertify.logPosition('top right');
        Alertify.log('Click anywhere to add a new bulletin item.');
    }


} // End of class.

export default Bulletin;
