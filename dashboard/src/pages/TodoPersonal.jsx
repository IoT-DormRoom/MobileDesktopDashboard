import React from 'react';
import * as firebase from 'firebase';
import Alertify from 'alertify.js';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import Page from '../components/General/Page.jsx';
import ToDoCell from '../components/ToDo/ToDoCell.jsx';

class TodoPersonal extends Page {
    
    /*******************
    *  INITIALIZATION  *
    ********************/

    constructor() {
        super();
        this.state = {
            todos: [],
            todoIDs: []
        }
    }

    componentDidMount() {
        const currentUser = this.props.rStore.getState().currentUser;
        if(currentUser === null) {
            this.props.sidebar.navigateTo('account');
            return;
        }

        this.loadPersonalTodos();
    }


    componentWillUnmount() {
        const currentUser = this.props.rStore.getState().currentUser;
        if(currentUser !== null) {
            firebase.database().ref().child('TodoPersonal').off();
        }
    }


    /********************
    *      STYLES       *
    ********************/

    contentAreaStyles() {
        return {
            position:'absolute',
            width:'100%',
            height:'100%',
            overflow: 'scroll',
            backgroundColor:'rgb(234, 211, 119)'
        }
    }

    toDoListStyles() {
        return {
            width:'100%',
            height:'100%',
            margin:'auto',
            textAlign:'center',
            paddingTop:'10px'
        }
    }
    toDoListTextStyle(textColor = 'white') {
        return {
            color: textColor,
            fontSize:'22px',
            lineHeight:'80px',
            fontFamily:'Marmelad'
        }
    }
    toDoCellUploaderNameStyles() {
        return {
            position: 'relative',
            top: '5px',
            right: '0px',
            color:'white',
            textAlign:'center'
        }
    }
    checkButtonStyles() {
        return {
            position: 'absolute',
            right: '70px',
            width: '30px',
            height: '30px',
            color: 'white',
            border: 'none',
            outline: 'none',
            marginTop: '25px',
            lineHeight: '80px',
            borderRadius: '25px',
            textDecoration: 'none',
            backgroundColor: 'white'
        }
    }



    /********************
    *      RENDER      *
    ********************/

    render() {
        return (
            <div style={this.contentAreaStyles()} onMouseDown={()=>{ super.userDidClickPage(); }}>
                <h1 style={super.getTitleStyles()}>To Do - Personal</h1>


                <div style={this.toDoListStyles()}>
                    {/* The first one is a button to add a new todo item. */}
                    <ToDoCell click={this.uploadNewTodo.bind(this)}> 
                        <h1 style={this.toDoListTextStyle('rgba(0,0,0,0.3)')}>+</h1> 
                    </ToDoCell>
                    
                    {/* The rest are the todos that are loaded from the database. */}
                    {this.state.todos}
                </div>


                {this.props.children}
            </div>
        );
    }


    /********************
    *      METHODS      *
    ********************/

    /** Uploads a new todo item to the database. */
    uploadNewTodo() {
        const store = this.props.rStore.getState();

        if(store.currentUser !== null) {
            Alertify.defaultValue('').prompt('Enter your to-do item below', (val, en) => {
                en.preventDefault();

                if(val !== '') {
                    // Save to firebase
                    var ref = firebase.database().ref().child('TodoPersonal').push();

                    ref.set({
                        'id':ref.key,
                        'content':val,
                        'uploader':store.currentUser.uid,
                        'timestamp':Date.now(),

                    }).catch( (err) => {
                        Alertify.error('There was a problem saving your todo item to the todo list.');
                        return
                    }).then( () => {
                        Alertify.success('Added "' + val + '" to the shared ToDo list!');
                        return
                    });
                }

            }, (en) => {
                en.preventDefault();
                return;
            });
        }
    }



    /** Loads all the todos that are shared between us. */
    loadPersonalTodos() {
        const currentUser = this.props.rStore.getState().currentUser;
        if(currentUser === null) { return; }

        firebase.database().ref().child('TodoPersonal').orderByChild('uploader').equalTo(currentUser.uid).on('child_added', this.observeEvent.bind(this));
    }



    /** Handles completing a todo and removing it from the database. */
    completeTodo(id) {
        var newTodos = [];
        var newIDs = [];

        for(var i = 0; i < this.state.todoIDs.length; i++) {
            if(this.state.todoIDs[i] !== id) {
                newTodos.push(this.state.todos[i]);
                newIDs.push(this.state.todoIDs[i]);
            }
        }

        this.setState({
            todos: newTodos,
            todoIDs: newIDs
        });
        
        firebase.database().ref().child('TodoPersonal').child(id).remove();
        Alertify.success('Completed todo!');
    }







    observeEvent(snap) {
        var todo = snap.val();

        const tooltip = (
            <Tooltip id="tooltip">Click to complete todo</Tooltip>
        );

        // Create the cell
        const cell = <ToDoCell key={todo.id}>
            <OverlayTrigger placement="bottom" overlay={tooltip}>
                <button onClick={()=>{this.completeTodo(todo.id)}}
                        style={this.checkButtonStyles()}>
                        <span style={{position:'relative',top:'-25px',color:'lightgray'}} className='fa fa-check'></span>
                </button>
            </OverlayTrigger>
            
            <h1 style={this.toDoListTextStyle()}>{todo.content}</h1>
        </ToDoCell>

        this.setState({ 
            todos: this.state.todos.concat([cell]),
            todoIDs: this.state.todoIDs.concat([todo.id])
        });
    }


}

export default TodoPersonal;
