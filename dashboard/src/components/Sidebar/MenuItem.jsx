import React, { Component } from 'react';

class MenuItem extends Component {

    /********************
     *  INITIALIZATION  *
     ********************/

     constructor() {
         super();

         this.state = {
             backgroundColor: 'rgb(156, 212, 229)'
         }
     }



     /********************
     *      STYLES       *
     *********************/

     getStyles() {
         return {
             position:'relative',
             left:'0px',
             top:'0px',
             width:'100%',
             height:'10%',
             padding:'0px',
             margin:'0px',
             border:'none',
             cursor:'pointer',
             display:'inline-block',
             WebkitTransitionDuration:'0.4s',
             backgroundColor: this.state.backgroundColor
         }
     }
     getTitleStyles() {
         return {
             color:'gray',
             textAlign:'center'
         }
     }


    /********************
     *      RENDER      *
     ********************/

    render() {
        return (
            <div style={this.getStyles()} onMouseEnter={this.hoverEvents.bind(this)} onMouseLeave={this.unhoverEvents.bind(this)}>
                <h4 style={this.getTitleStyles()}>{this.props.title}</h4>
            </div>
        );
    }


    /*********************
     *      METHODS      *
     *********************/

     hoverEvents() {
        this.setState({
             backgroundColor: 'rgb(124, 183, 201)'
        })
     }

     unhoverEvents() {
        this.setState({
            backgroundColor: 'rgb(156, 212, 229)'
        })
     }
}

export default MenuItem;