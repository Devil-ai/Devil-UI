import React, { Component } from 'react';
import Grid from './components/Grid'
import PropTypes from "prop-types";

class App extends Component {
  render() {
    return (
      <div id="App">
       <Grid />
      </div>
    );
  }
}
App.contextTypes = {
  store: PropTypes.object
};
export default App;
