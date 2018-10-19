import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom';
import styleSignInRide from '../../Sign_in/Sign_in_rider/Sign_in_rider.css';
import styleSignIn from '../../Sign_in/Sign_in.css';
import styleHome from '../../Home/Home.css';
import styleHeader from '../../Header/Header.css';
import style from './Sign_up_rider.css';
import Alert from '../../Alert/Alert';
import Loading from '../../Loading/Loading';

import { connect } from 'react-redux';

import { registerUser, clearErrors } from '../../../actions/authaction';

import ValidationModel from '../../../validation';

class SignUpRider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            phoneNumber: null,
            password: null,
            firstName: null,
            lastName: null,
            privateKey: null,
            errors: {},
            model: new ValidationModel()
        }
    }
    componentDidMount() {
        if (this.props.userData.user) {
            this.props.history.replace('/profile');
        }
        this.state.model.setModel({
            email: {
                name: 'Email',
                type: 'email',
            },
            phoneNumber: {
                name: 'Phone Number',
                type: 'phonenumber'
            },
            password: {
                name: 'Password',
                type: 'password'
            },
            firstName: {
                name: 'First Name'
            },
            lastName: {
                name: 'Last Name'
            },
            privateKey: {
                name: 'Private Key',
                type: 'key'
            }
        })

    }
    componentDidUpdate() {
        if (this.props.userData.user) {
            this.props.history.replace('/profile');
        }
    }
    submit() {
        const { model } = this.state;
        const data = {
            email: this.state.email,
            password: this.state.password,
            lastName: this.state.lastName,
            firstName: this.state.firstName,
            privateKey: this.state.privateKey,
            phoneNumber: this.state.phoneNumber
        }
        model.validate(data);
        if (model.isError()) {
            this.setState({ errors: model.getErrors() });
        } else {
            this.setState({ errors: {} });
            this.props.register(data);
        }
    }
    renderLoading() {
        if (this.props.registerData.loading) {
            return <Loading global={true} />
        }
        return null;
    }
    renderError() {
        if (this.props.registerData.error) {
            return <Alert global={true} error={this.props.registerData.error} click={this.props.clearErrors} />
        }
        if (this.props.registerData.success) {
            return <Alert global={true} success={this.props.registerData.success} click={this.props.clearErrors} />
        }
        return null;
    }
    render() {
        return (
            <div>
                {this.renderLoading()}
                {this.renderError()}
                <div className={styleSignInRide.signInBackground}>
                    <div className={styleSignInRide.orangeBackground + ' ' + style.orangeBackground}></div>
                    <div className={styleHeader.logo}>
                        <Link to="/home" className={styleHeader.headerLogo__a + ' ' + styleSignInRide.signInLogo}><button className={styleHeader.homeBtn}>
                            <h1 className={styleSignInRide.headerLogo__h1}><span className={styleHeader.yellow_span}>Taxi</span><span className={styleHeader.toggle_span}>Coin</span></h1>
                        </button></Link>
                    </div>
                    <div className={styleSignInRide.signInInner}>
                        <h1 className={styleSignIn.title__h1 + ' ' + styleSignInRide.signInTitle}>Sign <span className={styleHome.yellow_span}>Up</span> as rider</h1>
                        <form onSubmit={(e) => { e.preventDefault() }}>
                            <div className={style.flexInput + ' ' + style.marginBot}>
                                <div className={style.width50}>
                                    <span className={styleSignInRide.inputSpan}>First name (required)</span>
                                    <input
                                        className={`${styleSignInRide.signInInput} ${(this.state.errors.firstName) ? styleSignInRide.inputalert : ''}`}
                                        type="text" name="firstname" placeholder="First name"
                                        onChange={(e) => { this.setState({ firstName: e.target.value }) }} />
                                    <span className={`${styleSignInRide.inputSpan} ${styleSignInRide.alertspan}`}>{this.state.errors.firstName}</span>
                                </div>
                                <div className={style.width50}>
                                    <span className={styleSignInRide.inputSpan}>Last name (required)</span>
                                    <input
                                        className={`${styleSignInRide.signInInput} ${(this.state.errors.lastName) ? styleSignInRide.inputalert : ''}`}
                                        type="text" name="lastname" placeholder="Last name"
                                        onChange={(e) => { this.setState({ lastName: e.target.value }) }} />
                                    <span className={`${styleSignInRide.inputSpan} ${styleSignInRide.alertspan}`}>{this.state.errors.lastName}</span>
                                </div>
                            </div>
                            <div className={style.marginBot}>
                                <span className={styleSignInRide.inputSpan}>Enter your phone number (required)</span>
                                <input
                                    className={`${styleSignInRide.signInInput} ${(this.state.errors.phoneNumber) ? styleSignInRide.inputalert : ''}`}
                                    type="phone" placeholder="Phone number"
                                    onChange={(e) => { this.setState({ phoneNumber: e.target.value }) }} />
                                <span className={`${styleSignInRide.inputSpan} ${styleSignInRide.alertspan}`}>{this.state.errors.phoneNumber}</span>
                            </div>
                            <div className={style.marginBot}>
                                <span className={styleSignInRide.inputSpan}>Enter your email (required)</span>
                                <input
                                    className={`${styleSignInRide.signInInput} ${(this.state.errors.email) ? styleSignInRide.inputalert : ''}`}
                                    placeholder="Email adress"
                                    onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                <span className={`${styleSignInRide.inputSpan} ${styleSignInRide.alertspan}`}>{this.state.errors.email}</span>
                            </div>
                            <div className={style.marginBot}>
                                <span className={styleSignInRide.inputSpan}>Enter a password (required)</span>
                                <input
                                    className={`${styleSignInRide.signInInput} ${(this.state.errors.password) ? styleSignInRide.inputalert : ''}`}
                                    type="password" placeholder="Password"
                                    onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                <span className={`${styleSignInRide.inputSpan} ${styleSignInRide.alertspan}`}>{this.state.errors.password}</span>
                            </div>
                            <div className={style.marginBot}>
                                <span className={styleSignInRide.inputSpan}>Enter your Private Key (required)</span>
                                <input
                                    className={`${styleSignInRide.signInInput} ${(this.state.errors.privateKey) ? styleSignInRide.inputalert : ''}`}
                                    type="text" placeholder="Private Key"
                                    onChange={(e) => { this.setState({ privateKey: e.target.value }) }} />
                                <span className={`${styleSignInRide.inputSpan} ${styleSignInRide.alertspan}`}>{this.state.errors.privateKey}</span>
                            </div>
                            <input className={styleSignInRide.signInInput + ' ' + styleSignInRide.signInInputSubmit} type="submit" value="Sign Up" onClick={this.submit.bind(this)} />
                            <p className={style.policy}>
                                By proceeding, I agree that Uber or its representatives may contact me by email, phone, or SMS (including by automatic telephone dialing system) at
                               the email address or number I provide, including for marketing purposes. I have read and understand the relevant <Link to="/policy">Privacy Policy</Link>.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

SignUpRider.propTypes = {
    userData: PropTypes.object,
    register: PropTypes.func,
    history: PropTypes.object,
    clearErrors: PropTypes.func,
    registerData: PropTypes.object,
}

const mapStateToProps = state => ({
    userData: state.userData,
    registerData: state.registerData,
    history: state.historyData.history
});

const mapDispatchtoProps = dispatch => ({
    register: (data) => { dispatch(registerUser('customer', data)) },
    clearErrors: () => { dispatch(clearErrors()) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(SignUpRider);
