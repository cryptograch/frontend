import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './Profile.css';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import Alert from '../Alert/Alert';
import ProfileMain from './ProfileMain/ProfileMain';
import Settings from './Settings/Settings';
import Documents from './Documents/Documents';
import Vehicle from './Vehicle/Vehicle';
import Statistic from './Statistic/Statistic';
import ResponseList from './ResponseList/ResponseList';
import homeIMG from '../../assets/home.png';
import autoIMG from '../../assets/auto.png';
import licenseIMG from '../../assets/lis.png';
import listIMG from '../../assets/list.png';
import pointIMG from '../../assets/point.png';
import settingsIMG from '../../assets/Settings.png';
import adminIMG from '../../assets/admin.svg';

import { connect } from 'react-redux';
import { getUser } from '../../actions/authaction';

import defaultphoto from '../../assets/default-user.png';

// import { uploadPhoto, logout } from '../../actions/authaction';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newphoto: null,
            newphotourl: null,
            show: 'main',
        }
        // this.chooseNewPhoto = this.chooseNewPhoto.bind(this);
    }
    componentDidMount() {
        if (!this.props.userData.user && !this.props.userData.loading) {
            // this.props.history.replace('/sign-in');
            this.props.getUser();
        }
        // window.addEventListener('scroll', this.scrollToolBar);
    }
    componentDidUpdate() {
        if (!this.props.userData.user && !this.props.userData.loading) {
            this.props.history.replace('/sign-in');
        }
    }
    componentWillUnmount() {
        // window.removeEventListener('scroll', this.scrollToolBar);
    }
    renderMain() {
        switch (this.state.show) {
            case 'main': return <ProfileMain />;
            case 'documents': return <Documents />;
            case 'vehicle': return <Vehicle />;
            case 'statistic': return <Statistic />;
            case 'settings': return <Settings />;
            case 'response': return <ResponseList />;
            default: return null;
        }
    }
    renderToolBar() {
        if (this.props.userData.user.role === 'admin') {
            return (
                <div className={`${style.profileToolbarMain}`}>
                    <Link to='/admin'><div className={`${style.profileToolItem}`}><img src={adminIMG} /><div><strong>Admin Panel</strong></div></div></Link>
                    <div className={this.state.show === 'main' ? `${style.active} ${style.profileToolItem}` : `${style.profileToolItem}`} onClick={() => { this.setState({ show: 'main' }) }}><img src={homeIMG} /> <div><strong>Main</strong></div></div>
                    <div className={this.state.show === 'response' ? `${style.active} ${style.profileToolItem}` : `${style.profileToolItem}`} onClick={() => { this.setState({ show: 'response' }) }}><img src={pointIMG} /> <div><strong>Your responses</strong></div></div>
                    <div className={this.state.show === 'settings' ? `${style.active} ${style.profileToolItem}` : `${style.profileToolItem}`} onClick={() => { this.setState({ show: 'settings' }) }}><img src={settingsIMG} /> <div><strong>Settings</strong></div></div>
                </div>
            );
        }
        if (this.props.userData.user.role === 'customer') {
            return (
                <div className={`${style.profileToolbarMain}`}>
                    <div className={this.state.show === 'main' ? `${style.active} ${style.profileToolItem}` : `${style.profileToolItem}`} onClick={() => { this.setState({ show: 'main' }) }}><img src={homeIMG} /> <div><strong>Main</strong></div></div>
                    <div className={this.state.show === 'statistic' ? `${style.active} ${style.profileToolItem}` : `${style.profileToolItem}`} onClick={() => { this.setState({ show: 'statistic' }) }}><img src={listIMG} /> <div><strong>Statistic</strong></div></div>
                    <div className={this.state.show === 'response' ? `${style.active} ${style.profileToolItem}` : `${style.profileToolItem}`} onClick={() => { this.setState({ show: 'response' }) }}><img src={pointIMG} /> <div><strong>Your responses</strong></div></div>
                    <div className={this.state.show === 'settings' ? `${style.active} ${style.profileToolItem}` : `${style.profileToolItem}`} onClick={() => { this.setState({ show: 'settings' }) }}><img src={settingsIMG} /> <div><strong>Settings</strong></div></div>
                </div>
            );
        }
        if (this.props.userData.user.role === 'driver') {
            return (
                <div className={`${style.profileToolbarMain}`}>
                    <div className={this.state.show === 'main' ? `${style.active} ${style.profileToolItem}` : `${style.profileToolItem}`} onClick={() => { this.setState({ show: 'main' }) }}><img src={homeIMG} /> <div><strong>Main</strong></div></div>
                    <div className={this.state.show === 'documents' ? `${style.active} ${style.profileToolItem}` : `${style.profileToolItem}`} onClick={() => { this.setState({ show: 'documents' }) }}><img src={licenseIMG} /> <div><strong>Documents</strong></div></div>
                    <div className={this.state.show === 'vehicle' ? `${style.active} ${style.profileToolItem}` : `${style.profileToolItem}`} onClick={() => { this.setState({ show: 'vehicle' }) }}><img src={autoIMG} /><div><strong> Vehicle</strong></div></div>
                    <div className={this.state.show === 'statistic' ? `${style.active} ${style.profileToolItem}` : `${style.profileToolItem}`} onClick={() => { this.setState({ show: 'statistic' }) }}><img src={listIMG} /> <div><strong>Statistic</strong></div></div>
                    <div className={this.state.show === 'response' ? `${style.active} ${style.profileToolItem}` : `${style.profileToolItem}`} onClick={() => { this.setState({ show: 'response' }) }}><img src={pointIMG} /> <div><strong>Your responses</strong></div></div>
                    <div className={this.state.show === 'settings' ? `${style.active} ${style.profileToolItem}` : `${style.profileToolItem}`} onClick={() => { this.setState({ show: 'settings' }) }}><img src={settingsIMG} /> <div><strong>Settings</strong></div></div>
                </div>
            );
        }
        return null;
    }
    renderPhoto() {
        if (this.props.photoData.url) {
            return <img src={this.props.photoData.url} alt='photo' />;
        }
        if (this.props.photoData.loading) {
            return <Loading />
        }
        if (this.props.photoData.error) {
            return <Alert local={true} message='Photo dont load' click={this.props.getPhoto} />
        }
        return <img src={defaultphoto} className={style.profilePhoto} alt='photo' />;
    }
    render() {
        if (this.props.userData.user) {
            return (
                <div>
                    <Header></Header>
                    <div className={`${style.profileContainer}`}>
                        <div className={`${style.profileToolbar}`}>
                            <div className={style.photoName}>
                                <div className={style.profilePhoto}>
                                    {this.renderPhoto()}
                                </div>
                                <h3 className={style.profileName}>{this.props.userData.user.firstName} {this.props.userData.user.lastName}</h3>
                            </div>
                            {this.renderToolBar()}
                        </div>
                        <div className={`${style.profileMain}`}>
                            {this.renderMain()}
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }
}

ProfileMain.propTypes = {
    userData: PropTypes.object,
    photoData: PropTypes.object,
    getPhoto: PropTypes.func,
    getUser: PropTypes.func
}

const mapStateToProps = state => ({
    userData: state.userData,
    photoData: state.photoData
})

const mapDispatchtoProps = dispatch => ({
    getPhoto: () => { dispatch(getPhoto()) },
    getUser: () => { dispatch(getUser())}
})

export default connect(mapStateToProps, mapDispatchtoProps)(Profile);
