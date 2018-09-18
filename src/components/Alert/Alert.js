import React, { Component } from 'react';
import style from './Alert.css';

import close from '../../assets/close.png';
import refreshsvg from '../../assets/refresh.svg';

class Alert extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.global) {
            if (this.props.error) {
                return (
                    <div className={style.alertcontainer}>
                        <div className={style.alertclose} onClick={this.props.click}>
                            <img src={close} alt="close" />
                        </div>
                        <div className={style.alertmain}>
                            <div className={style.alerttext}>
                                <strong className={style.alertlabel}>Warn:</strong> {this.props.error}
                            </div>
                        </div>
                    </div>
                );
            }
            if (this.props.success) {
                return (
                    <div className={style.alertcontainer}>
                        <div className={style.alertclose} onClick={this.props.click}>
                            <img src={close} alt="close" />
                        </div>
                        <div className={style.alertmain}>
                            <div className={style.alerttext}>
                                <strong className={style.alertlabel}>Success:</strong> {this.props.success}
                            </div>
                        </div>
                    </div>
                );
            }
            if (this.props.email) {
                return (
                    <div className={style.alertcontainer}>
                        <div className={style.alertclose} onClick={this.props.click}>
                            <img src={close} alt="close" />
                        </div>
                        <div className={style.alertmain}>
                            <div className={style.alerttext}>
                                <strong className={style.alertlabel}>Warn:</strong> {this.props.email}
                            </div>
                            <div className={style.resendBtn} onClick={this.props.send}>Resend letter</div>
                        </div>
                    </div>
                );
            }
            return null;
        }
        if (this.props.local) {
            if (this.props.message) {
                return (
                    <div className={style.alertlocalcontainer}>
                        <div className={style.alertlocalmain}>
                            <div className={style.alertlocaltext}>
                                {this.props.message}
                            </div>
                        </div>
                        <div className={style.refreshBtn} onClick={this.props.click}>
                            <img src={refreshsvg} alt='Try again'/>
                        </div>
                    </div>
                );
            }
            return null;
        }
        return null;
    }
}

export default Alert;
