import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './ResponseList.css';
import stylemain from '../ProfileMain/ProfileMain.css';
import profilestyle from '../Profile.css';
import refreshsvg from '../../../assets/refresh.svg';
import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';
import LazyLoad from '../../LazyLoad/LazyLoad';

import { connect } from 'react-redux';

import { getResponseList, resClear } from '../../../actions/reslistaction';

class ResponseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        // if (!this.props.statData.stat) {
        this.props.getResponseList();
        //}
    }
    refresh() {
        this.props.resClear();
        this.props.getResponseList();
    }
    renderList() {
        return this.props.listData.ress.map((item, key) => {
            return (
                <div key={key} className={style.resItem}>
                    <div className={style.resItemInfo}>
                        <div className={style.resItemInfoEmail}>{item.email}</div>
                        <div className={style.resItemInfoTime}>{this.renderTime(item.creationTime)}</div>
                    </div>
                    <div className={style.resItemContainer}>
                        <div className={style.resItemMessage}>{item.message}</div>
                    </div>
                </div>);
        });
    }
    renderLazyLoad() {
        if (!this.props.listData.all) {
            return <LazyLoad loading={this.props.listData.loading} do={() => { this.props.getResponseList() }} />
        }
        return null;
    }
    renderTime(timestring) {
        const currtime = new Date();
        const time = new Date(timestring);
        let diff = currtime.getTime() - time.getTime()
        const days = diff / (24 * 60 * 60 * 1000);
        diff %= (24 * 60 * 60 * 1000);
        const hours = diff / (60 * 60 * 1000);
        diff %= (60 * 60 * 1000);
        const minutes = diff / (60 * 1000);
        diff %= (60 * 1000);
        const seconds = diff / 1000;
        if (days > 6) {
            return time.toDateString();
        }
        if (days - days % 1 > 0) {
            return `${days - days % 1} day(s) ago`;
        }
        if (hours - hours % 1 < 24) {
            return `${hours - hours % 1} hour(s) ago`;
        }
        if (minutes - minutes % 1 < 60) {
            return `${minutes - minutes % 1} minute(s) ago`;
        }
        if (seconds - seconds % 1 < 60) {
            return `${seconds - seconds % 1} second(s) ago`;
        }
        return null;
    }
    render() {
        if (this.props.listData.error) {
            return <Alert local={true} message='Data don`t load' click={() => { this.props.getResponseList() }} />
        }
        if (this.props.listData.ress) {
            return (
                <div className={stylemain.main}>
                    <div className={style.resHeading}>
                        <h1>RESPONSES</h1>
                        <div className={style.refreshContainer}>
                            <div className={profilestyle.refreshBtn} onClick={this.refresh.bind(this)}>
                                <img src={refreshsvg} alt='refresh' />
                            </div>
                        </div>
                    </div>
                    <div className={style.resListMain}>
                        {this.renderList()}
                        {this.renderLazyLoad()}
                    </div>
                </div>
            );
        }
        return null;
    }
}

// Check props type
ResponseList.propTypes = {
    listData: PropTypes.object,
    getStatistic: PropTypes.func,
}

const mapStateToProps = state => ({
    listData: state.reslistData,
})

const mapDispatchtoProps = dispatch => ({
    getResponseList: () => { dispatch(getResponseList()) },
    resClear: () => { dispatch(resClear()) }
})

export default connect(mapStateToProps, mapDispatchtoProps)(ResponseList);
