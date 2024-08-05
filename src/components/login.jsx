import React from "react";
import {setCookie} from "utils/storage";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const Login = () => {
  let navigate = useNavigate();
  const onLogin = () =>{
    //链式异常操作
    // console.log(props?.aaa);
    setCookie("token","test","");
    navigate("/");
  };
  return (
    <>
      <h3 style={{cursor: "pointer"}} onClick={onLogin}>登入</h3>
    </>
  );
};
Login.propTypes = {
  history: PropTypes.object
};
export default Login;