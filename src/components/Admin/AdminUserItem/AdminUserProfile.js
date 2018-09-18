import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import profilestyle from '../../Profile/Profile.css';
import style from './AdminUserItem.css'
import defaultphoto from '../../../assets/default-user.png';

import { connect } from 'react-redux';
import { openImage } from '../../../actions/globalviewaction';
import { apiurl } from '../../../appconfig';

class AdminUserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photourl: null,
            loadphoto: false,
            photoerror: null,
            loaduser: false,
            userdata: null,
            usererror: null,
        }
    }
    componentDidMount() {
        if (this.props.data) {
            this.setState({ userdata: this.props.data }, () => {
                if (this.state.userdata.profilePictureId) {
                    this.fetchProfilePhoto();
                }
            });
        }
        if (this.props.id) {
            this.fetchUserProfile();
        }
    }
    componentDidUpdate() {
        if (!this.state.photourl && this.state.userdata) {
            this.fetchProfilePhoto();
        }
    }
    fetchProfilePhoto() {
        if (this.props.tokenData.token
            && !this.state.loadphoto
            && !this.state.photourl) {
            const token = this.props.tokenData.token;
            const id = (this.state.userdata)
                ? this.state.userdata.profilePictureId
                : (this.props.data)
                    ? this.props.data.profilePictureId
                    : null;
            if (id) {
                this.setState({ loadphoto: true });
                fetch(`${apiurl}/api/images/${id}`, {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': `Bearer ${token.auth_token}`
                    })
                })
                    .then(res => {
                        if (res.status === 200) {
                            return res.blob();
                        } else if (res.status === 404) {
                            this.setState({ photourl: defaultphoto });
                        } else {
                            throw new Error(res.statusText);
                        }
                    })
                    .then(blob => {
                        if (blob) {
                            const url = URL.createObjectURL(blob);
                            this.setState({ photourl: url, loadphoto: false });
                        }
                    })
                    .catch(error => this.setState({ photoerror: error.message, loadphoto: false }));
            }
        }
    }
    fetchUserProfile() {
        if (this.props.tokenData.token
            && this.props.id
            && !this.state.loaduser
            && !this.state.userdata) {
            const token = this.props.tokenData.token;
            this.setState({ loaduser: true });
            fetch(`${apiurl}/api/admins/getuser/${this.props.id}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(data => {
                    if (data) {
                        this.setState({ userdata: data, loaduser: false }, () => {
                            if (data.profilePictureId) {
                                this.fetchProfilePhoto(data.profilePictureId);
                            }
                        });
                    }
                })
                .catch(error => this.setState({ usererror: error.message, loaduser: false }))
        }
    }
    getRoles(roles = []) {
        if (Array.isArray(roles)) {
            return roles.reduce((prev, curr) => {
                let buff = '';
                buff += (curr === 'driver_access') ? 'Driver ' : '';
                buff += (curr === 'admin_access') ? 'Admin ': '';
                buff += (curr === 'customer_access') ? 'Customer ' : '';
                return prev + buff;
            },'');
        }
        return 'No roles array';
    }
    renderProfilePhoto() {
        if (this.state.photourl) {
            return <img src={this.state.photourl} alt='photo' onClick={() => { this.props.openImage(this.state.photourl) }} />
        }
        if (this.state.loadphoto) {
            return <Loading />
        }
        if (this.state.photoerror) {
            return <Alert local={true}
                message={`Photo dont load (${this.state.photoerror})`}
                click={() => { this.fetchProfilePhoto() }} />
        }
        return <img src={defaultphoto} alt='photo' onClick={() => { this.props.openImage(defaultphoto) }} />
    }
    render() {
        if (this.state.loaduser) {
            return (
                <div className={`${style.adminUserContent} ${style.adminUserProfile}`}>
                    <Loading />
                </div>
            );
        }
        if (this.state.usererror) {
            return <Alert local={true}
                message={`Profile dont load (${this.state.usererror})`}
                click={() => { this.fetchUserProfile() }} />
        }
        if (this.state.userdata) {
            return (
                <div className={`${style.adminUserContent} ${style.adminUserProfile}`}>
                    <div className={style.adminUserProfilePhoto}>
                        <div className={profilestyle.profilePhoto}>
                            {this.renderProfilePhoto()}
                        </div>
                    </div>
                    <div className={style.adminUserProfileInfo}>
                        <div className={style.adminUserProfileText}><span>ID:</span> <p>{this.state.userdata.id}</p></div>
                        <div className={style.adminUserProfileText}><span>Role:</span> <p>{this.getRoles(this.state.userdata.roles)}</p></div>
                        <div className={style.adminUserProfileText}><span>Name:</span> <p>{this.state.userdata.firstName} {this.state.userdata.lastName}</p></div>
                        <div className={style.adminUserProfileText}><span>Email:</span> <p>{this.state.userdata.email}</p></div>
                        <div className={style.adminUserProfileText}><span>EmailConfirmed:</span> <p>{(this.state.userdata.emailConfirmed) ? 'Yes' : 'No'}</p></div>
                        <div className={style.adminUserProfileText}><span>Phone:</span> <p>{this.state.userdata.phoneNumber}</p></div>
                    </div>
                </div>
            );
        }
        return null;
    }
}

// Check props type
AdminUserProfile.propTypes = {
    tokenData: PropTypes.object,
    userData: PropTypes.object,
    openImage: PropTypes.func
}

const mapStateToProps = state => ({
    tokenData: state.tokenData,
    userData: state.userData
});

const mapDispatchtoProps = dispatch => ({
    openImage: (url) => { dispatch(openImage(url)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(AdminUserProfile);
