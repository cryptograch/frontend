import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Router, Route, Link, Switch } from 'react-router-dom';
// import style from './App.css';
import Home from '../Home/Home';
import Ride from '../Ride/Ride';
import Drive from '../Drive/Drive';
import SignIn from '../Sign_in/Sign_in';
import SignInRider from '../Sign_in/Sign_in_rider/Sign_in_rider';
import SignInDriver from '../Sign_in/Sign_in_driver/Sign_in_driver';
import SignInAdmin from '../Sign_in/Sign_in_admin/Sign_in_admin';
import SignUpRider from '../Sign_up/Sign_up_rider/Sign_up_rider';
import SignUpDriver from '../Sign_up/Sign_up_driver/Sign_up_driver';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import Policy from '../Policy/Policy';
import Profile from '../Profile/Profile';
import ResetPassword from '../ResetPassword/ResetPassword';
import Loading from '../Loading/Loading';
import Admin from '../Admin/Admin';
import NotFound from '../NotFound/NotFound';

import GlobalView from '../GlobalView/GlobalView';

// test connect redux to react
import { connect } from 'react-redux';
// import our actionCreator
import { testRun } from '../../actions/testaction';
import { getUser } from '../../actions/authaction';

class App extends Component {
  componentDidMount() {
    // we can call mapped actionCreator from props
    this.props.runTest('Test is passed');
    if (!this.props.userData.user && !this.props.userData.loading) {
      // this.props.history.replace('/sign-in');
      this.props.getUser();
    }
  }
  renderLoading() {
    if (this.props.userData.loading || this.props.changeData.loading) {
      return (<Loading global={true} />)
    }
    return null;
  }
  render() {
    // if redux connect and data mapped we can use it in props
    // react reload component when props is changed
    if (this.props.testData) {
      // console.log(this.props.testData.message);
    }
    return (
      <Router history={this.props.history}>
        <div>
          {this.renderLoading()}
          <GlobalView />
          <Switch handler={App}>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/ride" component={Ride} />
            <Route exact path="/drive" component={Drive} />
            <Route exact path="/sign-in" component={SignIn} />
            <Route exact path="/sign-in-rider" component={SignInRider} />
            <Route exact path="/sign-in-driver" component={SignInDriver} />
            <Route exact path="/sign-in-admin" component={SignInAdmin} />
            <Route exact path="/sign-up-rider" component={SignUpRider} />
            <Route exact path="/sign-up-driver" component={SignUpDriver} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/policy" component={Policy} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/reset-password' component={ResetPassword} />
            <Route exact path='/admin' component={Admin} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>);
  }
}

// Check props type
App.propTypes = {
  // Check data
  // testData must be a object
  testData: PropTypes.object,
  // runTest must be a function 
  runTest: PropTypes.func,
  // history must be a object
  history: PropTypes.object,
  getDriver: PropTypes.func,
  userData: PropTypes.object,
  changeData: PropTypes.object
}

// Func which map State to props
const mapStateToProps = state => ({
  testData: state.testData,
  history: state.historyData.history,
  userData: state.userData,
  changeData: state.chengeddata
})

// Func which map actionCreators to props
const mapDispatchtoProps = dispatch => ({
  runTest: (mess) => { dispatch(testRun(mess)) },
  getUser: () => { dispatch(getUser()) },
})

// Finally connect react component to redux (use connect tool)
export default connect(mapStateToProps, mapDispatchtoProps)(App);
