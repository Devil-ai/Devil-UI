import React, { Component } from 'react';
import anim from '../assets/images/1.gif';
// import './Grid.css';

class GifHandler extends Component {
    constructor() {
     super();
     this.state = {
         status : "sleeping"
     }
   }
   componentWillReceiveProps(nextProps){
       this.setState({status: nextProps.status});
   }
   render(){
    // let gif;
    // <img src={anim} alt="devil" id={"anim"} /><
    console.log(this.state.status);
    return <img src={anim} alt="devil" id={"anim"} />;
   }
}
export default GifHandler;