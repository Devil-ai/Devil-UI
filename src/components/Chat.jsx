import React, { Component } from 'react';
// import anim from '../assets/images/1.gif';
import './Grid.css';
// import { Container, Row, Col } from 'reactstrap';

class Chat extends Component {
    constructor() {
        super();
        this.updateScroll = this.updateScroll.bind(this);
        this.state = {
            status: "sleeping"
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ status: nextProps.status });
        this.updateScroll();
    }

    updateScroll() {
        var element = document.getElementsByClassName("chatarea");
        element.scrollTop = element.scrollHeight;
    }
    render() {
        return (
            <div class="chatarea">
                <div class="system">
                    <strong>Devil: </strong>
                    Aur be gandu
                </div>
                <div class="user">
                    <strong>Utkarsh: </strong>
                    Muh me lega?
                </div>
                {/* <div class="system">
                    <strong>Devil: </strong>
                    Noi Noi Noi Noi Noi noi noi noi noi noi
                </div>
                <div class="user">
                    <strong>Utkarsh: </strong>
                    HAHAHAHAHAHAHAHAHAH
                </div>
                <div class="user">
                    <strong>Utkarsh: </strong>
                    Devil chutiya hai
                </div>
                <div class="system">
                    <strong>Devil: </strong>
                    Sorry
                    </div>
                <div class="user">
                    <strong>Utkarsh: </strong>
                    Devil chutiya hai
                </div>
                <div class="system">
                    <strong>Devil: </strong>
                    Noi Noi Noi Noi Noi noi noi noi noi noi
                </div>
                <div class="user">
                    <strong>Utkarsh: </strong>
                    HAHAHAHAHAHAHAHAHAH
                </div> */}
            </div>
        );
    }
}
export default Chat;
