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

class SignInRider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            password: null
        }
    }
    componentDidMount() {
        if (this.props.userData.user) {
            this.props.history.replace('/profile');
        }
    }
    componentDidUpdate() {
        if (this.props.userData.user) {
            this.props.history.replace('/profile');
        }
    }
    submit() {
        this.props.login(this.state, 'customer');
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
                    return <Alert global={true} error={this.props.userData.error} click={this.props.clearErrors} />;
            }
        }
        return null;
    }
    render() {
        return (
            <div className={style.signInBackground}>
                {this.renderError()}
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
                        <input className={style.signInInput} type="email" placeholder="Your email adress" onChange={(e) => { this.setState({ userName: e.target.value }) }} />
                        <Link to="/forgot-password" className={style.forgotPass}><span>Forgot your password ?</span></Link>
                        <input className={style.signInInput} type="password" placeholder="Your password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
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
