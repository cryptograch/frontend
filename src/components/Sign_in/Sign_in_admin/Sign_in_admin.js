import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom';
import styleSignIn from '../Sign_in.css';
import styleHome from '../../Home/Home.css';
import styleHeader from '../../Header/Header.css';
import styleSignInRider from '../Sign_in_rider/Sign_in_rider.css';

import Alert from '../../Alert/Alert';

import { connect } from 'react-redux';
import { loginUser, clearErrors, resendLetter } from '../../../actions/authaction';

import ValidationModel from '../../../validation';

class SignInAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            password: null,
            errors: {},
            model: new ValidationModel()
        }
    }
    componentDidMount() {
        if (this.props.userData.user) {
            this.props.history.replace('/profile');
        }
        this.state.model.setModel({
            userName: {
                name: 'Login',
            },
            password: {
                name: 'Password',
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
            userName: this.state.userName,
            password: this.state.password,
        }
        model.validate(data);
        if (model.isError()) {
            this.setState({ errors: model.getErrors() });
        } else {
            this.setState({ errors: {} });
            this.props.login(data, 'admin');
        }
        return false;
    }
    renderError() {
        if (this.props.userData.error) {
            switch (this.props.userData.error) {
                case 'Email not confirmed':
                    return <Alert global={true} email={this.props.userData.error} click={this.props.clearErrors} send={() => { this.props.resendLetter(this.state) }} />;
                case 'Email send':
                    return <Alert global={true} success={this.props.userData.error} click={this.props.clearErrors} />;
                default:
                    return <span className={`${styleSignInRider.inputSpan} ${styleSignInRider.alertspan}`}>{this.props.userData.error}</span>;
            }
        }
        return null;
    }
    render() {
        return (
            <div className={styleSignInRider.signInBackground}>

                <div className={styleSignInRider.orangeBackground}></div>
                <div className={styleHeader.logo}>
                    <Link to="/home" className={styleHeader.headerLogo__a + ' ' + styleSignInRider.signInLogo}><button className={styleHeader.homeBtn}>
                        <h1 className={styleSignInRider.headerLogo__h1}><span className={styleHeader.yellow_span}>Taxi</span><span className={styleHeader.toggle_span}>Coin</span></h1>
                    </button></Link>
                </div>
                <div className={styleSignInRider.signInInner}>
                    <h1 className={styleSignIn.title__h1 + ' ' + styleSignInRider.signInTitle}>Sign <span className={styleHome.yellow_span}>In</span> as admin</h1>
                    <span className={styleSignInRider.inputSpan}>Enter your data</span>
                    <form onSubmit={(e) => { e.preventDefault() }}>
                        {this.renderError()}
                        <input
                            className={`${styleSignInRider.signInInput} ${(this.state.errors.userName) ? styleSignInRider.inputalert : ''}`}
                            type="text" placeholder="Your email adress"
                            onChange={(e) => { this.setState({ userName: e.target.value }) }} />
                        <span className={`${styleSignInRider.inputSpan} ${styleSignInRider.alertspan}`}>{this.state.errors.userName}</span>
                        <Link to="/forgot-password" className={styleSignInRider.forgotPass}><span>Forgot your password ?</span></Link>
                        <input
                            className={`${styleSignInRider.signInInput} ${(this.state.errors.password) ? styleSignInRider.inputalert : ''}`}
                            type="password" placeholder="Your password"
                            onChange={(e) => { this.setState({ password: e.target.value }) }} />
                        <span className={`${styleSignInRider.inputSpan} ${styleSignInRider.alertspan}`}>{this.state.errors.password}</span>
                        <input className={styleSignInRider.signInInput + ' ' + styleSignInRider.signInInputSubmit} type="submit" value="Submit" onClick={this.submit.bind(this)} />
                    </form>
                    {/* <span>Don't have an account? <NavLink to="/sign-up-driver" className={styleSignInRider.signUpSmallBtn}>Sign up</NavLink></span> */}
                </div>
            </div>
        );
    }
}

SignInAdmin.propTypes = {
    userData: PropTypes.object,
    login: PropTypes.func,
    history: PropTypes.object,
    clearErrors: PropTypes.func,
    resendLetter: PropTypes.func
}

const mapStateToProps = state => ({
    userData: state.userData,
    history: state.historyData.history
})


const mapDispatchtoProps = dispatch => ({
    login: (data, role) => { dispatch(loginUser(data, role)) },
    clearErrors: () => { dispatch(clearErrors()) },
    resendLetter: (data) => { dispatch(resendLetter(data)) },
})

export default connect(mapStateToProps, mapDispatchtoProps)(SignInAdmin);
