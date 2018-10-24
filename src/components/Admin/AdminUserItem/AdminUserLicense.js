import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import style from './AdminUserItem.css';
import defaultlicense from '../../../assets/default-license.png';
import yessvg from '../../../assets/yes.svg';
import nosvg from '../../../assets/no.svg';

import { connect } from 'react-redux';
import { approveLicense } from '../../../actions/adminaction';
import { openImage } from '../../../actions/globalviewaction';
import { apiurl } from '../../../appconfig';

class AdminUserLicense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            licensephotos: [],
            loadphoto: false,
            licensedata: null,
            loadlicense: false,
            licenseerror: null,
        }
    }
    componentDidMount() {
        if (this.props.id) {
            this.fetchLicense();
        }
    }
    componentDidUpdate() {
    }
    fetchLicensePhoto(id) {
        if (this.props.tokenData.token) {
            const token = this.props.tokenData.token;
            this.setState({ loadphoto: true });
            return fetch(`${apiurl}/api/images/${id}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        return res.blob();
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(blob => {
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        return { url, id };
                    }
                })
                .catch(error => ({ error: error.message, id }));
        }
        return Promise.resolve({});
    }
    fetchLicense() {
        if (this.props.tokenData.token
            && this.props.id
            && !this.state.loadlicense
            && !this.state.licensedata) {
            const id = this.props.id;
            const token = this.props.tokenData.token;
            this.setState({ loadlicense: true });
            fetch(`${apiurl}/api/admins/driverlicenses/${id}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
                .then(res => {
                    // console.log(res);
                    if (res.status === 200) {
                        return res.json();
                    } else if (res.status === 404) {
                        this.setState({
                            licensedata: {
                                licensedFrom: null,
                                licensedTo: null,
                                isApproved: false
                            },
                            licensephotourl: null,
                            loadlicense: false,
                        })
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(data => {
                    if (data) {
                        this.setState({ licensedata: data, loadlicense: false });
                        Promise.all([this.fetchLicensePhoto(data.frontId), this.fetchLicensePhoto(data.backId)])
                            .then((res) => {
                                this.setState({ loadphoto: false, licensephotos: res });
                            })
                            .catch(error => this.setState({licenseerror: error.message }));
                    }
                })
                .catch(error => this.setState({ licenseerror: error.message, loadlicense: false }));
        }
    }
    renderLicensePhoto() {
        if (this.state.loadphoto) {
            return (
                <div className={`${style.adminUserLicensePhoto}`}>
                    <Loading />
                </div>
            );
        }
        return this.state.licensephotos.map((photo, key) => {
            return (
                <div key={key} className={`${style.adminUserLicensePhoto}`}>
                    {this.renderPhoto(photo)}
                </div>
            );
        });
    }
    renderPhoto(photo) {
        if (photo.url) {
            return <img src={photo.url} alt='photo' onClick={() => { this.props.openImage(photo.url) }} />
        }
        if (photo.error) {
            return <Alert local={true}
                message={`Photo dont load (${this.state.photoerror})`}
                click={() => { this.fetchLicensePhoto(photo.id) }} />
        }
        return <img src={defaultlicense} alt='photo' onClick={() => { this.props.openImage(defaultlicense) }} />
    }
    renderLicenseApproveBtn() {
        if (this.props.userData.user.role === 'admin'
            && this.props.roles
            && !this.props.roles.includes('admin_access')
            && !this.state.licensedata.isApproved) {
            return <button className={style.adminUserBtn} onClick={() => { this.props.approveLicense(this.state.licensedata.driverId) }}>Approve</button>
        }
        return null;
    }
    renderIsAprrove() {
        if (this.state.licensedata.isApproved) {
            return <img className={style.approveImg} src={yessvg} alt="Yes" />
        }
        return <img className={style.approveImg} src={nosvg} alt="No" />
    }
    render() {
        if (this.state.loadlicense) {
            return (
                <div className={`${style.adminUserContent} ${style.adminUserProfile}`}>
                    <Loading />
                </div>
            )
        }
        if (this.state.licenseerror) {
            return <Alert local={true}
                message={`License dont load (${this.state.licenseerror})`}
                click={() => { this.fetchLicense() }} />
        }
        if (this.state.licensedata) {
            return (
                <div className={`${style.adminUserContent} ${style.adminLicense}`}>
                    <div className={style.adminLicensePhotos}>
                        {this.renderLicensePhoto()}
                    </div>
                    <div className={style.adminUserProfileInfo}>
                        <div className={style.adminUserProfileText}><span>Approved:</span> <p>{this.renderIsAprrove()}</p>{this.renderLicenseApproveBtn()}</div>
                    </div>
                </div>
            )
        }
        return null;
    }
}

// Check props type
AdminUserLicense.propTypes = {
    tokenData: PropTypes.object,
    userData: PropTypes.object,
    data: PropTypes.object,
    approveLicense: PropTypes.func,
    openImage: PropTypes.func,
}

const mapStateToProps = state => ({
    tokenData: state.tokenData,
    userData: state.userData
});

const mapDispatchtoProps = dispatch => ({
    approveLicense: (id) => { dispatch(approveLicense(id)) },
    openImage: (url) => { dispatch(openImage(url)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(AdminUserLicense);
