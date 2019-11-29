import React from 'react'
import ReactDOM from 'react-dom'

export default class CaptureKeyPress extends React.Component {

  constructor(props){
    super(props);
    this.keyPressFunction = this.keyPressFunction.bind(this);
  }

  keyPressFunction(event){
    if(event.keyCode === this.props.keyCode) {
      this.props.onKeyPress();
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.keyPressFunction, true);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.keyPressFunction, true);
  }

  render() {
    return null;
  }
}