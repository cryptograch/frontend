import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Statistic.css';
import resstyle from '../ResponseList/ResponseList.css';
import stylemain from '../ProfileMain/ProfileMain.css';
import profilestyle from '../Profile.css';
import refreshsvg from '../../../assets/refresh.svg';
import Alert from '../../Alert/Alert';
import LazyLoad from '../../LazyLoad/LazyLoad';
import StatisticItem from './StatisticItem';

import { connect } from 'react-redux';

import { getStatistic, statClear } from '../../../actions/stataction';

class Statistic extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        // if (!this.props.statData.stat) {
            this.props.getStatistic();
        //}
    }
    refresh() {
        this.props.statClear();
        this.props.getStatistic();
    }
    renderList() {
        return this.props.statData.stat.map((item, key) => {
            return <StatisticItem trip={item} key={key}/>;
        });
    }
    renderLazyLoad() {
        if(!this.props.statData.all) {
            return <LazyLoad loading={this.props.statData.loading} do={() => {this.props.getStatistic()}}/>
        }
        return null;
    }
    render() {
        /* if (this.props.statData.loading) {
            return <Loading />
        } */
        if (this.props.statData.error) {
            return <Alert local={true} message='Data dont load' click={() => { this.props.getStatistic() }} />
        }
        if (this.props.statData.stat) {
            return (
                <div className={stylemain.main}>
                    <div className={resstyle.resHeading}>
                        <h1>STATISTIC</h1>
                        <div className={resstyle.refreshContainer}>
                            <div className={profilestyle.refreshBtn} onClick={this.refresh.bind(this)}>
                                <img src={refreshsvg} alt='refresh' />
                            </div>
                        </div>
                    </div>
                    <div className={resstyle.resListMain}>
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
Statistic.propTypes = {
    statData: PropTypes.object,
    getStatistic: PropTypes.func,
}

const mapStateToProps = state => ({
    statData: state.statData,
});

const mapDispatchtoProps = dispatch => ({
    getStatistic: () => { dispatch(getStatistic()) },
    statClear: () => { dispatch(statClear())}
});

export default connect(mapStateToProps, mapDispatchtoProps)(Statistic);
