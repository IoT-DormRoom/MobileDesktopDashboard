import React, { Component } from 'react';

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
             content:null,  // some kind of component (html element)
             title:'',      // the title of the post when uploaded


             border:'none'
         }
     }

    componentDidMount() {

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
                onMouseEnter={this.handleHover.bind(this)}
                onMouseLeave={this.handleUnhover.bind(this)}>

                <div style={this.getContentStyles()}>
                    
                </div>


                <div style={this.getTitleStlyes()}>
                    <h4 style={{fontFamily:'Marmelad',fontSize:'15px'}}>{this.props.title}</h4>
                </div>
            </div>
        );
    }


    /*********************
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
}

export default BulletinPost;