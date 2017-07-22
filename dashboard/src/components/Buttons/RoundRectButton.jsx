import React, { Component } from 'react';

class RoundRectButton extends Component {

    /*******************
    *  INITIALIZATION  *
    ********************/

    constructor() {
        super();

        this.state = {
            hoverColor: 'gray',
            normalColor: 'lightgray',
            currentColor: 'lightgray'
        }
    }

    componentDidMount() {
        if(this.props.normalColor) {
            this.setState({
                normalColor: this.props.normalColor,
                currentColor: this.props.normalColor
            });
        }

        if(this.props.hoverColor) {
            this.setState({
                hoverColor: this.props.hoverColor
            });
        }
    }


    /********************
    *      STYLES       *
    ********************/

    getButtonStyles() {
        return {
            ...this.props.style,
            width: this.props.width || '100px',
            height: this.props.height || '40px',
            border:'none',
            outline:'none',
            fontSize: this.props.fontSize || '18px',
            fontStyle: this.props.fontStyle || 'bold',
            cursor:'pointer',
            background:'none',
            borderRadius:'10px',
            fontFamily: this.props.fontFamily || 'Marmelad',
            textDecoration:'none',
            color: this.props.color || 'rgb(9, 84, 61)',
            backgroundColor: this.state.currentColor
        }
    }





    /********************
    *      RENDER       *
    ********************/

    render() {
        return (
            <button ref={(button)=>{this.btn = button}}
                    style={this.getButtonStyles()}
                    onMouseEnter={this.handleHover.bind(this)}
                    onMouseLeave={this.handleUnhover.bind(this)}
                    onClick={this.handleClick.bind(this)}>

                {this.props.children}

            </button>
        )
    }


    /********************
    *      BUTTONS      *
    ********************/

    handleHover() {
        this.setState({ 
            currentColor: this.state.hoverColor
        })
    }

    handleUnhover() {
        this.setState({ 
            currentColor: this.state.normalColor
        })
    }


    handleClick() {
        if(this.props.click) {
            this.props.click();
        }
    }

}

export default RoundRectButton;