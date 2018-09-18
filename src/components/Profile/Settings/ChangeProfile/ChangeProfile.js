import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../Settings.css';
import profilestyle from '../../Profile.css';
// import Loading from '../../Loading/Loading';
import Alert from '../../../Alert/Alert';

import { connect } from 'react-redux';
import { uploadPhoto } from '../../../../actions/authaction';
import { changeProfile } from '../../../../actions/chengeaction';
import userdefault from '../../../../assets/default-user.png';

class ChangeProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            city: "",
            currentPassword: "",
            newPassword: "",
            newphotourl: null,
            newphoto: null,
            newphotoname: null,
            lock: "",
            fileName: "Choose file"

        }
    }
    formVisibility() {
        console.log('ok');
    }
    chooseNewPhoto(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({ newphotourl: reader.result });
            };
            reader.readAsDataURL(file);
            this.setState({
                newphoto: file,
                fileName: file.name,
            });
        }
    }
    uploadNewPhoto() {
        this.props.uploadPhoto(this.state.newphoto);
    }
    confirmChange() {
        if (this.state.firstName) {
            this.props.changeProfile({
                firstName: this.state.firstName,
            });

        }
        if (this.state.lastName) {
            this.props.changeProfile({
                lastName: this.state.lastName,
            });

        }
        if (this.state.phoneNumber) {
            this.props.changeProfile({
                phoneNumber: this.state.phoneNumber,
            });

        }
        if (this.state.city) {
            this.props.changeProfile({
                city: this.state.city,
            });

        }
        if (this.state.currentPassword && this.state.newPassword) {
            if (this.state.currentPassword === this.state.newPassword) {
                this.props.changeProfile({
                    currentPassword: this.state.currentPassword,
                    newPassword: this.state.newPassword,
                })
            }

        }

    }
    render() {
        if (this.props.userData.user) {
            return (
                <div>
                    <div className={style.showForm} >
                        <div className={style.changePhoto}>
                            <div className={style.docPhoto}>
                                <h1 className={style.docTitle}> Add your Photo</h1>
                                <div className={style.profilePhotoPreload}>
                                    <img src={(this.state.newphotourl) ? this.state.newphotourl : userdefault} alt='photo' />
                                </div>
                                <div className={style.docPhotoInput}>
                                    <input type='file' accept='image/*' onChange={(e) => { this.chooseNewPhoto(e) }} />
                                    <label>Choose</label><input type='text' value={this.state.fileName} placeholder='File' readOnly />
                                </div>
                                <div className={style.docSubmit}>
                                    <button className={style.button} onClick={this.uploadNewPhoto.bind(this)}>SUBMIT</button>
                                </div>
                            </div>
                        </div>
                        <h1>Name</h1>
                        <div className={style.changePhoto}>
                            <div className={style.marginRight}>
                                <input className={style.signInInput} type='text' placeholder="First Name" required onChange={(e) => { this.setState({ firstName: e.target.value }) }} />
                            </div>
                            <div>
                                <input className={style.signInInput} type='text' placeholder="Last Name" required onChange={(e) => { this.setState({ lastName: e.target.value }) }} />
                            </div>
                        </div>
                        <h1>Phone Number</h1>
                        <div className={style.changePhoto}>
                            <input className={style.signInInput} type='text' placeholder="Enter new phone" required onChange={(e) => { this.setState({ phoneNumber: e.target.value }) }} />
                        </div>
                        <h1 className={style.Label}>City</h1>
                        <div className={style.changePhoto}>
                            <input className={style.signInInput} type='text' placeholder="Enter new city" required onChange={(e) => { this.setState({ city: e.target.value }) }} />
                        </div>
                        <h1 className={style.Label}>Password</h1>
                        <div className={style.changePhoto}>
                            <div className={style.marginRight}>
                                <input className={style.signInInput} type='text' placeholder="Current password" required onChange={(e) => { this.setState({ currentPassword: e.target.value }) }} />
                            </div>
                            <div>
                                <input className={style.signInInput} type='text' placeholder="New password" required onChange={(e) => { this.setState({ newPassword: e.target.value }) }} />
                            </div>
                        </div>
                        <div className={style.docSubmit}>
                            <button className={style.button} onClick={this.confirmChange.bind(this)}>SUBMIT</button>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }

}

ChangeProfile.propTypes = {
    userData: PropTypes.object,
    chengeName: PropTypes.func,
    confirmChange: PropTypes.func,
    uploadPhoto: PropTypes.func,
    formVisibility: PropTypes.func,
}
const mapStateToProps = state => ({
    userData: state.userData,
    changedData: state.chengeddata
})
const mapDispatchtoProps = dispatch => ({
    changeProfile: (data) => { dispatch(changeProfile(data)) },
    uploadPhoto: (file) => { dispatch(uploadPhoto(file)) },
})
export default connect(mapStateToProps, mapDispatchtoProps)(ChangeProfile);
