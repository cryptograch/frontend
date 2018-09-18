import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Settings.css';
// import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';
import ChangeProfile from './ChangeProfile/ChangeProfile';
import ChangeDoc from './ChangeDoc/ChangeDoc';
import ChangeVeh from './ChangeVeh/ChangeVeh';

import { connect } from 'react-redux';

import { clearErrors } from '../../../actions/authaction';
import { clearSuccess } from '../../../actions/chengeaction';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show : 'ch-prof',
        }
    }
    renderUpdateInfo() {
        if (this.props.changedData.success) {
            return (
                <Alert global={true} success={this.props.changedData.success} click={this.props.clearSuccess} />
            );
        }
        if (this.props.changedData.error) {
            return (
                <Alert global={true} error={this.props.changedData.error} click={this.props.clearErrors}/>
            );
        }
        return null;
    }
    renderMain() {
        switch (this.state.show) {
            case 'ch-prof': return <ChangeProfile />;
            case 'adddoc': return <ChangeDoc />;
            case 'addvehicle': return <ChangeVeh />;
            default: return null;
        }
    }
    renderDocSettings() {
        if (this.props.userData.user.role === 'driver') {
            return (
                <div className={this.state.show === 'adddoc' ? `${style.active} + ${style.SettingsToolItem}` : `${style.SettingsToolItem}`} onClick={() => { this.setState({ show: 'adddoc' }) }}><strong>Add documents</strong></div>
            );
        }
    }
    renderVehSettings() {
        if (this.props.userData.user.role === 'driver') {
            return (
                <div className={this.state.show === 'addvehicle' ? `${style.active} + ${style.SettingsToolItem}` : `${style.SettingsToolItem}`} onClick={() => { this.setState({ show: 'addvehicle' }) }}><strong>Add vehicle</strong></div>
            );
        }
    }
    render() {
        if (this.props.userData.user) {
            return (
                <div>
                    <div className={`${style.SettingsToolbar}`}>
                        <div className={this.state.show === 'ch-prof' ? `${style.active} + ${style.SettingsToolItem}` : `${style.SettingsToolItem}`} onClick={() => { this.setState({ show: 'ch-prof' }) }}><strong>Profile Changes</strong></div>
                        {this.renderDocSettings()}
                        {this.renderVehSettings()}
                    </div>
                    {this.renderUpdateInfo()}
                    {this.renderMain()}
                </div>
            );
        }
        return null;
    }
}

// Check props type
Settings.propTypes = {
    userData: PropTypes.object,
    changedData: PropTypes.object,
    clearErrors: PropTypes.func,
    clearSuccess: PropTypes.func,
}

const mapStateToProps = state => ({
    userData: state.userData,
    changedData: state.chengeddata
})

const mapDispatchtoProps = dispatch => ({
    clearErrors: () => { dispatch(clearErrors()) },
    clearSuccess: () => { dispatch(clearSuccess()) },
})

export default connect(mapStateToProps, mapDispatchtoProps)(Settings);
