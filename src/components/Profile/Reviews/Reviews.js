import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { fetchDriverProfile } from '../../../actions/driverprofileaction';

class Reviews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            driverid: '',
        }
    }
    submit() {
        console.log('Submit');
        this.props.fetchDriverProfile(this.state.driverId);
    }
    componentDidUpdate() {
        if (this.props.driverData.profile) {
            console.log(this.props.driverData.profile);
        }
    }
    render() {
        return (
            <div>
                <div>
                    <input type='text' placeholder="driverID" onChange={(e) => { this.setState({ driverId: e.target.value }) }} />
                    <button onClick={this.submit.bind(this)}>SUBMIT</button>
                </div>
                <h1>Your reviews</h1>

                <ul>
                    <li>a</li>
                    <li>b</li>
                    <li>c</li>
                    <li>d</li>
                </ul>

            </div>
        )
    }
}

Reviews.propTypes = {
    driverData: PropTypes.object,
    fetchDriverProfile: PropTypes.func,
}

const mapStateToProps = state => ({
    driverData: state.driverData
});

const mapDispatchtoProps = dispatch => ({
    fetchDriverProfile: (id) => { dispatch(fetchDriverProfile(id)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(Reviews);