import React,{Component} from 'react';
import { Helmet } from 'react-helmet';
class Keep extends Component{
  static getDerivedStateFromProps(nextProps, prevState) {
    /*eslint-disable no-console*/
    console.log(nextProps);
    console.log(prevState);
    // Called after a component is instantiated or before it receives new props.
    // Return an object to update state in response to prop changes.
    // Return null to indicate no change to state.
  }
  constructor(props){
    super(props);
  }
  // static getSnapshotBeforeUpdate(nextProps,prevState){
  //   console.log(nextProps);
  //   console.log(prevState);
  // }
  head(){
    return(
      <Helmet>
      <title>测试v16.3新api</title>
      <meta property="og:title" content="新api" />
    </Helmet>
    );
  }
  render(){
    return(
      <>
        {this.head()}
        <span>新api</span>
      </>
    );
  }
}
export default Keep;