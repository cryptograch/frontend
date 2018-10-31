import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import  { fetchDriverProfile }  from '../../actions/driverprofileaction';
import { openProfile } from '../../actions/globalviewaction';
import Loading from '../Loading/Loading';
import Alert from '../Alert/Alert';
import defaultphoto from '../../assets/default-user.png';
import style from './DriverInfo.css';

class DriverInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            opinion: '',
        }
    }
    submit() {
        console.log('Submit');
        this.props.fetchDriverProfile(this.state.driverId); 

        
    }
    componentDidMount(){
        if (this.props.id){
            this.props.fetchDriverProfile(this.props.id); 
        }
    }
    componentDidUpdate() {
        if (this.props.driverData.profile) {
            console.log(this.props.driverData.profile);
        }
    }
    renderDriverPhoto(){
        if (this.props.driverData.photourl) {
            return <div className={style.driverInfoPhoto}><img src = {this.props.driverData.photourl}  alt='photo' /></div>
        }
        if (this.props.driverData.photoload){
            return <Loading />
        }
        if (this.props.driverData.photoerror){
            return <Alert local={true} message='Photo dont load'  />
        }
        return <img src={defaultphoto}  alt='photo' />;
    }
    renderDriverInfo() {
        if (this.props.driverData.profile) {
            const { profile } = this.props.driverData
            return(
             <div> 
                 <h2>Name : {profile.firstName} {profile.lastName}</h2>
                 <h2>phone: {profile.phoneNumber}</h2>
                 <h2>email: {profile.email}</h2>
             </div> 
            )
         }
    }

    render() {
        return (
            <div className={style.infoConteiner}>
                <div className={style.general}>
                    {this.renderDriverPhoto()}
                    {this.renderDriverInfo()}
                </div>
                <div className={style.reviews}>
                <h1>Your reviews</h1>   
                    <ul>
                        <li>a</li>
                        <li>b</li>
                        <li>c</li>
                        <li>d</li>
                        <li>a</li>
                        <li>b</li>
                        <li>c</li>
                        <li>d</li>
                        <li>a</li>
                        <li>b</li>
                        <li>c</li>
                        <li>d</li>
                    </ul>
                <h2>Wrote some shit here...</h2>    
                <div className={style.newReview}>
                    <input type='text' placeholder="very interesting opinion" onChange={(e) => { this.setState({ opinion: e.target.value }) }} />
                    <button onClick={this.submit.bind(this)}>SUBMIT</button>
                </div>
                </div>
            </div>
        )
    }
}

DriverInfo.propTypes = {
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

export default connect(mapStateToProps, mapDispatchtoProps)(DriverInfo);