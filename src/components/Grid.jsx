import React, { Component } from 'react';
import logo from '../assets/images/logo.png';
import settings from '../assets/images/settings.png';
import close from '../assets/images/close.png';
import { Input, Container, Row, Col } from 'reactstrap';
import './Grid.css';
// import mic from '../assets/images/mic.png';
import GifHandler from './GifHandler';
import Chat from './Chat';

const windowRemote = window.require('electron');

class Grid extends Component {
  constructor() {
    super();
    this.close = this.close.bind(this);

    this.win = windowRemote.remote.getCurrentWindow();
    this.win.on('blur', () => {
      this.setState({ status: "sleeping" });
      this.win.hide();
    });
    this.win.on('focus', () => {
      this.setState({ status: "listening" });
    });
    this.state = {
      status: "sleeping",
    }
  }
  close() {
    this.win.hide();
  }
  render() {
    return (
      <div id="App">
        <img src={settings} alt="settings" id={"settingsButton"} height={22} width={22} />
        <img src={close} alt="close" id={"closeButton"} height={22} width={22} onClick={() => this.close()} />
        <Container id={"APP"}>
          <Row>
            <Col><br /><img src={logo} alt="devil" id={"anim"} height={100} width={100} /> </Col>
          </Row>
          <Row>
            <Col><h2 id="logo-text">Devil.Ai</h2></Col>
          </Row>
          <Row>
            <Col>
              <Chat />
            </Col>
          </Row>
          <Row>
            <Col><GifHandler status={this.state.status} /></Col>
          </Row>
        </Container>
        <Input id={"inputarea"} placeholder="Speak or type here" />
      </div >
    );
  }
}

export default Grid;
