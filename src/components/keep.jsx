import React,{Component} from "react";
import {head} from 'utils/head';
class Keep extends Component{
  static getDerivedStateFromProps(nextProps, prevState) {
     
    console.log(nextProps);
    console.log(prevState);
    return null;
    // Called after a component is instantiated or before it receives new props.
    // Return an object to update state in response to prop changes.
    // Return null to indicate no change to state.
  }
  constructor(props){
    super(props);
    this.state = {
      userId: 1
    };
  }
  // static getSnapshotBeforeUpdate(nextProps,prevState){
  //   console.log(nextProps);
  //   console.log(prevState);
  // }
  render(){
    return(
      <>
        {head('测试v18.2新api')}
        <span>新api</span>
      </>
    );
  }
}
export default Keep;