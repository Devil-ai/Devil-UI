import React, { Component } from 'react';
import logo from '../assets/images/logo.png';
import settings from '../assets/images/settings.png';
import closeButton from '../assets/images/close.png';
import { Input, Container, Row, Col, Form } from 'reactstrap';
import './Grid.css';
import GifHandler from './GifHandler';
import Chat from './Chat';
import getResponce from '../API/DialogFlowAPI';
// import Speech from '../API/watsonSpeech';
import store from "../Store"
import PropTypes from "prop-types";
const { exec } = window.require('child_process');


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
    const state = store.getState();
    if (state.status === 'listening') {
      // exec("python2.7 ./scripts/stt.py", function (error, stdout, stderr) {
      //   // console.log(error, stdout, stderr);
      //   getResponce(stdout, store);
      //   store.dispatch({
      //     origin: "CHAT",
      //     type: "USER",
      //     data: {
      //       isFinal: true,
      //       isUser: true,
      //       text: stdout,
      //     }
      //   });
      //   store.dispatch({
      //     origin: "GRID",
      //     type: "CURRSTATE",
      //     status: "sleeping"
      //   });
      // });

    }
  }

  changestate() {
    if (store.getState().status === "listening") {
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
    const text = store.getState().GRIDUSERINPUT;
    event.preventDefault();
    // this.chat = {
    //   isFinal: true,
    //   isUser: true,
    //   text: text
    // }

    store.dispatch({
      origin: "GRID",
      type: "GRIDUSERINPUT",
      GRIDUSERINPUT: "",
    });
    getResponce(text, store);
  }
  render() {
    const state = store.getState();

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
              <Chat status={state.status} store={store} />
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
Grid.contextTypes = {
  store: PropTypes.object
};
export default Grid;
