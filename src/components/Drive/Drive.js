import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Header from '../Header/Header';
import styleHome from '../Home/Home.css';
import styleRide from '../Ride/Ride.css';
import style from './Drive.css';

import telegram from '../../../public/Home/telegram.png';
import reddit from '../../../public/Home/reddit.png';
import facebook from '../../../public/Home/facebook.png';
import linkedin from '../../../public/Home/linkedin.png';
import twitter from '../../../public/Home/twitter.png';
import instagram from '../../../public/Home/instagram.png';
import googleplay from '../../../public/Home/get-it-on-google-play.png';
import appstore from '../../../public/Home/app-store-button.png';
import taxi from '../../../public/Home/taxi.jpg';
import blockchain from '../../../public/Home/blockchain.jpg';
import bitcoin from '../../../public/Home/bitcoin.jpg';

class Drive extends Component {
    render() {
        return(
          <div>
            <Header></Header>
            <div className={style.background}>
                <div className={style.inner}>
                  <Link to="/sign-up-driver" className={style.signUpBigBtn}>
                      <div className={style.signUpBigBtnBlock}>
                          <div className={style.blockStart}><span className={styleHome.yellow_span}>Taxi</span>Coin needs partners like you</div>
                          <div className={style.blockEnd}>SIGN UP</div>
                      </div>
                  </Link>
                </div>
            </div>

            <div className={styleRide.inner2}>
                <h1 className={styleHome.why__h1 + ' ' + styleRide.payWithTitle}>Earn <span className={styleHome.yellow_span}>tokens</span> when you want</h1>
                <h1 className={styleRide.payWithTitle + ' ' + styleRide.payWithTitle2}>The best way to increase your salary</h1>
            </div>

            <div className={style.driveBg}>
                <div className={styleRide.inner2}>
                    <span className={styleRide.signUpToRideSpan + ' ' + style.signUpToRideSpan}>With the thought of the <span className={styleHome.yellow_span}>drivers</span></span>
                    <p className={style.driveBg__p}>
                        Ready to make money? Just open the app to see travel queries near you.
                        The application tells you who you are driving and
                        directs you to your destination. When the trip is completed, you will receive other travel
                        requests near your location. You can unsubscribe at any time.
                    </p>
                </div>
            </div>

            <div className={styleRide.inner2}>
                <div className={styleHome.why}>
                    <div className={styleHome.flex}>
                        <div className={styleHome.why__item}>
                          <img className={styleHome.why__img} src={blockchain} alt="blockchain"/>
                          <h2 className={styleHome.why__h2}>You work on your own schedule</h2>
                          <p className={styleHome.why__p}>
                            You are the owner of yourself. You can ride with Uber
                            day or night. Manage your own life, not vice versa.
                          </p>
                        </div>
                        <div className={styleHome.why__item}>
                          <img className={styleHome.why__img} src={bitcoin} alt="bitcoin"/>
                          <h2 className={styleHome.why__h2}>You earn Taxi tokens</h2>
                          <p className={styleHome.why__p}>
                            The Taxi Coin Blockchain provides each driver earning our tokens for each trip.
                            Every day tokens rise in their price.
                          </p>
                        </div>
                        <div className={styleHome.why__item}>
                          <img className={styleHome.why__img} src={taxi} alt="taxi"/>
                          <h2 className={styleHome.why__h2}>You earn on your terms</h2>
                          <p className={styleHome.why__p}>
                            The more you ride, the more money you can make.
                            When demand is higher than usual, you can do even more.
                          </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styleRide.rideBg + ' ' + style.rideBg}>
                <div className={styleRide.inner2}>
                    <span className={styleRide.signUpToRideSpan + ' ' + style.signUpToRideSpan2}>Let's do it together with <span className={styleHome.yellow_span}>Taxi</span>Coin</span>
                    <Link to="/sign-up-driver"><button className={styleRide.signUpToRide}>SIGN UP TO DRIVE</button></Link>
                </div>
            </div>

            <div className={styleHome.review}>
                <h1 className={styleHome.why__h1}>Read our drivers reviews</h1>
                <div className={styleHome.yellow_border}></div>
                <div className={styleHome.slide_numberDisplayBlock}>
                    <p className={styleHome.slider__p}>
                        "I started driving with Uber because I
                        liked the idea that my own car could
                        make me money."
                    </p>
                    <span className={styleHome.slider__sign}>
                        <span className={style.slider__sign_name}>Brandon</span>, Coach and Chicago partner
                    </span>
                </div>
                <div className={styleHome.slideshow}>
                  <div className={styleHome.slide_wrapper}>
                    <div className={styleHome.slide}>
                        <div className={styleHome.slide_number}>
                            <p className={styleHome.slider__p}>
                                "I started driving with Uber because I
                                liked the idea that my own car could
                                make me money."
                            </p>
                            <span className={styleHome.slider__sign}>
                                <span className={styleHome.slider__sign_name}>Brandon</span>, Coach and Chicago partner
                            </span>
                        </div>
                    </div>
                    <div className={styleHome.slide}>
                        <div className={styleHome.slide_number}>
                            <p className={styleHome.slider__p}>
                                "I wanted something where I could
                                meet new people and get out of the house.
                                Uber has helped with both of those things, plus
                                I’m seeing new parts of the city I’ve never seen before!"
                            </p>
                            <span className={styleHome.slider__sign}>
                                <span className={styleHome.slider__sign_name}>Katrina</span>, Mother and Seattle partner
                            </span>
                        </div>
                    </div>
                    <div className={styleHome.slide}>
                        <div className={styleHome.slide_number}>
                            <p className={styleHome.slider__p}>
                                "Uber enables me to have the creative freedom for baking
                                my cakes and also driving on the side so I can make more
                                money and also have my dream job."
                            </p>
                            <span className={styleHome.slider__sign}>
                                <span className={styleHome.slider__sign_name}>Jenny</span>, Business owner and Los Angeles partner
                            </span>
                        </div>
                    </div>
                    <div className={styleHome.slide}>
                        <div className={styleHome.slide_number}>
                            <p className={styleHome.slider__p}>
                                "With Uber, I’m able to realize my goals. I’m able to pursue
                                my dreams. I’m able to stay focused on sharing amazing musical
                                experiences with the world."
                            </p>
                            <span className={styleHome.slider__sign}>
                                <span className={styleHome.slider__sign_name}>Sean</span>, Musician and LA partner
                            </span>
                        </div>
                    </div>
                  </div>
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

export default Drive;
