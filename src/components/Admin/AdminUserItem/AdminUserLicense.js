import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import style from './AdminUserItem.css';
import defaultlicense from '../../../assets/default-license.png';
import yessvg from '../../../assets/yes.svg';
import nosvg from '../../../assets/no.svg';

import { connect } from 'react-redux';
import { approveLicense, getUserLicense } from '../../../actions/adminaction';
import { openImage } from '../../../actions/globalviewaction';
import { getPhoto } from '../../../actions/photoaction';

class AdminUserLicense extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { id, userlistData } = this.props;
        const { docs } = userlistData;
        if (id && docs && !docs[id]) {
            this.props.getUserLicense(id);
        }
    }
    componentDidUpdate() {
    }
    renderLicensePhoto(...urls) {
        return urls.map((id, key) => {
            return (
                <div key={key} className={`${style.adminUserLicensePhoto}`}>
                    {this.renderPhoto(id)}
                </div>
            );
        });
    }
    renderPhoto(id) {
        const { photosData, getPhoto } = this.props;
        if (photosData[id]) {
            const { loading, url, error } = photosData[id];
            if (loading) {
                return <Loading />
            }
            if (url) {
                return <img src={url} alt='photo' onClick={() => { this.props.openImage(url) }} />
            }
            if (error) {
                return <Alert local={true}
                    message={`Photo dont load`}
                    click={() => { getPhoto(id) }} />
            }
            return <img src={defaultlicense} alt='photo' onClick={() => { this.props.openImage(defaultlicense) }} />
        }
        return <img src={defaultlicense} alt='photo' onClick={() => { this.props.openImage(defaultlicense) }} />
    }
    renderLicenseApproveBtn(approved) {
        if (this.props.userData.user.role === 'admin'
            && this.props.roles
            && !this.props.roles.includes('admin_access')
            && !approved) {
            return <button className={style.adminUserBtn} onClick={() => { this.props.approveLicense(this.props.id) }}>Approve</button>
        }
        return null;
    }
    renderIsAprrove(approved) {
        if (approved) {
            return <img className={style.approveImg} src={yessvg} alt="Yes" />
        }
        return <img className={style.approveImg} src={nosvg} alt="No" />
    }
    render() {
        const { id, userlistData, getUserLicense } = this.props;
        const { docs } = userlistData;
        if (docs && docs[id]) {
            const { loading, error } = docs[id];
            const doc = docs[id].doc;
            if (loading) {
                return (
                    <div className={`${style.adminUserContent} ${style.adminUserProfile}`}>
                        <Loading />
                    </div>
                )
            }
            if (error) {
                return <Alert local={true}
                    message={`License dont load (${error})`}
                    click={() => { getUserLicense(id) }} />
            }
            console.log(doc);
            if (doc) {
                return (
                    <div className={`${style.adminUserContent} ${style.adminLicense}`}>
                        <div className={style.adminLicensePhotos}>
                            {this.renderLicensePhoto(doc.frontId, doc.backId)}
                        </div>
                        <div className={style.adminUserProfileInfo}>
                            <div className={style.adminUserProfileText}><span>Approved:</span> <p>{this.renderIsAprrove(doc.isApproved)}</p>{this.renderLicenseApproveBtn(doc.isApproved)}</div>
                        </div>
                    </div>
                )
            }
            return (
                <div className={`${style.adminUserContent} ${style.adminLicense}`}>
                    <div className={style.adminLicensePhotos}>
                        {this.renderLicensePhoto(null, null)}
                    </div>
                    <div className={style.adminUserProfileInfo}>
                        <div className={style.adminUserProfileText}><span>No License</span> <p>{this.renderIsAprrove(false)}</p></div>
                    </div>
                </div>
            )
        }
        return null;
    }
}

// Check props type
AdminUserLicense.propTypes = {
    data: PropTypes.object,
    approveLicense: PropTypes.func,
    openImage: PropTypes.func,
    photosData: PropTypes.object,
    userlistData: PropTypes.object,
    getUserLicense: PropTypes.func,
    getPhoto: PropTypes.func,
    userData: PropTypes.object
}

const mapStateToProps = state => ({
    userData: state.userData,
    photosData: state.photosData,
    userlistData: state.userlistData
});

const mapDispatchtoProps = dispatch => ({
    approveLicense: (id) => { dispatch(approveLicense(id)) },
    openImage: (url) => { dispatch(openImage(url)) },
    getUserLicense: (id) => { dispatch(getUserLicense(id)) },
    getPhoto: (id) => { dispatch(getPhoto(id)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(AdminUserLicense);
