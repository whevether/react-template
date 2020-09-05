import React, { useState } from 'react';
import PropTypes from 'prop-types';
import addressJson from 'assets/index_2019__level_5.json';
import { Menu } from 'antd-mobile';
import classNames from 'classnames';
const Address = (props) => {
  const [address, setAddress] = useState('长沙');
  const [show, setShow] = useState(false);
  const handleChannelAddress = (value) => {
    // let label = '';
    let label = '';
    addressJson.forEach((dataItem) => {
      if (dataItem.value === value[0]) {
        label = dataItem.label;
        if (dataItem.children && value[1]) {
          dataItem.children.forEach((cItem) => {
            if (cItem.value === value[1]) {
              label = ` ${cItem.label}`;
            }
          });
        }
      }
    });
    if (label != '' && label != undefined) {
      setAddress(label);
      setShow(false);
    }
  };
  const handleMenu = () => {
    setShow(!show);
  };
  const arrowClass = classNames({
    'arrow-down': show,
    'arrow-up': !show
  });
  return (
    <div className={'menu-active'}>
      <div className="menu" onClick={handleMenu}>
        <span style={props?.color}>{address}</span>
        <img src="assets/resource/home/down.svg" className={arrowClass}/>
      </div>
      {show ? <Menu
        className="foo-menu"
        data={addressJson}
        value={['430000000000', '430100000000']}
        onChange={handleChannelAddress}
        height={'auto'}
      /> : null}
    </div>
  );
};
Address.propTypes = {
  show: PropTypes.bool,
  address: PropTypes.string,
  color: PropTypes.object
};
export default Address;