import React from 'react';
import * as firebase from 'firebase';

import Page from '../components/General/Page.jsx';

import BulletinPost from '../components/Bulletin/BulletinPost.jsx';
import UploadPostModal from '../components/Bulletin/UploadPostModal.jsx';

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
            yCoord:0
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
            height:'1000px',
            overflow: 'scroll',
            backgroundColor:'rgb(178, 125, 55)'
        }
    }
    getBulletinAreaStyles() {
        return {
            position:'absolute',
            width:'100%',
            height:'100%',
            overflow:'scroll',
            backgroundColor:'rgb(178, 125, 55)'
        }
    }
        




    /*******************
    *      RENDER      *
    ********************/

    render() {
        return (
            <div ref={(div)=>{this.bulletinArea = div}} onMouseDown={(e)=>{ super.userDidClickPage(); this.getMouseLocation(e); }} style={this.getPageStyles()}>

                {/* Title label */}
                <h1 style={super.getTitleStyles()}>Bulletin Board</h1>


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

                    var postItem = <BulletinPost key={p.key} title={post.title} xPos={post.xCoord} yPos={post.yCoord} rotation={post.rotation}></BulletinPost>;
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
        var xCoord = event.clientX - (BulletinPost.SIZE / 2);
        var yCoord = event.clientY - (BulletinPost.SIZE / 2);

        this.setState({
            xCoord:xCoord,
            yCoord:yCoord
        })

        this.handleOpenModal();
    }



    /**********************
    *    MODAL CONTROLS   *
    ***********************/
        
    handleCloseModal() { 
        this.setState({ showUploadModal: false });
    }

    handleOpenModal() { 
        this.setState({ showUploadModal: true }); 
    }




} // End of class.

export default Bulletin;
