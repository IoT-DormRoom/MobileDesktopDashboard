import React from 'react';
import * as firebase from 'firebase';

import Page from '../components/General/Page.jsx';

// The colors for the buttons.
const onColor = 'rgb(123, 237, 123)'
const offColor = 'rgb(219, 92, 57)'

class Lights extends Page {

    /********************
    *  INITIALIZATION  *
    ********************/

    constructor() {
        super();
        this.state = {
            lightNames: [],
            lightValues: [],
            lightButtons: [],

            lightElements: []
        }
    }

    componentDidMount() {
        this.loadLights(() => {
            this.createLightElements();
        });
    }


    /********************
    *      STYLES       *
    ********************/

    contentAreaStyles() {
        return {
            position:'absolute',
            width:'100%',
            height:'100%',
            backgroundColor:'rgb(247, 179, 69)'
        }
    }
    getDisplayAreaStyles() {
        return {
            width: '100%',
            height: '100%',
            margin: 'auto',
            textAlign: 'center'
        }
    }
    getLightNameStyle() {
        return {
            color: 'white',
            display: 'inline-block'
        }
    }
    getToggleButtonStyles(background = onColor) {
        return {
            width: '100px',
            height: '35px',
            color: 'white',
            display: 'inline-block',
            border: 'none',
            outline: 'none',
            background: 'none',
            borderRadius: '25px',
            textDecoration: 'none',
            backgroundColor: background
        }
    }




    /*******************
    *      RENDER      *
    ********************/

    render() {
        return (
            <div style={this.contentAreaStyles()} onMouseDown={()=>{ super.userDidClickPage(); }}>
                <h1 style={super.getTitleStyles()}>Lights</h1>

                <div>
                    {this.state.lightElements}
                </div>

                {this.props.children}
            </div>
        );
    }


    /********************
    *      METHODS      *
    *********************/

    /** Loads the light values from the database. */
    loadLights(completion) {
        var names = [];
        var values = [];
        var buttons = [];

        firebase.database().ref().child('lights').once('value', (snap) => {
            snap.forEach( (light) => {
                names.push(light.key);
                values.push(light.val().on);

                var bg = onColor;
                if(light.val().on === true) { bg = onColor; }
                else { bg = offColor; }

                var btn = <button key={light.key} 
                                  onClick={() => { this.toggleLight(light.key) }} 
                                  style={this.getToggleButtonStyles(bg)}>
                                {light.val().on ? 'On' : 'Off'}
                        </button>
                buttons.push(btn);
            });

            this.setState({
                lightNames: names,
                lightValues: values,
                lightButtons: buttons
            });
            completion();
        });
    }



    /** Creates elements for each light. */
    createLightElements() {
        var elements = [];

        for(var i = 0; i < this.state.lightNames.length; i++) {
            var name = this.state.lightNames[i];
            var btn = this.state.lightButtons[i];

            var el = <div style={{textAlign:'center'}} key={i}>
                <h1 style={this.getLightNameStyle()}>{name}: </h1>
                &nbsp;&nbsp;&nbsp;&nbsp;
                {btn}
            </div>

            elements.push(el);
        }

        this.setState({ lightElements: elements });
    }



    /** Handles turning the light on or off. */
    toggleLight(name) {
        var index = this.state.lightNames.indexOf(name);
        var buttons = this.state.lightButtons;
        var elements = this.state.lightElements;
        var values = this.state.lightValues;

        // Change the light value.
        values[index] = (values[index] === true ? false : true);

        // Get the new background color.
        var bg = onColor;
        if(values[index] === true) { bg = onColor; }
        else { bg = offColor }

        // Change the button element at the location.
        buttons[index] = <button key={name} 
                                onClick={() => { this.toggleLight(name) }} 
                                style={this.getToggleButtonStyles(bg)}>
                                {values[index] ? 'On' : 'Off'}
                        </button>
        
        // Change the element at the given location.
        var el = <div style={{textAlign:'center'}} key={index}>
                    <h1 style={this.getLightNameStyle()}>{name}: </h1>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {buttons[index]}
                </div>
        elements[index] = el

        // Re-set the state.
        this.setState({
            lightButtons: buttons,
            lightElements: elements
        });

        // Resave to firebase.
        firebase.database().ref().child('lights').child(name).set({ on: values[index] });
    }


}

export default Lights;
