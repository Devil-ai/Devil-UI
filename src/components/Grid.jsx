import React, { Component } from 'react';
import logo from '../assets/images/logo.png';
import settings from '../assets/images/settings.png';
import closeButton from '../assets/images/close.png';
import { Input, Container, Row, Col, Form } from 'reactstrap';
import './Grid.css';
import GifHandler from './GifHandler';
import Chat from './Chat';
import getResponce from '../API/DialogFlowAPI';
const process = window.require('process');
const windowRemote = window.require('electron');

const projectId = 'devil-36d63';
const sessionId = 'AIzaSyBiJcs0FYCHTc5C95L29lfVuOWgE1GPqVg';
const languageCode = 'en-US';

class Grid extends Component {
  constructor() {
    super();

    this.closeMe = this.closeMe.bind(this);
    this.changestate = this.changestate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getResponce = this.getResponce.bind(this);

    this.win = windowRemote.remote.getCurrentWindow();

    process.env.GOOGLE_APPLICATION_CREDENTIALS = './devil-36d63-5166a7175387.json';

    this.chat = {};
    this.system = {};
    this.win.on('blur', () => {
      this.setState({ status: "sleeping" });
      this.win.hide();
    });
    this.win.on('focus', () => {
      this.setState({ status: "listening" });
    });

    this.state = {
      status: "sleeping",
      value: '',
    }
  }
  getResponce(query) {
    const dialogflow = window.require('dialogflow');
    const sessionClient = new dialogflow.SessionsClient();
    // Define session path
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: languageCode,
        },
      },
    };

    sessionClient
      .detectIntent(request)
      .then(responses => {
        console.log('Detected intent');
        const result = responses[0].queryResult;
        console.log(result.fulfillmentMessages[0].text.text[0]);
        this.system = {
          isUser: false,
          isFinal: true,
          text: result.fulfillmentMessages[0].text.text[0],
        }
        this.setState({value: " "});
        this.system = {};
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  }
  componentDidUpdate() {
    this.chat = {}
  }
  changestate() {
    if (this.state.status === "listening") {
      this.setState({ status: "sleeping" });
    }
    else {
      this.setState({ status: "listening" });
    }
  }
  closeMe(e) {
    console.log("boobs");
    this.win.hide();
  }
  handleChange(event) {
    this.chat = {
      isFinal: false,
      isUser: true,
      text: this.state.value
    }
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    // console.log(this.state.value);
    this.chat = {
      isFinal: true,
      isUser: true,
      text: this.state.value
    }
    event.preventDefault();
    this.getResponce(this.state.value);
    this.setState({ value: "" });
  }
  render() {
    if (this.state.status === 'listening') {
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
              <Chat status={this.state.status} user={this.chat} system={this.system} />
              {/* <Button onClick={this.changestate} >lol</Button> */}
            </Col>
          </Row>
          <Row>
            <Col><GifHandler status={this.state.status} /></Col>
          </Row>
        </Container>
        <Form onSubmit={this.handleSubmit}>
          <Input id={"inputarea"} value={this.state.value} onChange={this.handleChange} placeholder="Speak or type here" />
        </Form>
        <img src={settings} alt="settings" id={"settingsButton"} height={22} width={22} />
        <img src={closeButton} alt="close" id={"closeButton"} height={22} width={22} onClick= {this.closeMe} />
      </div >
    );
  }
}

export default Grid;
