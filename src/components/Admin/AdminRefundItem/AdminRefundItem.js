import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert'; */

import userstyle from '../AdminUserItem/AdminUserItem.css';
import style from "./AdminRefundItem.css";

import settingsvg from "../../../assets/settings.svg";
import yessvg from '../../../assets/yes.svg';
import nosvg from '../../../assets/no.svg';

import closesvg from '../../../assets/close.svg';
import AdminUserProfile from '../AdminUserItem/AdminUserProfile';
import AdminRefundTrip from './AdminRefundTrip';

import { connect } from 'react-redux';
import { resolveRequest } from '../../../actions/adminaction';



class AdminRefundItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 'close',
            message: "",
            settings: false,
        }
    }
    componentDidMount() {
    }
    componentDidUpdate() {
    }
    submit() {
        this.props.resolveRequest(this.props.data.id, this.state.message);
    }
    renderResolve() {
        return (
            <div className={`${userstyle.adminUserContent}`}>
                <form className={userstyle.adminUserResForm} onSubmit={(e) => { e.preventDefault() }}>
                    <h3>Resolve it</h3>
                    <textarea type="text" placeholder="You text" onChange={(e) => { this.setState({ message: e.target.value }) }} />
                    <input type="submit" value="Submit" onClick={this.submit.bind(this)} />
                </form>
            </div>
        );
    }
    renderResolveMain() {
        switch (this.state.show) {
            case 'resolve': return this.renderResolve();
            case 'profile': return <AdminUserProfile id={this.props.data.identityId} />;
            case 'trip': return <AdminRefundTrip id={this.props.data.tripHistoryId} />
            default: return null;
        }
    }
    renderResolveBtn() {
        /*  if (this.state.show === 'resolve') {
             return <button className={userstyle.settingsMainItem}
                 onClick={() => { this.setState({ show: 'close' }) }}>Close</button>
         } */
        return <button className={userstyle.settingsMainItem}
            onClick={() => { this.setState({ show: 'resolve' }) }}>Resolve it</button>
    }
    renderProfileBtn() {
        /* if (this.state.show === 'profile') {
            return <button className={userstyle.settingsMainItem}
                onClick={() => { this.setState({ show: 'close' }) }}>Close</button>
        } */
        return <button className={userstyle.settingsMainItem}
            onClick={() => { this.setState({ show: 'profile' }) }}>Show profile</button>
    }
    /* renderCloseBtn() {
        if (this.state.show !== 'close') {
            return (
                <div className={userstyle.adminSettingsBtn} onClick={() => this.setState({ show: 'close' })}>
                    <img src={closesvg} alt="photo" />
                </div>
            );
        }
        return null;
    } */
    renderTripBtn() {
        return <button className={userstyle.settingsMainItem}
            onClick={() => { this.setState({ show: 'trip' }) }}>Show trip</button>
    }
    renderSettnigsBtn() {
        if (this.state.show !== 'close') {
            return (
                <div className={userstyle.adminSettingsBtn} onClick={() => this.setState({ show: 'close' })}>
                    <img src={closesvg} alt="photo" />
                </div>
            );
        }
        return (
            <div className={userstyle.adminSettingsBtn} onClick={() => { this.setState({ settings: (this.state.settings) ? false : true }) }}>
                <img src={settingsvg} alt="photo" />
                <div className={userstyle.settingsContainer}>
                    {this.renderSettnigs()}
                </div>
            </div>
        );
    }
    renderSettnigs() {
        if (this.state.settings) {
            return (
                <div className={userstyle.settingsMain}>
                    {this.renderProfileBtn()}
                    {this.renderResolveBtn()}
                    {this.renderTripBtn()}
                </div>
            );
        }
        return null;
    }
    renderIsSolved() {
        if (this.props.data.solved) {
            return <img src={yessvg} alt='Yes' />
        } else {
            return <img src={nosvg} alt='No' />
        }
    }
    render() {
        if (this.props.data) {
            return (
                <div className={userstyle.adminUserContainer}>
                    <div className={style.refundMain}>
                        <div className={style.refundContent}>
                            <div className={style.refundTopInfo}>
                                <div className={style.refundSolve}>
                                    {this.renderIsSolved()}
                                </div>
                                <div className={style.refundTime}>
                                    {(new Date(this.props.data.creationTime)).toDateString()}
                                </div>
                                {this.renderSettnigsBtn()}
                            </div>
                            <div className={style.refundMessageContainer}>
                                <div className={style.refundMessage}>{this.props.data.message}</div>
                            </div>
                        </div>
                    </div>
                    {this.renderResolveMain()}
                </div>
            );
        }
        return null;
    }
}

// Check props type
AdminRefundItem.propTypes = {
    resolveRequest: PropTypes.func,
}

const mapStateToProps = state => ({
});

const mapDispatchtoProps = dispatch => ({
    resolveRequest: (id, mess) => { dispatch(resolveRequest(id, mess)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(AdminRefundItem);
