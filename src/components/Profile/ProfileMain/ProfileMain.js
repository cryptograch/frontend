import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './ProfileMain.css';
import Alert from '../../Alert/Alert';
import Balance from '../Balance/Balance';

import { connect } from 'react-redux';
import { getUser } from '../../../actions/authaction';

class ProfileMain extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    renderProfile() {
        if (this.props.userData.user.role === 'admin') {
            return (
                <div>
                    <h3>Name: {this.props.userData.user.firstName} {this.props.userData.user.lastName}</h3>
                    <h3>Status: {this.props.userData.user.role}</h3>
                    <h3>Aprroved: {(this.props.userData.user.isApproved) ? 'Yes' : 'No'}</h3>
                </div>
            )
        }
        if (this.props.userData.user.role === 'driver') {
            return (
                <div>
                    <h3>Email: {this.props.userData.user.email}</h3>
                    <h3>Phone: {this.props.userData.user.phoneNumber}</h3>
                    <h3>City: {this.props.userData.user.city}</h3>
                </div>
            )
        }
        if (this.props.userData.user.role === 'customer') {
            return (
                <div>
                    <h3>Email: {this.props.userData.user.email}</h3>
                    <h3>Phone: {this.props.userData.user.phoneNumber}</h3>
                </div>
            )
        }
        return null;
    }
    render() {
        if (this.props.userData.user) {
            return (
                <div className={style.main}>
                    <h1 className={style.heading}>PROFILE</h1>
                    {this.renderProfile()}
                    <Balance />
                </div>
            );
        }
        if (this.props.userData.error) {
            return <Alert local={true} message='Data dont load' click={this.props.getUser} />
        }
        return null;
    }
}

// Check props type
ProfileMain.propTypes = {
    userData: PropTypes.object
}

const mapStateToProps = state => ({
    userData: state.userData
})

const mapDispatchtoProps = dispatch => ({
    getUser: () => { dispatch(getUser()) }
})

export default connect(mapStateToProps, mapDispatchtoProps)(ProfileMain);
