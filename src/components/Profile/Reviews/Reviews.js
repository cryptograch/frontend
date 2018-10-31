import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { fetchDriverProfile } from '../../../actions/driverprofileaction';
import { openProfile } from '../../../actions/globalviewaction'

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
    renderDriverInfo() {
        if (this.props.driverData.profile) {
            const { profile } = this.props.driverData
            return(
             <div> 
                 <h2>Name : {profile.firstName}</h2>
                 <h2>phone: {profile.lastName}</h2>
                 <h2>email: {profile.email}</h2>
             </div> 
            )
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
                <button onClick = {() => {this.props.openProfile()}}>openProfile</button>

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
    fetchDriverProfile: (id) => { dispatch(fetchDriverProfile(id)) },
    openProfile: () => {dispatch(openProfile())}
});

export default connect(mapStateToProps, mapDispatchtoProps)(Reviews);