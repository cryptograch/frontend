import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './AdminUserItem.css';

import AdminUserLicense from "./AdminUserLicense";
import AdminUserProfile from "./AdminUserProfile";
import AdminUserResponse from "./AdminUserResponse";

import settingsvg from '../../../assets/settings.svg';
import closesvg from '../../../assets/close.svg';

import { connect } from 'react-redux';
import { setUserToAdmin, deleteAdmin, deleteUser } from '../../../actions/adminaction';
import { rootid } from '../../../appconfig';

class AdminUserItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 'close',
            settings: false,
        }
    }
    componentDidMount() {
        // onsole.log(this.props.data);
    }
    componentDidUpdate() {
    }
    renderLicenseBtn() {
        if (this.props.data.roles.includes('driver_access')) {
            return <button className={style.settingsMainItem}
                onClick={() => { this.setState({ show: 'license' }) }}>
                Show license</button>;
        }
        return null;
    }
    /* renderProfileBtn() {
        return <button className={style.settingsMainItem}
            onClick={() => { this.setState({ show: 'profile' }) }}>
            Show profile</button>
    } */
    renderToAdminBtn() {
        if (this.props.userData.user.id === rootid && this.props.data.id !== rootid) {
            if (!this.props.data.roles.includes('admin_access')) {
                return <button className={style.settingsMainItem}
                    onClick={() => { this.props.setAdmin(this.props.data.id) }}>
                    Up to admin</button>
            } else {
                return <button className={style.settingsMainItem}
                    onClick={() => { this.props.deleteAdmin(this.props.data.ids.adminId) }}>
                    Remove from admin</button>
            }
            return null;
        }
        return null;
    }
    renderDeleteUserBtn() {
        if (!this.props.data.roles.includes('admin_access')) {
            return <button className={style.settingsMainItem}
                onClick={() => { this.props.deleteUser(this.props.data.id) }}>
                Delete user</button>
        }
        return null;
    }
    renderResponseBtn() {
        /* if (this.state.show === 'response') {
            return <button className={style.settingsMainItem}
                    onClick={() => { this.setState({ show: 'close' }) }}>
                    Close response</button>
        } */
        return <button className={style.settingsMainItem}
            onClick={() => { this.setState({ show: 'response' }) }}>
            Send response</button>
    }
    renderSettnigsBtn() {
        if (this.state.show !== 'close') {
            return (
                <div className={style.adminSettingsBtn} onClick={() => this.setState({ show: 'close' })}>
                    <img src={closesvg} alt="photo" />
                </div>
            );
        }
        return (
            <div className={style.adminSettingsBtn} onClick={() => { this.setState({ settings: (this.state.settings) ? false : true }) }}>
                <img src={settingsvg} alt="photo" />
                <div className={style.settingsContainer}>
                    {this.renderSettnigs()}
                </div>
            </div>
        );
    }
    renderShow() {
        switch (this.state.show) {
            case 'profile': return <AdminUserProfile data={this.props.data} />;
            case 'license': return <AdminUserLicense id={this.props.data.ids.driverId} roles={this.props.data.roles} />;
            case 'response': return <AdminUserResponse data={this.props.data} />;
            default: return null;
        }
    }
    renderSettnigs() {
        if (this.state.settings) {
            return (
                <div className={style.settingsMain}>
                    {this.renderLicenseBtn()}
                    {this.renderToAdminBtn()}
                    {this.renderDeleteUserBtn()}
                    {this.renderResponseBtn()}
                </div>
            );
        }
        return null;
    }
    render() {
        if (this.props.data) {
            return (
                <div className={style.adminUserContainer}>
                    <div className={style.adminUserMain}>
                        <div className={style.adminUserText}
                            onClick={() => { this.setState({ show: (this.state.show === 'close') ? 'profile' : 'close' }) }}>
                            <span>Email:</span> {this.props.data.email}
                        </div>
                        {this.renderSettnigsBtn()}
                    </div>
                    {this.renderShow()}
                </div>
            );
        }
        return null;
    }
}

// Check props type
AdminUserItem.propTypes = {
    tokenData: PropTypes.object,
    setAdmin: PropTypes.func,
    deleteAdmin: PropTypes.func,
    deleteUser: PropTypes.func,
    userData: PropTypes.object,
}

const mapStateToProps = state => ({
    tokenData: state.tokenData,
    userData: state.userData
});

const mapDispatchtoProps = dispatch => ({
    setAdmin: (id) => { dispatch(setUserToAdmin(id)) },
    deleteAdmin: (id) => { dispatch(deleteAdmin(id)) },
    deleteUser: (id) => { dispatch(deleteUser(id)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(AdminUserItem);
