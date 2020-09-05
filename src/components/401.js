import React from 'react';
import { Link } from 'react-router-dom';
const Error401 = () => {
  return (
    <div className="notfoud-container">
      <div className="img-404" />
      <p className="notfound-p">没有权限.请确定是否有权限访问</p>
      <div className="notfound-reason">
        <p>可能的原因：</p>
        <ul>
          <li>请练习管理员确定是否有权限</li>
          <li>请同意获取用户权限</li>
        </ul>
      </div>
      <div className="notfound-btn-container">
        <Link to="/" className="notfound-btn">返回首页</Link>
      </div>
    </div>
  );
};
export default Error401;