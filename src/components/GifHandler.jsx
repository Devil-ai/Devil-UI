import React, { Component } from 'react';
import rain from '../assets/gifs/rain.gif';
import sending from '../assets/gifs/sending.gif';
import processing from '../assets/gifs/processing.gif';
import listening from '../assets/gifs/listening.gif';
import dripping from '../assets/gifs/dripping.gif';


// import './Grid.css';
class GifHandler extends Component {
    constructor() {
        super();
        this.state = {
            status: "sleeping"
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ status: nextProps.status });
    }
    render() {
        let gif;
        switch (this.state.status) {
            case "processing":
                gif = <img src={processing} alt="devil" id={"anim"} />;
                break;
            case "listening":
                gif = <img src={listening} alt="devil" id={"anim"} />;
                break;
            case "sending":
                gif = <img src={sending} alt="devil" id={"anim"} />;
                break;
            default:
                gif = <img src={rain} alt="devil" id={"anim"} />;
        }
        // <img src={anim} alt="devil" id={"anim"} /><
        return gif;
    }
}
export default GifHandler;