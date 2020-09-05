import React, {/*Fragment*/ } from 'react';
import { Helmet } from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Address from './address/index';
import * as fetchAction from 'store/actions/fetch';
import { Carousel, SearchBar, Toast } from 'antd-mobile';
// import { List } from 'antd-mobile';   //测试代码
/* eslint-disable react/no-multi-comp */
const Home = (props) => {
    //  这是一个使用redux 封装axios中间件请求示例
    const head = () => {
        return (
            <Helmet>
                <title>首页</title>
                <meta property="og:title" content="首页" />
            </Helmet>
        );
    };
    // 选择搜索地址会调
    const handleAddressChange = (value) => {
        Toast.info('选择区域'+value);
    };
    // 搜索内容
    const handleSearchSubmit = (value) => {
        Toast.info('搜索:'+value);
    };
    const handleQrcode = (e) => {
        e.stopPropagation();
        console.log(props);
        Toast.success('扫码');
    };
    const countData = ['assets/resource/home/slide.png','assets/resource/home/slide.png','assets/resource/home/slide.png'];
    return (
        <>
            {head()}
            <div className="home-header">
                <Address color={{ color: '#fff' }} menuClass="menu-active" onChange={handleAddressChange} />
                <SearchBar placeholder="智慧小镇" maxLength={50} onSubmit={handleSearchSubmit} className="search"/>
                <span className="qrcode" onClick={handleQrcode}/>
            </div>
            <div className="home-content">
                <div className="slider">
                    <Carousel
                        autoplay={true}
                        infinite
                        dotStyle={{'backgroundColor':'#fff', 'margin': '0px,15px'}}
                    >
                        {countData.map(val => (
                            <a
                                key={val}
                                target="_blank"
                                href="https://www.keep-wan.me"
                                style={{ display: 'inline-block', width: '100%', height: 'auto' }}
                            >
                                <img
                                    src={val}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                    }}
                                />
                            </a>
                        ))}
                    </Carousel>
                </div>
            </div>
        </>
    );
};
Home.propTypes = {
    fetchPublicKey: PropTypes.func.isRequired,
    data: PropTypes.objectOf(Array)
};
const mapStateToProps = (state) => {
    return {
        data: state.common.data
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(fetchAction, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);