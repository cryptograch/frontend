import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom';
import styleSignIn from '../Sign_in/Sign_in.css';
import styleSignInRider from '../Sign_in/Sign_in_rider/Sign_in_rider.css';
import styleHome from '../Home/Home.css';
import styleHeader from '../Header/Header.css';
import style from './ForgotPassword.css';

import Alert from '../Alert/Alert';
import Loading from '../Loading/Loading';

import { connect } from 'react-redux';

import { sendResetLetter, clearError, clearSuccess } from '../../actions/resetaction';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        }
    }
    submit() {
        this.props.sendResetLetter(this.state.email);
    }
    renderAlert() {
        if (this.props.resetData.sendload) {
            return <Loading global={true} />
        }
        if (this.props.resetData.sendsuccess) {
            return <Alert global={true} success={this.props.resetData.sendsuccess} click={this.props.clearSuccess} />
        }
        if (this.props.resetData.senderror) {
            return <Alert global={true} error={this.props.resetData.senderror} click={this.props.clearError} />
        }
        return null;
    }
    render() {
        return (
            <div className={styleSignInRider.signInBackground}>
                {this.renderAlert()}
                <div className={styleSignInRider.orangeBackground + ' ' + style.orangeBackground}></div>
                <div className={styleHeader.logo}>
                    <Link to="/home" className={styleHeader.headerLogo__a + ' ' + styleSignInRider.signInLogo}><button className={styleHeader.homeBtn}>
                        <h1 className={styleSignInRider.headerLogo__h1}><span className={styleHeader.yellow_span}>Taxi</span><span className={styleHeader.toggle_span}>Coin</span></h1>
                    </button></Link>
                </div>
                <div className={styleSignInRider.signInInner}>
                    <h1 className={styleSignIn.title__h1 + ' ' + styleSignInRider.signInTitle}>Forgot <span className={styleHome.yellow_span}>your</span> password</h1>
                    <span>We will send you an email with instructions on how to reset your password</span>
                    <form onSubmit={(e) => { e.preventDefault() }}>
                        <input className={styleSignInRider.signInInput} type="email" placeholder="Your email adress" onChange={(e) => { this.setState({ email: e.target.value }) }} />
                        <input className={styleSignInRider.signInInput + ' ' + styleSignInRider.signInInputSubmit} type="submit" value="Submit" onClick={this.submit.bind(this)} />
                    </form>
                </div>
            </div>
        );
    }
}

ForgotPassword.propTypes = {
    resetData: PropTypes.object,
    sendResetLetter: PropTypes.func,
    clearError: PropTypes.func,
    clearSuccess: PropTypes.func
}

const mapStateToProps = (state) => ({
    resetData: state.resetData
});

const mapDispatchToProps = (dispatch) => ({
    sendResetLetter: (email) => { dispatch(sendResetLetter(email)) },
    clearError: () => { dispatch(clearError()) },
    clearSuccess: () => { dispatch(clearSuccess()) }
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
