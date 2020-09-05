import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
const Item = TabBar.Item;
const Footer = (props) => {
  const [sel, setSel] = useState('home');
  // 路由跳转
  const handleNavRoute = (route,name) => {
    props.history.push(route);
    setSel({
      sel: name
    });
  };
  return (
    <div style={{ position: 'fixed', height: 'auto', width: '100%', bottom: 0 }}>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={props?.state?.common?.hidden}
        noRenderContent={true}
      >
        <Item
          title="首页"
          key="home"
          icon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url(assets/resource/home.svg) center center /  21px 21px no-repeat'
          }}
          />
          }
          selectedIcon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url(assets/resource/home.svg) center center /  21px 21px no-repeat'
          }}
          />
          }
          selected={sel === 'home'}
          onPress={() => {
            handleNavRoute('/','home');
          }}
          data-seed="logId"
        />
        <Item
          icon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
            }}
            />
          }
          selectedIcon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
            }}
            />
          }
          title="资讯"
          key="hot"
          badge={'hot'}
          selected={sel === 'hot'}
          onPress={() => {
            handleNavRoute('/home','hot');
          }}
          data-seed="logId1"
        />
        <Item
          icon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
            }}
            />
          }
          selectedIcon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
            }}
            />
          }
          title="直播"
          key="video"
          dot
          selected={sel === 'video'}
          onPress={() => {
            handleNavRoute('/video','video');
          }}
        />
        <Item
          icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
          selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
          title="我的"
          key="my"
          selected={sel === 'my'}
          onPress={() => {
            setSel({ sel: 'my' });
          }}
        />
      </TabBar>
    </div>
  );
};
Footer.propTypes = {
  sel: PropTypes.string,
  state: PropTypes.object,
  hidden: PropTypes.bool,
  history: PropTypes.object
};
export default Footer;