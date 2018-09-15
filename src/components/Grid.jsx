import React, { Component } from 'react';
import anim from '../assets/images/1.gif';
import logo from '../assets/images/logo.png';
import settings from '../assets/images/settings.png';
import close from '../assets/images/close.png';
import { Container, Row, Col } from 'reactstrap';
import './Grid.css';

const windowRemote = window.require('electron');

class Grid extends Component {
   constructor() {
    super();
    this.close = this.close.bind(this);

    this.win = windowRemote.remote.getCurrentWindow();
    this.win.on('blur',  () => {
      this.win.hide();
    });
  }
  close() {
    this.win.hide();
  }
  render() {
    return (
      <div id="App">
        <img src={settings} alt="settings" id={"settingsButton"} height={22} width={22} />
        <img src={close} alt="close" id={"closeButton"} height={22} width={22} onClick={() => this.close()} />
        <Container>
          <Row>
            <Col><br /><img src={logo} alt="devil" id={"anim"} height={100} width={100} /> </Col>
          </Row>
          <Row>
            <Col><h2 id="logo-text">Devil</h2></Col>
          </Row>
          <Row>
            <Col> <img src={anim} alt="devil" id={"anim"} /></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Grid;
