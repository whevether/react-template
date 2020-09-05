import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
const NotFoundPage = () => (
  <div className="notfoud-container">
    <div className="img-404" />
    <p className="notfound-p">哎呀迷路了...</p>
    <div className="notfound-reason">
      <p>可能的原因：</p>
      <ul>
        <li>原来的页面不存在了</li>
        <li>我们的服务器被外星人劫持了</li>
      </ul>
    </div>
    <div className="notfound-btn-container">
      <Link to="/" className="notfound-btn">返回首页</Link>
    </div>
  </div>
);
// NotFoundPage.propTypes = {
//   staticContext: PropTypes.object
// };
export default NotFoundPage;