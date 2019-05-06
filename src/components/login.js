import React from 'react';
import {setCookie} from 'utils/storage';
import PropTypes from 'prop-types';
const Login = (props) => {
  const onLogin = () =>{
    setCookie('token','test','');
    props.history.push('/');
  };
  return (
    <>
      <h3 style={{cursor: 'pointer'}} onClick={onLogin}>登入</h3>
    </>
  );
};
Login.propTypes = {
  history: PropTypes.object.isRequired
};
export default Login;