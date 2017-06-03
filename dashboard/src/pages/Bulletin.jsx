import React, { Component } from 'react';

import BulletinPost from '../components/Bulletin/BulletinPost.jsx';
import UploadPostModal from '../components/Bulletin/UploadPostModal.jsx';

class Bulletin extends Component {
    
    /********************
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
             height:'100%',
             backgroundColor:'rgb(178, 125, 55)'
         }
     }
     contentAreaStyles() {
         return {
             position:'relative',
             left:'25%',
             top:'0px',
             width:'75%',
             height:'100%'
         }
     }
     getBulletinAreaStyles() {
         return {
             position:'relative',
             width:'100%',
             height:'100%',
             overflow:'scroll'
         }
     }
     getTitleStyles() {
         return {
             position:'relative',
             top:'-10px',
             color:'rgb(150, 101, 37)',
             fontSize:'30px',
             textAlign:'center',
             fontFamily:'Marmelad'
         }
     }
     getAddPostButtonStyles() {
         return {
            float:'right',
            paddingRight:'20px',
            color:'white',
            fontSize:'30px',
            fontFamily:'Marmelad',
            border:'none',
            background:'none',
            outline:'none',
            cursor:'pointer'
         }
     }




    /********************
     *      RENDER      *
     ********************/

    render() {
        return (
            <div style={this.getPageStyles()}>
                <div style={this.contentAreaStyles()}>
                    
                    {/* The title area. */}
                    <h1 style={this.getTitleStyles()}>Bulletin Board</h1>
                    
                    {/* The button for adding posts. */}
                    <div style={{position:'absolute',top:'-10px',width:'100%'}}>
                        <button ref={(button)=>{this.addButton = button}}
                                style={this.getAddPostButtonStyles()}
                                onClick={this.changePostSymbol.bind(this)}>+</button>
                    </div>


                    {/* Where all of the bulletin posts go. */}
                    <div ref={(div)=>{this.bulletinArea = div}} style={this.getBulletinAreaStyles()} onMouseDown={(e)=>{this.getMouseLocation(e)}}>
                        {this.state.posts}
                    </div>

                </div>

                <UploadPostModal show={this.state.showUploadModal}
                           onHide={()=>{this.handleCloseModal()}}
                           xCoord={this.state.xCoord}
                           yCoord={this.state.yCoord}>
                </UploadPostModal>
            </div>
        );
    }


    /********************
     *      BUTTONS     *
     ********************/

     /** Loads all of the bulletin board posts from the firebase database. */
     loadBulletinPosts() {
         var temp = [];

         var post = <BulletinPost key={temp.length} xPos={85} yPos={200} rotation={0}></BulletinPost>;
         temp.push(post);

         this.setState({
             posts: temp
         })
     } // End of class.



     /** Handles changing the symbol when creating a new post for the bulletin board. */
     changePostSymbol() {
         /* First, change the icon so the program knows when to be waiting for a location
         to place the post. */
         if(this.addButton.innerHTML === '+') {
             this.addButton.innerHTML = "x";
         } else {
             this.addButton.innerHTML = "+";
         }
     } // End of method.



     /** Looks for the location of the mouse click. Really only executes if the user is
     trying to post a new bulletin item. */
     getMouseLocation(event) {
        if(this.addButton.innerHTML === 'x') {
            var xCoord = event.clientX - this.props.sidebar.getWidth();
            var yCoord = event.clientY;

            this.setState({
                xCoord:xCoord,
                yCoord:yCoord
            })

            this.handleOpenModal();
        }
     }



    /***********************
     *    MODAL CONTROLS   *
     ***********************/
        
     handleCloseModal() { 
         this.setState({ showUploadModal: false });
         this.addButton.innerHTML = "+";
     }

     handleOpenModal() { 
         this.setState({ showUploadModal: true }); 
     }




} // End of class.

export default Bulletin;
