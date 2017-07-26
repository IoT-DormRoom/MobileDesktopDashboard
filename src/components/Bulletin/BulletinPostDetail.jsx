import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import * as firebase from 'firebase';

import RoundRectButton from '../Buttons/RoundRectButton.jsx';

class BulletinPostDetail extends Component {

    /*******************
    *  INITIALIZATION  *
    ********************/

    constructor() {
        super();
        this.state = {
            uploaderName: '',
            uploadDateString: '',
            content: <div></div>,
            type: 'message',
            id: '',
            title: ''
        }
    }

    componentDidMount() {
        
    }


    /********************
    *      STYLES       *
    *********************/

    getContentStyles() {
        return {
            width: '100%',
            height: '100%'
        }
    }
    getTextAreaStyles() {
        return {
            resize:'none',
            outline:'none',
            textDecoration:'none'
        }
    }



    /********************
    *      RENDER       *
    *********************/

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} aria-labelledby="contained-modal-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm" style={{textAlign:'center',fontFamily:'Marmelad'}}>
                        {this.state.title}
                    </Modal.Title>
                </Modal.Header>


                <Modal.Body style={{textAlign:'center'}}>
                    <h4>Uploaded By: {this.state.uploaderName}</h4>
                    <h4>Date: {this.state.uploadDateString}</h4>
                    <br/><br/><br/>
                    {this.state.content}

                    <br/><br/><br/>
                    <RoundRectButton ref={(RoundRectButton)=>{this.deleteBtn = RoundRectButton}}
                                    width='100px' height='40px' color='white'
                                    normalColor='rgb(206, 33, 33)'
                                    hoverColor='rgb(153, 16, 16)'
                                    click={this.handleDelete.bind(this)}>
                        Delete
                    </RoundRectButton>
                </Modal.Body>


                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        );
    }





    /********************
    *      METHODS      *
    *********************/

    setTitle(a) {
        this.setState({ title: a });
    }
    setUploaderName(a) {
        this.setState({
            uploaderName: a
        });
    }
    formatDate(a) {
        var timePostedAgo = new Date( a );

        var day = timePostedAgo.getDay();
        var dayString = this.dayNumberToString(day);
        var date = timePostedAgo.getDate();
        var month = timePostedAgo.getMonth();
        var monthString = this.monthNumberToString(month);
        var year = timePostedAgo.getFullYear();
        var hours = timePostedAgo.getHours() - 12;
        var minutes = "0" + timePostedAgo.getMinutes();
        var amOrPm = "";
        
        if(timePostedAgo.getHours() > 12) {
            amOrPm = "pm";
        } else {
            amOrPm = "am";
        }

        var formattedTime = dayString + ', ' + monthString + ' ' + date + ', ' + year + ', ' + hours + ':' + minutes.substr(-2) + amOrPm;
        this.setState({ uploadDateString: formattedTime });
    }
    setContent(a) {
        this.setState({ content: a }, () => {
            this.configureContent();
        });
    }
    setType(a) {
        this.setState({ type: a });
    }
    setID(a) {
        this.setState({ id: a });
    }



    handleDelete() {
        firebase.database().ref().child('Bulletin').child(this.state.id).remove();
        window.location.reload();
    }


    configureContent() {
        var cont = null;

        if(this.state.type === 'photo') {
            cont = <div style={this.getContentStyles()}>
                <img src={this.state.content} alt="preview" width='100%' height='100%'/>
            </div>

            this.setState({ content: cont });
        }
        else if(this.state.type === 'link') {
            cont = <div style={this.getContentStyles()}>
                <button onClick={()=>{ window.location = ''+this.state.content }}>{this.state.content}</button>
                <br/><br/>
                <iframe src={"" + this.state.content} frameBorder="0" style={{width:'100%', height:'100%'}}/>
            </div>

            this.setState({ content: cont });
        }
        else {
            cont = <div style={this.getContentStyles()}>
                <textarea style={this.getTextAreaStyles()} value={this.state.content} cols="55" rows="10" readOnly></textarea>
            </div>

            this.setState({ content: cont });
        }
    }

    dayNumberToString(a) {
        switch(a) {
            case 0: return 'Sunday'
            case 1: return 'Monday'
            case 2: return 'Tuesday'
            case 3: return 'Wednesday'
            case 4: return 'Thursday'
            case 5: return 'Friday'
            case 6: return 'Saturday'
            default: return 'Monday'
        }
    }

    monthNumberToString(a) {
        switch(a) {
            case 0: return 'January'
            case 1: return 'February'
            case 2: return 'March'
            case 3: return 'April'
            case 4: return 'May'
            case 5: return 'June'
            case 6: return 'July'
            case 7: return 'August'
            case 8: return 'September'
            case 9: return 'October'
            case 10: return 'November'
            case 11: return 'December'
            default: return 'January'
        }
    }
}

export default BulletinPostDetail;