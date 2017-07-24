import React, { Component } from 'react';


class ToDoCell extends Component {

    /*******************
    *  INITIALIZATION  *
    ********************/



    /*******************
    *      STYLES      *
    ********************/

    getCellStyles() {
        return {
            ...this.props.style,
            width: '90%',
            height: '80px',
            margin: 'auto',
            cursor: 'pointer',
            textAlign: 'center',
            marginBottom: '30px',
            backgroundColor: this.props.color || 'rgba(0, 0, 0, 0.1)'
        }
    }


    /*******************
    *      RENDER      *
    ********************/

    render() {
        return (
            <div onClick={this.props.click || (()=>{})} style={this.getCellStyles()}>
                {this.props.children}
            </div>
        );
    }


    /*******************
    *      METHODS     *
    ********************/




}

export default ToDoCell;