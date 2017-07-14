import React, { Component } from 'react';

class RoundInput extends Component {

    /*******************
    *  INITIALIZATION  *
    ********************/
    
    constructor() {
        super();
        this.state = {
            type:'text',
            placeholder:''
        }
    }

    componentDidMount() {
        if(this.props.type) {
            this.setState({ type: this.props.type });
        }
        if(this.props.placeholder) {
            this.setState({ placeholder: this.props.placeholder });
        }
    }


    /********************
    *      STYLES       *
    ********************/

    getInputStyles() {
        return {
            width:'300px',
            height:'30px',
            border:'none',
            outline:'none',
            fontSize:'14px',
            background:'none',
            paddingLeft:'10px',
            borderRadius:'25px',
            textDecoration:'none',
            fontFamily:'Marmelad',
            backgroundColor:'white'
        }
    }



    /********************
    *      RENDER       *
    ********************/

    render() {
        return (
            <input ref={(input)=>{this.roundInput = input}} type={this.state.type} placeholder={this.state.placeholder} style={this.getInputStyles()}/>
        )
    }



    /********************
    *      METHODS      *
    ********************/

    /** Returns the text of the input. */
    getText() {
        return this.roundInput.value;
    }

}


export default RoundInput;