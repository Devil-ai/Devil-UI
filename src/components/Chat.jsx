import React, { Component } from 'react';
// import anim from '../assets/images/1.gif';
import './Grid.css';
// import { Container, Jumbotron } from 'reactstrap';

class Chat extends Component {
    // constructor() {
    //     super();
    //      this.state = {
    //          status : "sleeping"
    //      }
    // }
    //    componentWillReceiveProps(nextProps){
    //        this.setState({status: nextProps.status});
    //    }
    render() {
        // let gif;
        // <img src={anim} alt="devil" id={"anim"} /><
        // console.log(this.state.status);
        return (
            <div class="chatarea">
                <h1 >This will house conversations</h1>
                <p>This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
                <h1 >This will house conversations</h1>
                <p>This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
                <h1 >This will house conversations</h1>
                <p>This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
            </div>
        );
    }
}
export default Chat;