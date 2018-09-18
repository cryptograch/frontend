import React, { Component } from 'react';
import {BrowserRouter, Route, Link, NavLink} from 'react-router-dom';
import style from './Sign_in.css';
import styleHome from '../Home/Home.css';
import Header from '../Header/Header';

class SignIn extends Component {
    render() {
        return(
    <div>
        <Header></Header>
          <div className={style.margin100}>
            <div className={style.inner}>
                <h1 className={style.title__h1}>Sign <span className={styleHome.yellow_span}>In</span></h1>
                <div className={style.flex}>
                    <div className={style.flexItem}>
                        <h2>Rider</h2>
                        <p className={style.marginBottom}>
                            Manage your payment options, review trip history, and more.
                        </p>
                        <NavLink to="/sign-in-rider" className={style.signInBtn}>RIDER SIGN IN</NavLink>
                    </div>
                    <div className={style.flexItem}>
                        <h2>Driver</h2>
                        <p className={style.marginBottom}>
                            Find everything you need to track your success on the road.
                        </p>
                        <NavLink to="/sign-in-driver" className={style.signInBtn}>DRIVER SIGN IN</NavLink>
                    </div>
                </div>
            </div>
          </div>
      </div>
        );
    }
}

export default SignIn;
