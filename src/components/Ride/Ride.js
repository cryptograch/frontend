import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Header from '../Header/Header';
import styleHome from '../Home/Home.css';
import style from './Ride.css';

import telegram from '../../../public/Home/telegram.png';
import reddit from '../../../public/Home/reddit.png';
import facebook from '../../../public/Home/facebook.png';
import linkedin from '../../../public/Home/linkedin.png';
import twitter from '../../../public/Home/twitter.png';
import instagram from '../../../public/Home/instagram.png';
import googleplay from '../../../public/Home/get-it-on-google-play.png';
import appstore from '../../../public/Home/app-store-button.png';


class Ride extends Component {
    render() {
        return(
          <div>
            <Header></Header>
            <div className={style.background}>
                <div className={style.inner}>
                    <Link to="/sign-up-rider" className={style.signUpBigBtn}>
                        <div className={style.signUpBigBtnBlock}>
                            <div className={style.blockStart}>Start riding with <span className={styleHome.yellow_span}>Taxi</span>Coin</div>
                            <div className={style.blockEnd}>SIGN UP</div>
                        </div>
                    </Link>
                </div>
            </div>

            <div className={style.inner2}>
                <div>
                  <h1 className={styleHome.why__h1 + ' ' + style.payWithTitle}>Pay with <span className={styleHome.yellow_span}>tokens</span> for your ride</h1>
                  <h1 className={style.payWithTitle + ' ' + style.payWithTitle2}>The best way to make your ride cheaper</h1>
                  <p className={style.payWithP}>
                      With a unique currency, fair compensation, transparent contracts and no intermediaries.
                      Taxi Coin is revolutionizing the creation and distribution of value for taxi activity.
                      The Taxi Coin Blockchain provides each user paying for the trip by our tokens.
                  </p>
                </div>
            </div>

            <div className={style.rideBg}>
                <div className={style.inner2}>
                    <span className={style.signUpToRideSpan}>Go to your destination with <span className={styleHome.yellow_span}>Taxi</span>Coin</span>
                    <Link to="/sign-up-rider"><button className={style.signUpToRide}>SIGN UP TO RIDE</button></Link>
                </div>
            </div>

            <div className={style.trust}>
                <div className={style.inner2}>
                    <h1 className={style.payWithTitle + ' ' + style.payWithTitle3}>Safe rides</h1>
                    <h1 className={styleHome.why__h1 + ' ' + style.payWithTitle}>From start to finish be in secure with <span className={styleHome.yellow_span}>Taxi</span>Coin</h1>
                    <p className={style.payWithP}>
                        Your safety is important to us before, during, and after every trip. That s
                        why we continue to develop technology that helps make millions of rides safer every day.
                    </p>
                </div>
            </div>

            <div className={styleHome.readMore}>
                <h1 className={styleHome.readMore__h1}>Try it in our <span className={styleHome.yellow_span}>app</span></h1>
                <div className={styleHome.yellow_border}></div>
                <div className={styleHome.flex}>
                    <div>
                        <a href="#">
                            <img className={styleHome.getItOnImg} src={googleplay} alt="get-it-on-google-play"/>
                        </a>
                    </div>
                    <div>
                        <a href="#">
                            <img className={styleHome.getItOnImg} src={appstore} alt="get-it-on-google-play"/>
                        </a>
                    </div>
                </div>
                <h2 className={styleHome.readMore__h2}>Go in<span className={styleHome.yellow_span}> social</span></h2>
                <div className={styleHome.flexIcons}>
                    <div className={styleHome.socialIcon}>
                        <a href="#">
                            <img className={styleHome.socialImg} src={twitter} alt="twitter"/>
                        </a>
                    </div>
                    <div className={styleHome.socialIcon}>
                        <a href="#">
                            <img className={styleHome.socialImg} src={facebook} alt="facebook"/>
                        </a>
                    </div>
                    <div className={styleHome.socialIcon}>
                        <a href="#">
                            <img className={styleHome.socialImg} src={instagram} alt="instagram"/>
                        </a>
                    </div>
                    <div className={styleHome.socialIcon}>
                        <a href="#">
                            <img className={styleHome.socialImg} src={linkedin} alt="linkedin"/>
                        </a>
                    </div>
                    <div className={styleHome.socialIcon}>
                        <a href="#">
                            <img className={styleHome.socialImg} src={reddit} alt="reddit"/>
                        </a>
                    </div>
                    <div className={styleHome.socialIcon}>
                        <a href="#">
                            <img className={styleHome.socialImg} src={telegram} alt="telegram"/>
                        </a>
                    </div>
                </div>
            </div>

          </div>
        );
    }
}

export default Ride;
