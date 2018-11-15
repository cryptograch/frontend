import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Vehicle.css';
import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import defaultphoto from '../../../assets/default-vehicle.png'

import { connect } from 'react-redux';

import { getVehicle, getVehPhoto } from '../../../actions/vehiclesaction';
import { clearErrors } from '../../../actions/authaction';
import { openImage } from '../../../actions/globalviewaction';

import { getPhoto } from '../../../actions/photoaction';

class Vehicle extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (!this.props.vehData.veh) {
            this.props.getVehicle();
        }
    }
    renderPhotos() {
        const { veh } = this.props.vehData;
        if (veh && veh.pictures && Array.isArray(veh.pictures)) {
            return veh.pictures.map((id, key) => {
                return (
                    <div key={key} className={style.vehPhoto}>
                        {this.renderPhoto(id, key)}
                    </div>
                );
            });
        }
    }

    renderPhoto(id) {
        const { photosData, getPhoto } = this.props;
        if (photosData[id]) {
            const { loading, url, error } = photosData[id];
            if (url) {
                return <img src={url} alt='photo' onClick={() => { this.props.openImage(url) }} />;
            }
            if (loading) {
                return <Loading />
            }
            if (error) {
                return <Alert local={true} message='Photo don`t load' click={() => { getPhoto(id) }} />
            }
            return <img src={defaultphoto} alt='photo' onClick={() => { this.props.openImage(defaultphoto) }} />;
        }
        return <img src={defaultphoto} alt='photo' onClick={() => { this.props.openImage(defaultphoto) }} />;
    }
    render() {
        if (this.props.vehData.veh) {
            return (
                <div className={style.main}>
                    <h1 className={style.heading}>YOUR CAR</h1>
                    <div className={style.container}>
                        <div className={style.containerPhoto}>
                            {this.renderPhotos()}
                        </div>
                        <div className={style.containerInfo}>
                            <h3><span>Number:</span> {this.props.vehData.veh.number}</h3>
                            <h3><span>Model:</span> {this.props.vehData.veh.model}</h3>
                            <h3><span>Brand:</span> {this.props.vehData.veh.brand}</h3>
                            <h3><span>Color:</span> {this.props.vehData.veh.color}</h3>
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
    openImage: PropTypes.func,
    photosData: PropTypes.object,
    getPhoto: PropTypes.func
}

const mapStateToProps = state => ({
    vehData: state.vehData,
    photosData: state.photosData,
})

const mapDispatchtoProps = dispatch => ({
    getVehicle: () => { dispatch(getVehicle()) },
    getPhoto: (id) => { dispatch(getPhoto(id)) },
    clearErrors: () => { dispatch(clearErrors()) },
    openImage: (url) => { dispatch(openImage(url)) }
})

export default connect(mapStateToProps, mapDispatchtoProps)(Vehicle);
