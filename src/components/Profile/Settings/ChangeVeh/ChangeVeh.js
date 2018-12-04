import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../Settings.css';
import vehicledefault from '../../../../assets/default-vehicle.png';

import { connect } from 'react-redux';

import { uploadVehicle } from '../../../../actions/vehiclesaction';


class ChangeVeh extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehphoto: null,
            vehphotourl: null,
            urls: [],
            number: "",
            model: "",
            brand: "",
            color: "",
            fileName: "Choose file",
        }
        this.chooseVehPhoto = this.chooseVehPhoto.bind(this);
    }
    chooseVehPhoto(e) {
        const files = e.target.files;
        if (files) {
            let urls = [];
            [...files].forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    urls = [...urls, reader.result];
                    this.setState({ urls });
                };
                reader.readAsDataURL(file);
            });
           
            this.setState({ vehphoto: [...files],
                            vehphotourl: urls[0],
                            fileName: files[0].name,
                            urls
                         });
        }
    }
    uploadVeh() {
        this.props.uploadVehicle({
            number: this.state.number,
            model: this.state.model,
            brand: this.state.brand,
            color: this.state.color,
        }, this.state.vehphoto)
    }
    render() {
        if (this.props.userData.user) {
            return (
                <div className={style.docContainer}>
                    <h2 className={style.docTitle}>Add your vehicle photo</h2>
                    <div className={style.docPhoto}>
                        <div className={style.docPhotoPreload}>
                            <img src={(this.state.vehphotourl) ? this.state.vehphotourl : vehicledefault} alt='photo' />
                        </div>
                        <div className={style.docPhotoInput}>
                            <input type='file' accept='image/*' multiple onChange={(e) => { this.chooseVehPhoto(e) }} />
                            <label>Choose</label><input type='text' value={this.state.fileName} placeholder='File' readOnly />
                        </div>
                    </div>
                    <h2 className={style.docTitle}>Add your vehicle info</h2>
                    <div className={style.vehMain}>
                    <input className={style.signInInput} type='text' placeholder="Number" required onChange={(e) => { this.setState({ number: e.target.value }) }} />
                        <input className={style.signInInput} type='text' placeholder="Model" required onChange={(e) => { this.setState({ model: e.target.value }) }} />
                        <input className={style.signInInput} type='text' placeholder="Brand" required onChange={(e) => { this.setState({ brand: e.target.value }) }} />
                        <input className={style.signInInput} type='text' placeholder="Color" required onChange={(e) => { this.setState({ color: e.target.value }) }} />
                    </div>
                    <div className={style.docSubmit}>
                        <button className={style.button} onClick={this.uploadVeh.bind(this)}>SUBMIT</button>
                    </div>
                </div>
            );
        }
        return null;
    }
}

// Check props type
ChangeVeh.propTypes = {
    uploadVehicle: PropTypes.func,
    userData: PropTypes.object,
}

const mapStateToProps = state => ({
    userData: state.userData
});

const mapDispatchtoProps = dispatch => ({
    uploadVehicle: (data, file) => { dispatch(uploadVehicle(data, file)) },
});

export default connect(mapStateToProps, mapDispatchtoProps)(ChangeVeh);
