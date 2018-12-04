import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../Settings.css';
import vehicledefault from '../../../../assets/default-vehicle.png';
import next from '../../../../assets/next.svg';
import prev from '../../../../assets/prev.svg';

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
            slide: 0,
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

            this.setState({
                vehphoto: [...files],
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

    changeSlide(n) {
        const { urls } = this.state;
        if (Array.isArray(urls)) {
            let slide = this.state.slide;
            slide += n;
            if (slide > urls.length - 1) {
                slide = 0;
            } else if (slide < 0) {
                slide = urls.length - 1;
            }
            this.setState({ slide });
        }
    }

    renderSliderBtn(type) {
        const { urls, slide } = this.state;
        if (Array.isArray(urls) && urls.length > 1) {
            if (slide >= urls.length) {
                this.setState({ slide: 0 });
            }
            switch (type) {
                case 'prev': return <div className={`${style.slidebtn} ${style.dec}`} onClick={() => { this.changeSlide(-1) }}> <img src={prev} alt="prev" /> </div>;
                case 'next': return <div className={`${style.slidebtn} ${style.inc}`} onClick={() => { this.changeSlide(1) }}> <img src={next} alt="next" /> </div>;
                default: return null;
            }
        }
        return null;
    }

    renderPreview() {
        const { urls, slide } = this.state;
        if (Array.isArray(urls)) {
            if (urls.length === 0) {
                return (
                    <div className={style.docPhotoPreload}>
                        <img src={(this.state.vehphotourl) ? this.state.vehphotourl : vehicledefault} alt='photo' />
                    </div>
                )
            }
            return urls.map((url, key) => {
                return (
                    <div key={key} className={`${style.docPhotoPreload} ${(key === slide) ? style.block : style.none}`}>
                        <img src={url} alt='photo' />
                    </div>
                );
            });
        }
    }

    render() {
        if (this.props.userData.user) {
            return (
                <div className={style.docContainer}>
                    <h2 className={style.docTitle}>Add your vehicle photo</h2>
                    <div className={style.docPhoto}>
                        <div className={style.vehpreview}>
                            {this.renderSliderBtn('prev')}
                            {this.renderSliderBtn('next')}
                            {this.renderPreview()}
                        </div>
                        <div className={style.vehinput}>
                            <input type='file' accept='image/*' multiple onChange={(e) => { this.chooseVehPhoto(e) }} />
                            <label>Add photos</label>
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
