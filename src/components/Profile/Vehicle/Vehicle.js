import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Vehicle.css';
import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import defaultphoto from '../../../assets/default-vehicle.png'

import { connect } from 'react-redux';

import { getVehicle, getVehPhoto } from '../../../actions/vehiclesaction';
import { clearErrors } from '../../../actions/authaction';

class Vehicle extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (!this.props.vehData.veh) {
            this.props.getVehicle();
        }
    }
    renderPhoto() {
        if (this.props.vehData.url) {
            return <img src={this.props.vehData.url} alt='photo' />;
        }
        if (this.props.vehData.loadphoto) {
            return <Loading />
        }
        if (this.props.vehData.errorphoto) {
            return <Alert local={true} message='Photo don`t load' click={this.props.getVehPhoto} />
        }
        return <img src={defaultphoto} alt='photo' />;
    }
    render() {
        if (this.props.vehData.veh) {
            return (
                <div className={style.main}>
                    <h1 className={style.heading}>YOUR CAR</h1>
                    <div className={style.container}>
                        <div className={style.containerPhoto}>
                            <div className={style.vehPhoto}>
                                {this.renderPhoto()}
                            </div>
                        </div>
                        <div className={style.containerInfo}>
                            <h3>Number: {this.props.vehData.veh.number}</h3>
                            <h3>Model: {this.props.vehData.veh.model}</h3>
                            <h3>Brand: {this.props.vehData.veh.brand}</h3>
                            <h3>Color: {this.props.vehData.veh.color}</h3>
                        </div>
                    </div>
                </div>
            );
        }
        if (this.props.vehData.errorveh) {
            return (
                <div className="container">
                    {/* <Alert global={true} error={this.props.vehData.errorveh} click={this.props.clearErrors} /> */}
                    <Alert local={true} message='Data don`t load' click={this.props.getVehicle} />
                </div>
            );
        }
        return null;
    }
}

// Check props type
Vehicle.propTypes = {
    vehData: PropTypes.object,
    getVehicle: PropTypes.func,
    clearErrors: PropTypes.func,
}

const mapStateToProps = state => ({
    vehData: state.vehData
})

const mapDispatchtoProps = dispatch => ({
    getVehicle: () => { dispatch(getVehicle()) },
    getVehPhoto: () => { dispatch(getVehPhoto()) },
    clearErrors: () => { dispatch(clearErrors()) },
})

export default connect(mapStateToProps, mapDispatchtoProps)(Vehicle);
