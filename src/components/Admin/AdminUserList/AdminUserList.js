import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../Admin.css';
import profilemainstyle from '../../Profile/ProfileMain/ProfileMain.css'
import profilestyle from '../../Profile/Profile.css';

import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';
import LazyLoad from '../../LazyLoad/LazyLoad';
import AdminUserItem from '../AdminUserItem/AdminUserItem';

import { connect } from 'react-redux';
import { getUserList, changeClearError, userListClear } from '../../../actions/adminaction';


class AdminUserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        }
    }
    componentDidMount() {
        // this.props.getUserList();
    }
    componentDidUpdate() {
    }
    renderList(list) {
        return list.map((item, index) => {
            return <div className={profilestyle.contentListItem} key={index}><AdminUserItem data={item} /></div>
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

    searchInList() {
        if (this.state.search) {
            this.props.clearlist();
            this.props.getUserList(this.state.search);
        } else {
            this.props.clearlist();
            this.props.getUserList();
        }
    }
    renderLazyLoad() {
        if (!this.props.listData.all) {
            return <LazyLoad loading={this.props.listData.loading} do={() => { this.props.getUserList(this.state.search) }} />
        }
    }
    render() {
        /* if (this.props.listData.loading) {
            return <Loading />
        } */
        if (this.props.listData.error) {
            return <Alert local={true} message={`Data don't load (${this.props.listData.error})`} click={this.getList} />
        }
        if (this.props.listData.list) {
            return (
                <div className={`${profilestyle.profileMain}`}>
                    <div>
                        {this.renderAlert()}
                        <h3 className={profilemainstyle.heading}>Users List</h3>
                        {/* <button onClick={() => { this.state.page++; this.props.getUserList(this.state.page, this.state.size) }}>Get More Users</button> */}
                        <div className={style.searchContainer}>
                            <input className={style.searchInput}
                                type="text"
                                value={this.state.search}
                                placeholder="Search by email"
                                onChange={(e) => { this.setState({ search: e.target.value }) }}
                            />
                            <button className={style.searchButton} onClick={this.searchInList.bind(this)}>Search</button>
                        </div>
                        <div className={profilestyle.contentList}>
                            {this.renderList(this.props.listData.list)}
                        </div>
                        {this.renderLazyLoad()}
                    </div>
                </div>);
        }
        return null;
    }
}

// Check props type
AdminUserList.propTypes = {
    listData: PropTypes.object,
    getUserList: PropTypes.func,
    changeData: PropTypes.object,
    changeClearError: PropTypes.func,
    clearlist: PropTypes.func
}

const mapStateToProps = state => ({
    listData: state.userlistData,
    changeData: state.adminChangeData
})

const mapDispatchtoProps = dispatch => ({
    getUserList: (page, size, search, option) => { dispatch(getUserList(page, size, search, option)) },
    changeClearError: () => { dispatch(changeClearError()) },
    clearlist: () => { dispatch(userListClear()) }
})

export default connect(mapStateToProps, mapDispatchtoProps)(AdminUserList);
