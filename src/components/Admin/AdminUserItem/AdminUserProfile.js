import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import profilestyle from '../../Profile/Profile.css';
import style from './AdminUserItem.css'
import defaultphoto from '../../../assets/default-user.png';

import { connect } from 'react-redux';
import { openImage } from '../../../actions/globalviewaction';
// import { apiurl } from '../../../appconfig';

import { getPhoto } from "../../../actions/photoaction";
import { getUserProfile } from '../../../actions/adminaction';

class AdminUserProfile extends Component {
    constructor(props) {
        super(props); {
        }
    }
    componentDidMount() {
        const { data, getPhoto, id, getUserProfile } = this.props;
        if (data && data.profilePictureId) {
            this.setState({ data: { profile: data } });
            getPhoto(data.profilePictureId);
        } else if (!data && id) {
            getUserProfile(id);
        }
    }
    componentDidUpdate() {
    }
    getRoles(roles = []) {
        if (Array.isArray(roles)) {
            return roles.reduce((prev, curr) => {
                let buff = '';
                buff += (curr === 'driver_access') ? 'Driver ' : '';
                buff += (curr === 'admin_access') ? 'Admin ' : '';
                buff += (curr === 'customer_access') ? 'Customer ' : '';
                return prev + buff;
            }, '');
        }
        return 'No roles array';
    }
    renderProfilePhoto(id) {
        const { photosData, getPhoto } = this.props;
        if (id && photosData[id]) {
            const { loading, url, error } = photosData[id];
            if (url) {
                return <img src={url} alt='photo' onClick={() => { this.props.openImage(url) }} />
            }
            if (loading) {
                return <Loading />
            }
            if (error) {
                return <Alert local={true}
                    message={`Photo dont load`}
                    click={() => { getPhoto(id) }} />
            }
            return <img src={defaultphoto} alt='photo' onClick={() => { this.props.openImage(defaultphoto) }} />
        }
        return <img src={defaultphoto} alt='photo' onClick={() => { this.props.openImage(defaultphoto) }} />
    }
    render() {
        let datamain = null;
        const { data, id } = this.props;
        const { profiles } = this.props.userlistData;
        if (data) {
            datamain = { profile: this.props.data };
        } else {
            if (id && profiles[id]) {
                datamain = profiles[id]
            }
        }
        if (datamain) {
            const { loading, profile, error } = datamain;
            const { getUserProfile, id } = this.props;
            if (loading) {
                return <Loading />
            }
            if (error) {
                return <Alert local={true}
                    message={`Photo dont load`}
                    click={() => { getUserProfile(id) }} />
            }
            if (profile) {
                return (
                    <div className={`${style.adminUserContent} ${style.adminUserProfile}`}>
                        <div className={style.adminUserProfilePhoto}>
                            <div className={profilestyle.profilePhoto}>
                                {this.renderProfilePhoto(profile.profilePictureId)}
                            </div>
                        </div>
                        <div className={style.adminUserProfileInfo}>
                            <div className={style.adminUserProfileText}><span>ID:</span> <p>{profile.id}</p></div>
                            <div className={style.adminUserProfileText}><span>Role:</span> <p>{this.getRoles(profile.roles)}</p></div>
                            <div className={style.adminUserProfileText}><span>Name:</span> <p>{profile.firstName} {profile.lastName}</p></div>
                            <div className={style.adminUserProfileText}><span>Email:</span> <p>{profile.email}</p></div>
                            <div className={style.adminUserProfileText}><span>EmailConfirmed:</span> <p>{(profile.emailConfirmed) ? 'Yes' : 'No'}</p></div>
                            <div className={style.adminUserProfileText}><span>Phone:</span> <p>{profile.phoneNumber}</p></div>
                        </div>
                    </div>
                );
            }
        }
        return null;
    }
}

// Check props type
AdminUserProfile.propTypes = {
    userData: PropTypes.object,
    openImage: PropTypes.func,
    userlistData: PropTypes.object,
    photosData: PropTypes.object,
    getUserProfile: PropTypes.func,
}

const mapStateToProps = state => ({
    userData: state.userData,
    userlistData: state.userlistData,
    photosData: state.photosData,
});

const mapDispatchtoProps = dispatch => ({
    openImage: (url) => { dispatch(openImage(url)) },
    getPhoto: (id) => { dispatch(getPhoto(id)) },
    getUserProfile: (id) => { dispatch(getUserProfile(id)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(AdminUserProfile);
