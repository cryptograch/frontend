import React, { Component } from 'react';
import {BrowserRouter, Route, Link, NavLink} from 'react-router-dom';
import styleSignIn from '../Sign_in/Sign_in.css';
import styleSignInRider from '../Sign_in/Sign_in_rider/Sign_in_rider.css';
import styleHome from '../Home/Home.css';
import styleHeader from '../Header/Header.css';
import style from './Policy.css';

class Policy extends Component {
    render() {
        return(
            <div className={styleSignInRider.signInBackground}>
                <div className={styleSignInRider.orangeBackground + ' ' + style.orangeBackground}></div>
                <div className={styleHeader.logo}>
                    <Link to="/home" className={styleHeader.headerLogo__a + ' ' + styleSignInRider.signInLogo}><button className={styleHeader.homeBtn}>
                        <h1 className={styleSignInRider.headerLogo__h1}><span className={styleHeader.yellow_span}>Taxi</span><span className={styleHeader.toggle_span}>Coin</span></h1>
                    </button></Link>
                </div>
                <div className={style.inner}>
                    <h1 className={style.title__h1}>Privacy <span>Policy</span></h1>
                    <h2 className={style.title__h2}>
                        When you use Uber, you trust us with your information. We are committed to
                        keeping that trust. That starts with helping you understand our privacy practices.
                    </h2>
                    <p className={style.policy__p}>
                        This policy also applies to those who provide information to Uber in connection with an application to use our services, or
                        whose information Uber otherwise receives in connection with its services (such as contact information of individuals associated
                        with UberEats restaurant partners). All those subject to this policy are referred to as “users” for purposes of this policy.
                        The practices described in this policy are subject to applicable laws in the places in which we operate. This means that we only engage in the practices described in this policy
                        in a particular country or region if permitted under the laws of those places. Please contact us if you have questions on our practices in your country or region.
                    </p>
                    <p className={style.policy__p}>
                        We may also allow others to provide audience measurement and analytics services for us, to serve advertisements on our
                        behalf across the Internet, and to track and report on the performance of those advertisements. These entities may use cookies, web
                        beacons, SDKs, and other technologies to identify your device when you visit our site and use our services, as well as when you visit other online sites and services.
                        Please see our Cookie Statement for more information regarding the use of cookies and other technologies described in this section, including
                        regarding your choices relating to such technologies.
                    </p>
                    <p className={style.policy__p}>
                        This policy also applies to those who provide information to Uber in connection with an application to use our services, or
                        whose information Uber otherwise receives in connection with its services (such as contact information of individuals associated
                        with UberEats restaurant partners). All those subject to this policy are referred to as “users” for purposes of this policy.
                        The practices described in this policy are subject to applicable laws in the places in which we operate. This means that we only engage in the practices described in this policy
                        in a particular country or region if permitted under the laws of those places. Please contact us if you have questions on our practices in your country or region.
                    </p>
                    <p className={style.policy__p}>
                        This policy also applies to those who provide information to Uber in connection with an application to use our services, or
                        whose information Uber otherwise receives in connection with its services (such as contact information of individuals associated
                        with UberEats restaurant partners). All those subject to this policy are referred to as “users” for purposes of this policy.
                        The practices described in this policy are subject to applicable laws in the places in which we operate. This means that we only engage in the practices described in this policy
                        in a particular country or region if permitted under the laws of those places. Please contact us if you have questions on our practices in your country or region.
                    </p>
                    <p className={style.policy__p}>
                        This policy also applies to those who provide information to Uber in connection with an application to use our services, or
                        whose information Uber otherwise receives in connection with its services (such as contact information of individuals associated
                        with UberEats restaurant partners). All those subject to this policy are referred to as “users” for purposes of this policy.
                        The practices described in this policy are subject to applicable laws in the places in which we operate. This means that we only engage in the practices described in this policy
                        in a particular country or region if permitted under the laws of those places. Please contact us if you have questions on our practices in your country or region.
                    </p>
                    <p className={style.policy__p}>
                        This policy also applies to those who provide information to Uber in connection with an application to use our services, or
                        whose information Uber otherwise receives in connection with its services (such as contact information of individuals associated
                        with UberEats restaurant partners). All those subject to this policy are referred to as “users” for purposes of this policy.
                        The practices described in this policy are subject to applicable laws in the places in which we operate. This means that we only engage in the practices described in this policy
                        in a particular country or region if permitted under the laws of those places. Please contact us if you have questions on our practices in your country or region.
                    </p>
                </div>
            </div>

        );
    }
}

export default Policy;
