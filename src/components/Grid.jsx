import React, { Component } from 'react';
import logo from '../assets/images/logo.png';
import settings from '../assets/images/settings.png';
import closeButton from '../assets/images/close.png';
import { Input, Container, Row, Col, Form } from 'reactstrap';
import './Grid.css';
import GifHandler from './GifHandler';
import Chat from './Chat';
import getResponce from '../API/DialogFlowAPI';
import store from "../Store"
const process = window.require('process');
const windowRemote = window.require('electron');

class Grid extends Component {
  constructor() {
    super();

    this.closeMe = this.closeMe.bind(this);
    this.changestate = this.changestate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.win = windowRemote.remote.getCurrentWindow();

    process.env.GOOGLE_APPLICATION_CREDENTIALS = './devil-36d63-5166a7175387.json';

    this.chat = {};
    this.system = {};

    this.win.on('blur', () => {
      // this.setState({ status: "sleeping" });
      store.dispatch({
        origin: "GRID",
        type: "CURRSTATE",
        status: "sleeping"
      });
      this.win.hide();
    });
    this.win.on('focus', () => {
      // this.setState({ status: "listening" });
      store.dispatch({
        origin: "GRID",
        type: "CURRSTATE",
        status: "listening"
      });
    });

  }

  componentDidUpdate() {
    this.chat = {}
  }

  changestate() {
    if (this.state.status === "listening") {
      // this.setState({ status: "sleeping" });
      store.dispatch({
        origin: "GRID",
        type: "CURRSTATE",
        status: "sleeping"
      });
    }
    else {
      // this.setState({ status: "listening" });
      store.dispatch({
        origin: "GRID",
        type: "CURRSTATE",
        status: "listening"
      });
    }
  }

  closeMe(e) {
    this.win.hide();
  }

  handleChange(event) {
    this.chat = {
      isFinal: false,
      isUser: true,
      text: event.target.value
    }
    // this.setState({ value: event.target.value });
    store.dispatch({
      origin: "GRID",
      type: "GRIDUSERINPUT",
      GRIDUSERINPUT: event.target.value,
    })
  }

  handleSubmit(event) {
    console.log(event.target.value);
    event.preventDefault();
    this.chat = {
      isFinal: true,
      isUser: true,
      text: event.target.value
    }
    getResponce.getResponce(event.target.value);
    store.dispatch({
      origin: "GRID",
      type: "GRIDUSERINPUT",
      GRIDUSERINPUT: "",
    })
  }
  render() {
    const state = store.getState();
    if (state.status === 'listening') {
      getResponce.streamingMicDetectIntent();
      // getResponce.getResponce("turn on wi-fi");
    }
    return (
      <div id="App">
        <Container id={"APP"}>
          <Row>
            <Col><br /><img src={logo} alt="devil" id={"anim"} height={100} width={100} /> </Col>
          </Row>
          <Row>
            <Col><h2 id="logo-text">Devil.ai</h2></Col>
          </Row>
          <Row>
            <Col>
              <Chat status={state.status} user={this.chat} system={this.system} />
              {/* <Button onClick={this.changestate} >lol</Button> */}
            </Col>
          </Row>
          <Row>
            <Col><GifHandler status={state.status} /></Col>
          </Row>
        </Container>
        <Form onSubmit={this.handleSubmit}>
          <Input id={"inputarea"} value={state.GRIDUSERINPUT} onChange={this.handleChange} placeholder="Speak or type here" />
        </Form>
        <img src={settings} alt="settings" id={"settingsButton"} height={22} width={22} />
        <img src={closeButton} alt="close" id={"closeButton"} height={22} width={22} onClick={this.closeMe} />
      </div >
    );
  }
}

export default Grid;
