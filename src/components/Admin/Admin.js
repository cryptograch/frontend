import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Admin.css';
import profilestyle from "../Profile/Profile.css";
import profilemainstyle from '../Profile/ProfileMain/ProfileMain.css';

import Header from '../Header/Header';
import AdminUserList from './AdminUserList/AdminUserList';
import AdminRefundList from './AdminRefundList/AdminRefundList';
import AdminComissionTool from './AdminComissionTool/AdminComissionTool';
import mainImg from '../../assets/home.png';
import usersImg from '../../assets/users.svg';
import messageImg from '../../assets/message.svg';
import percentImg from '../../assets/percent.svg';

import { connect } from 'react-redux';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 'main',
        }
    }
    componentDidMount() {
        if (!this.props.userData.user) {
            this.props.history.replace('/profile');
        }
    }
    componentDidUpdate() {
        if (!this.props.userData.user) {
            this.props.history.replace('/profile');
        }
    }
    renderMain() {
        switch (this.state.show) {
            case 'main': return <Main />;
            case 'userlist': return <AdminUserList />;
            case 'refundlist': return <AdminRefundList />;
            case 'comission': return <AdminComissionTool />;
            default: return null;
        }
    }
    renderComissionTool() {
        const rootid = '1eb67299-3eea-400e-a72c-0ef7c1e3246d';
        if (this.props.userData.user.id === rootid) {
            return <div className={`${profilestyle.profileToolItem}`} onClick={() => { this.setState({ show: 'comission' }) }}><img src={percentImg} /><div><strong>Manage commission</strong></div></div>
        }
        return null;
    }
    render() {
        if (this.props.userData.user) {
            if (this.props.userData.user.role === 'admin') {
                return (
                    <div>
                        <Header></Header>
                        <div className={`${profilestyle.profileContainer}`}>
                            <div className={`${profilestyle.profileToolbar}`}>
                                <div className={`${style.profileToolbarMain} ${style.Toolbarfixed}`}>
                                    <div className={`${profilestyle.profileToolItem}`} onClick={() => { this.setState({ show: 'main' }) }}><img src={mainImg} /><div><strong>Main</strong></div></div>
                                    <div className={`${profilestyle.profileToolItem}`} onClick={() => { this.setState({ show: 'userlist' }) }}><img src={usersImg} /><div><strong>Manage users</strong></div></div>
                                    <div className={`${profilestyle.profileToolItem}`} onClick={() => { this.setState({ show: 'refundlist' }) }}><img src={messageImg} /><div><strong>Manage requests</strong></div></div>
                                    {this.renderComissionTool()}
                                </div>
                            </div>
                            {this.renderMain()}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        <Header></Header>
                        <div className={`${profilestyle.profileContainer}`}>
                            <div className={`${style.youAdmin}`}>
                                You are not admin
                            </div>
                        </div>
                    </div>
                );
            }
        }
        return null;
    }
}

const Main = (props) => {
    return <div className={`${profilestyle.profileMain}`}>
        <h3 className={profilemainstyle.heading}>Admin panel</h3>
        <div className={profilestyle.contentList}>
            <h3>Welcome. You are admin and you have some possibilities which not contain another users.</h3>
            <p>You can manage users: see his profile, approve licenses and write responses.</p>
            <p>You can resolve requests: see request message, user profile, trip history</p>
        </div>
    </div>;
}

// Check props type
Profile.propTypes = {
    history: PropTypes.object,
    userData: PropTypes.object,
}

const mapStateToProps = state => ({
    history: state.historyData.history,
    userData: state.userData,
})

const mapDispatchtoProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchtoProps)(Profile);
