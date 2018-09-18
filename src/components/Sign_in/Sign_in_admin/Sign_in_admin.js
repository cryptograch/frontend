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

class SignInAdmin extends Component {
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
        this.props.login(this.state, 'admin');
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
            <div className={styleSignInRider.signInBackground}>
                {this.renderError()}
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
                        <input className={styleSignInRider.signInInput} type="text" placeholder="Your email adress" onChange={(e) => { this.setState({ userName: e.target.value }) }} />
                        <Link to="/forgot-password" className={styleSignInRider.forgotPass}><span>Forgot your password ?</span></Link>
                        <input className={styleSignInRider.signInInput} type="password" placeholder="Your password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
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
