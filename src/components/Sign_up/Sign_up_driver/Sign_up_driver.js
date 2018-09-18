import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom';
import styleSignInRide from '../../Sign_in/Sign_in_rider/Sign_in_rider.css';
import styleSignIn from '../../Sign_in/Sign_in.css';
import styleHome from '../../Home/Home.css';
import styleHeader from '../../Header/Header.css';
import styleSignUpRide from '../Sign_up_rider/Sign_up_rider.css';

import Alert from '../../Alert/Alert';

// connect to redux
import { connect } from 'react-redux';

// import actionCreators
import { registerDriver, clearErrors } from '../../../actions/authaction';

class SignUpDriver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            phoneNumber: null,
            password: null,
            city: null,
            firstName: null,
            lastName: null,
            privateKey: null,
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
        this.props.register(this.state);
    }
    renderError() {
        if (this.props.userData.error) {
            return <Alert global={true} error={this.props.userData.error} click={this.props.clearErrors} />
        }
        return null;
    }
    render() {
        return (
            <div>
                {this.renderError()}
                <div className={styleSignInRide.signInBackground}>
                    <div className={styleSignInRide.orangeBackground + ' ' + styleSignUpRide.orangeBackground}></div>
                    <div className={styleHeader.logo}>
                        <Link to="/home" className={styleHeader.headerLogo__a + ' ' + styleSignInRide.signInLogo}><button className={styleHeader.homeBtn}>
                            <h1 className={styleSignInRide.headerLogo__h1}><span className={styleHeader.yellow_span}>Taxi</span><span className={styleHeader.toggle_span}>Coin</span></h1>
                        </button></Link>
                    </div>
                    <div className={styleSignInRide.signInInner}>
                        <h1 className={styleSignIn.title__h1 + ' ' + styleSignInRide.signInTitle}>Sign <span className={styleHome.yellow_span}>Up</span> as driver</h1>
                        <form onSubmit={(e) => { e.preventDefault() }}>
                            <div className={styleSignUpRide.flexInput + ' ' + styleSignUpRide.marginBot}>
                                <div className={styleSignUpRide.width50}>
                                    <span className={styleSignInRide.inputSpan}>First name (required)</span>
                                    <input className={styleSignInRide.signInInput} type="text" name="firstname" placeholder="First name" onChange={(e) => { this.setState({ firstName: e.target.value }) }} />
                                </div>
                                <div className={styleSignUpRide.width50}>
                                    <span className={styleSignInRide.inputSpan}>Last name (required)</span>
                                    <input className={styleSignInRide.signInInput} type="text" name="lastname" placeholder="Last name" onChange={(e) => { this.setState({ lastName: e.target.value }) }} />
                                </div>
                            </div>
                            <div className={styleSignUpRide.marginBot}>
                                <span className={styleSignInRide.inputSpan}>Enter your phone number (required)</span>
                                <input className={styleSignInRide.signInInput} type="phone" placeholder="Phone number" onChange={(e) => { this.setState({ phoneNumber: e.target.value }) }} />
                            </div>
                            <div className={styleSignUpRide.marginBot}>
                                <span className={styleSignInRide.inputSpan}>Enter your email (required)</span>
                                <input className={styleSignInRide.signInInput} type="email" placeholder="Email adress" onChange={(e) => { this.setState({ email: e.target.value }) }} />
                            </div>
                            <div className={styleSignUpRide.marginBot}>
                                <span className={styleSignInRide.inputSpan}>Enter a password (required)</span>
                                <input className={styleSignInRide.signInInput} type="password" placeholder="Password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
                            </div>
                            <div className={styleSignUpRide.marginBot}>
                                <span className={styleSignInRide.inputSpan}>Enter your city (required)</span>
                                <input className={styleSignInRide.signInInput} type="text" placeholder="City" onChange={(e) => { this.setState({ city: e.target.value }) }} />
                            </div>
                            <div className={styleSignUpRide.marginBot}>
                                <span className={styleSignInRide.inputSpan}>Enter your privat key (required)</span>
                                <input className={styleSignInRide.signInInput} type="text" placeholder="Privat key" onChange={(e) => { this.setState({ privateKey: e.target.value }) }} />
                            </div>
                            <input className={styleSignInRide.signInInput + ' ' + styleSignInRide.signInInputSubmit} type="submit" value="Sign Up" onClick={this.submit.bind(this)} />
                            <p className={styleSignUpRide.policy}>
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

SignUpDriver.propTypes = {
    userData: PropTypes.object,
    register: PropTypes.func,
    history: PropTypes.object,
    clearErrors: PropTypes.func,
}

const mapStateToProps = state => ({
    userData: state.userData,
    history: state.historyData.history
})


const mapDispatchtoProps = dispatch => ({
    register: (data) => { dispatch(registerDriver(data)) },
    clearErrors: () => { dispatch(clearErrors()) }
})

export default connect(mapStateToProps, mapDispatchtoProps)(SignUpDriver);
