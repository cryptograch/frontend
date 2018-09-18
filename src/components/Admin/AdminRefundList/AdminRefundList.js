import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../Admin.css';
import profilemainstyle from '../../Profile/ProfileMain/ProfileMain.css'
import profilestyle from '../../Profile/Profile.css';
import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';
import LazyLoad from '../../LazyLoad/LazyLoad';
import AdminRefundItem from '../AdminRefundItem/AdminRefundItem';

import refreshsvg from '../../../assets/refresh.svg';

import { connect } from 'react-redux';
import { getRefundList, changeClearError, refundListClear } from '../../../actions/adminaction';


class AdminRefundList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issolved: false,
        }
    }
    componentDidMount() {
        // this.props.getRefundList(this.state.issolved);
    }
    componentDidUpdate() {
    }
    renderList(list) {
        return list.map((item, index) => {
            return (
                <div className={profilestyle.contentListItem} key={index}>
                    <AdminRefundItem data={item} />
                </div>
            );
        });
    }
    renderAlert() {
        if (this.props.changeData.loading) {
            return <Loading global={true} />
        }
        if (this.props.changeData.error) {
            return <Alert global={true} error={this.props.changeData.error} click={this.props.changeClearError} />
        }
        if (this.props.changeData.success) {
            return <Alert global={true} success={this.props.changeData.success} click={this.props.changeClearError} />
        }
        return null;
    }
    refresh() {
        this.props.clearlist();
        this.props.getRefundList(this.state.issolved);
    }
    /* searchInList() {
        if (this.state.search) {
            this.props.clearlist();
            this.props.getUserList(this.state.search);
        } else {
            this.props.clearlist();
            this.props.getUserList();
        }
    } */
    renderLazyLoad() {
        if (!this.props.listData.all) {
            return <LazyLoad loading={this.props.listData.loading} do={() => { this.props.getRefundList(this.state.issolved) }} />
        }
        return null;
    }
    render() {
        /* if (this.props.listData.loading) {
            return <Loading />
        } */
        if (this.props.listData.error) {
            return <Alert local={true} message={`Data dont load (${this.props.listData.error})`} click={() => { this.props.getRefundList(this.state.issolved) }} />
        }
        if (this.props.listData.list) {
            return (
                <div className={`${profilestyle.profileMain}`}>
                    {this.renderAlert()}
                    <h3 className={profilemainstyle.heading}>Refunds List</h3>
                    <div className={style.searchContainer}>
                        <div className={style.checkboxContainer}>
                            <input type="checkbox" value={this.state.issolved} onClick={(e) => { this.setState({ issolved: e.target.checked }) }} />
                            <label>Only solved</label>
                        </div>
                        <div className={profilestyle.refreshBtn} onClick={this.refresh.bind(this)}>
                            <img src={refreshsvg} alt='refresh'/>
                        </div>
                    </div>
                    <div className={profilestyle.contentList}>
                        {this.renderList(this.props.listData.list)}
                    </div>
                </div>);
        }
        return null;
    }
}

// Check props type
AdminRefundList.propTypes = {
    listData: PropTypes.object,
    getRefundList: PropTypes.func,
    changeData: PropTypes.object,
    changeClearError: PropTypes.func,
    clearlist: PropTypes.func
}

const mapStateToProps = state => ({
    listData: state.refundlistData,
    changeData: state.adminChangeData
})

const mapDispatchtoProps = dispatch => ({
    getRefundList: (issolved) => { dispatch(getRefundList(issolved)) },
    changeClearError: () => { dispatch(changeClearError()) },
    clearlist: () => { dispatch(refundListClear()) }
})

export default connect(mapStateToProps, mapDispatchtoProps)(AdminRefundList);
