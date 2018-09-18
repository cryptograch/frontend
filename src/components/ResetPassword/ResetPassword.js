import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom';
import styleSignIn from '../Sign_in/Sign_in.css';
import styleSignInRider from '../Sign_in/Sign_in_rider/Sign_in_rider.css';
import styleHome from '../Home/Home.css';
import styleHeader from '../Header/Header.css';
import styleForgot from '../ForgotPassword/ForgotPassword.css';

import Alert from '../Alert/Alert';
import Loading from '../Loading/Loading';

import { connect } from 'react-redux';
import { resetPassword, clearError, clearSuccess } from '../../actions/resetaction';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',
            confirmPassword: '',
            token: '',
        }
    }
    componentDidMount() {
        const id = qs.parse(this.props.location.search).id;
        const token = qs.parse(this.props.location.search).token;
        if (token && id) {
            this.setState({ id, token });
        } else {
            this.props.history.replace('/');
        }
    }
    submit() {
        this.props.resetPassword(this.state);
    }
    renderAlert() {
        if (this.props.resetData.resetload) {
            return <Loading global={true} />
        }
        if (this.props.resetData.resetsuccess) {
            return <Alert global={true} success={this.props.resetData.resetsuccess} click={this.props.clearSuccess} />
        }
        if (this.props.resetData.reseterror) {
            return <Alert global={true} error={this.props.resetData.reseterror} click={this.props.clearError} />
        }
        return null;
    }
    render() {
        return (
            <div className={styleSignInRider.signInBackground}>
                {this.renderAlert()}
                <div className={styleSignInRider.orangeBackground + ' ' + styleForgot.orangeBackground}></div>
                <div className={styleHeader.logo}>
                    <Link to="/home" className={styleHeader.headerLogo__a + ' ' + styleSignInRider.signInLogo}><button className={styleHeader.homeBtn}>
                        <h1 className={styleSignInRider.headerLogo__h1}><span className={styleHeader.yellow_span}>Taxi</span><span className={styleHeader.toggle_span}>Coin</span></h1>
                    </button></Link>
                </div>
                <div className={styleSignInRider.signInInner}>
                    <h1 className={styleSignIn.title__h1 + ' ' + styleSignInRider.signInTitle}>Reset <span className={styleHome.yellow_span}>your</span> password</h1>
                    <span>Please set your new password</span>
                    <form onSubmit={(e) => { e.preventDefault() }}>
                        <input className={styleSignInRider.signInInput} type="password" placeholder="New password" onClick={(e) => { this.setState({ password: e.target.value }) }} />
                        <input className={styleSignInRider.signInInput} type="password" placeholder="Confirm password" onClick={(e) => { this.setState({ confirmPassword: e.target.value }) }} />
                        <input className={styleSignInRider.signInInput + ' ' + styleSignInRider.signInInputSubmit} type="submit" value="Submit" onClick={this.submit.bind(this)} />
                    </form>
                </div>
            </div>
        );
    }
}

ResetPassword.propTypes = {
    resetData: PropTypes.object,
    resetPassword: PropTypes.func,
    clearError: PropTypes.func,
    clearSuccess: PropTypes.func,
    location: PropTypes.object,
    history: PropTypes.object,
}

const mapStateToProps = (state) => ({
    resetData: state.resetData,
    history: state.historyData.history
});

const mapDispatchToProps = (dispatch) => ({
    resetPassword: (data) => { dispatch(resetPassword(data)) },
    clearError: () => { dispatch(clearError()) },
    clearSuccess: () => { dispatch(clearSuccess()) }
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
