import React, { Component } from 'react';
import './Grid.css';

class Chat extends Component {

    constructor() {
        super();
        this.updateScroll = this.updateScroll.bind(this);
        this.state = {
            status: "sleeping",
            update: false,
        }
        this.chat = [];
        this.dummyData = {
            isFinal: false,
            isUser: true,
            text: ""
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== {}) {
            if (nextProps.user.isUser === true) {
                if (nextProps.user.isFinal === true && nextProps.user.text !== "") {
                    this.chat.push(nextProps.user);
                    this.chat.push(this.dummyData);
                } else {
                    this.chat[this.chat.length - 1] = nextProps.user;
                }
            }
        }
        if (nextProps.system !== {}) {
            if (nextProps.system.isUser === false) {
                this.chat.push(nextProps.system);
                this.chat.push(this.dummyData);
            }
        }
        this.setState({ status: nextProps.status });
    }

    componentDidUpdate() {
        this.updateScroll();
    }

    updateScroll() {
        var element = document.getElementsByClassName("chatarea");
        element.scrollTop = element.scrollHeight;
    }

    render() {
        let chatItems = [];
        for (const element of this.chat) {
            if (typeof (element) !== "undefined") {
                if (element.isUser === true) {
                    if (element.isFinal === true) {
                        chatItems.push(<div class="user" >
                            <strong>Utkarsh: </strong>
                            {element.text}
                        </div >);
                    } else {
                        this.chat[this.chat.length - 1].text = element.text;
                    }
                } else if (element.isUser === false) {
                    chatItems.push(<div class="system" >
                        <strong>Devil: </strong>
                        {element.text}
                    </div >);
                }
            }
        }
        return (
            <div class="chatarea">
                {chatItems}
            </div>
        );
    }
}
export default Chat;
