import React, { Component } from 'react';
import './Grid.css';
import PropTypes from "prop-types";


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
        const { user, system } = nextProps.store.getState();
        if (user !== {}) {
            if (user.isUser === true) {
                if (user.isFinal === true && user.text !== "") {
                    this.chat.push(user);
                    this.chat.push(this.dummyData);
                } else {
                    this.chat[this.chat.length - 1] = user;
                }
            }
        }
        if (system !== {}) {
            if (system.isUser === false) {
                this.chat.push(system);
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
        let count = 0;
        this.store = this.props.store;
        for (const element of this.chat) {
            if (typeof (element) !== "undefined") {
                if (element.isUser === true) {
                    if (element.isFinal === true) {
                        chatItems.push(<div className="user" key={++count}>
                            <strong>Utkarsh: </strong>
                            {element.text}
                        </div >);
                    } else {
                        this.chat[this.chat.length - 1].text = element.text;
                    }
                } else if (element.isUser === false) {
                    chatItems.push(<div className="system" key={++count}>
                        <strong>Devil: </strong>
                        {element.text}
                    </div >);
                }
            }
        }
        return (
            <div className="chatarea">
                {chatItems}
            </div>
        );
    }
}

Chat.contextTypes = {
    store: PropTypes.object
};
export default Chat;
