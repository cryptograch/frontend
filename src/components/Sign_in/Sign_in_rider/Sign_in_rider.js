import React, { Component } from 'react';
import PropTypes from "prop-types";
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom';
import styleSignIn from '../Sign_in.css';
import styleHome from '../../Home/Home.css';
import styleHeader from '../../Header/Header.css';
import style from './Sign_in_rider.css';
import Alert from '../../Alert/Alert';

import { connect } from 'react-redux';

import { loginUser, clearErrors, resendLetter } from "../../../actions/authaction";

import ValidationModel from '../../../validation';

class SignInRider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            password: null,
            errors: {},
            model: new ValidationModel,
        }
    }
    componentDidMount() {
        if (this.props.userData.user) {
            this.props.history.replace('/profile');
        }
        if (this.props.userData.error) {
            this.props.clearErrors();
        }
        this.state.model.setModel({
            userName: {
                name: 'Email',
                type: 'email'
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
            userName: this.state.userName.toLowerCase(),
            password: this.state.password,
        }
        model.validate(data);
        if (model.isError()) {
            this.setState({ errors: model.getErrors() });
        } else {
            this.setState({ errors: {} });
            this.props.login(data, 'customer');
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
                    return <span className={`${style.inputSpan} ${style.alertspan}`}>{this.props.userData.error}</span>
            }
        }
        return null;
    }
    render() {
        return (
            <div className={style.signInBackground}>
                
                <div className={style.orangeBackground}></div>
                <div className={styleHeader.logo}>
                    <Link to="/home" className={styleHeader.headerLogo__a + ' ' + style.signInLogo}><button className={styleHeader.homeBtn}>
                        <h1 className={style.headerLogo__h1}><span className={styleHeader.yellow_span}>Taxi</span><span className={styleHeader.toggle_span}>Coin</span></h1>
                    </button></Link>
                </div>
                <div className={style.signInInner}>
                    <h1 className={styleSignIn.title__h1 + ' ' + style.signInTitle}>Sign <span className={styleHome.yellow_span}>In</span> as rider</h1>
                    <span className={style.inputSpan}>Enter your data</span>
                    <form onSubmit={(e) => { e.preventDefault() }}>
                        {this.renderError()}
                        <input
                            className={`${style.signInInput} ${(this.state.errors.userName) ? style.inputalert : ''}`}
                            type="email" placeholder="Your email adress"
                            onChange={(e) => { this.setState({ userName: e.target.value }) }} />
                        <span className={`${style.inputSpan} ${style.alertspan}`}>{this.state.errors.userName}</span>
                        <Link to="/forgot-password" className={style.forgotPass}><span>Forgot your password ?</span></Link>
                        <input
                            className={`${style.signInInput} ${(this.state.errors.password) ? style.inputalert : ''}`}
                            type="password" placeholder="Your password"
                            onChange={(e) => { this.setState({ password: e.target.value }) }} />
                        <span className={`${style.inputSpan} ${style.alertspan}`}>{this.state.errors.password}</span>
                        <input className={style.signInInputSubmit} type="submit" value="Submit" onClick={this.submit.bind(this)} />
                    </form>
                    <span>Don't have an account? <NavLink to="/sign-up-rider" className={style.signUpSmallBtn}>Sign up</NavLink></span>
                </div>
            </div>
        );
    }
}

SignInRider.propTypes = {
    userData: PropTypes.object,
    login: PropTypes.func,
    history: PropTypes.object,
    clearErrors: PropTypes.func,
    resendLetter: PropTypes.func
}

const mapStateToProps = state => ({
    userData: state.userData,
    history: state.historyData.history
});

const mapDispatchtoProps = dispatch => ({
    login: (data, role) => { dispatch(loginUser(data, role)) },
    clearErrors: () => { dispatch(clearErrors()) },
    resendLetter: (data) => { dispatch(resendLetter(data)) },
});

export default connect(mapStateToProps, mapDispatchtoProps)(SignInRider);
