import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import qs from 'query-string';
import style from './Home.css';
import Header from '../Header/Header';
import Alert from '../Alert/Alert';

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

import { connect } from 'react-redux';

class Home extends Component {
    renderAlert() {
        const letter = qs.parse(this.props.location.search).letter;
        if (letter) {
            if (letter === 'Success') {
                return <Alert global={true} success="Email confirmed" click={() => { this.props.history.replace('/') }} />
            } else {
                return <Alert global={true} error={letter} click={() => { this.props.history.replace('/') }} />
            }
        }
        return null;
    }
    render() {
        return (
            <div>
                {this.renderAlert()}
                <Header></Header>
                <div className={style.banner}>
                    <div className={style.inner}>
                        <h1 className={style.banner_title}><span className={style.yellow_span}>TAXI</span> Coin</h1>
                        <h2 className={style.banner_sign}>Revolutionizing <span className={style.yellow_span}>taxi</span> with the blockchain</h2>
                        <Link to="/ride"><button className={style.bannerBtn + " " + style.rideBtn}>RIDE</button></Link>
                        <Link to="/drive"><button className={style.bannerBtn + " " + style.driveBtn}>DRIVE</button></Link>
                    </div>
                </div>

                <div className={style.howItWorks}>
                    <div className={style.inn}>
                        <h1 className={style.why__h1}>How <span className={style.yellow_span}>it</span> works?</h1>
                        <div className={style.yellow_border}></div>
                        <div className={style.flexHowItWorks}>
                            <div className={style.howItWorksFlexItem}>
                                <h2 className={style.howItWorks__h2}>For Riders</h2>
                                <ol className={style.howItWorksOl}>
                                    <li><a className={style.howItWorksA}>Download the app</a></li>
                                    <p className={style.howItWorksP}>
                                        Get the free Uber app from the App Store or Google Play
                                        on your smartphone. Open the app to create your account.
                                    </p>
                                    <li><a className={style.howItWorksA}>Request the trip</a></li>
                                    <p className={style.howItWorksP}>
                                        Enter your destination and choose a ride option. You’ll always see the price up front.
                                    </p>
                                    <li><a className={style.howItWorksA}>Ride</a></li>
                                    <p className={style.howItWorksP}>
                                        You'll see your driver's picture and vehicle details, and can track their arrival on the map.
                                    </p>
                                    <li><a className={style.howItWorksA}>Pay crypto</a></li>
                                    <p className={style.howItWorksP}>
                                        The Taxi Coin Blockchain provides each user paying for the trip by our tokens.
                                    </p>
                                </ol>
                            </div>
                            <div className={style.howItWorksFlexItem}>
                                <h2 className={style.howItWorks__h2}>For Drivers</h2>
                                <ol className={style.howItWorksOl}>
                                    <li><a className={style.howItWorksA}>Register online</a></li>
                                    <p className={style.howItWorksP}>
                                        Do you have an email address and smartphone? Great, now tell us a
                                        bit more about yourself and we will help you to get started.
                                    </p>
                                    <li><a className={style.howItWorksA}>Upload your documents</a></li>
                                    <p className={style.howItWorksP}>
                                        Prepare the necessary documents.
                                    </p>
                                    <li><a className={style.howItWorksA}>Get a vehicle</a></li>
                                    <p className={style.howItWorksP}>
                                        What car do you want to use for riding? Make sure it meets standards in your country.
                                    </p>
                                    <li><a className={style.howItWorksA}>Activate your account</a></li>
                                    <p className={style.howItWorksP}>
                                        If you have completed all of the steps above, welcome! You are ready to
                                        activate your account and start making money.
                                    </p>
                                    <li><a className={style.howItWorksA}>Earn tokens for each trip</a></li>
                                    <p className={style.howItWorksP}>
                                        The Taxi Coin Blockchain provides each driver earns tokens for the trip
                                        what he can change on whatever currency what he want.
                                    </p>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.becomeDriver}>
                    <div className={style.inner}>
                        <h2 className={style.becomeDriver__h2}>
                            <span className={style.whiteSpan}>Drive when you want</span> <br />
                            Make what you need
                        </h2>
                        <Link to="/drive"><button className={style.bannerBtn + " " + style.driveBtn}>BECOME A DRIVER</button></Link>
                    </div>
                </div>

                <div className={style.why}>
                    <h1 className={style.why__h1}>Why this <span className={style.yellow_span}>TAXI</span>?</h1>
                    <div className={style.yellow_border}></div>
                    <div className={style.flex}>
                        <div className={style.why__item}>
                            <img className={style.why__img} src={blockchain} alt="blockchain" />
                            <h2 className={style.why__h2}>BLOCKCHAIN IS SECURE</h2>
                            <p className={style.why__p}>
                                The records on a blockchain are secured through cryptography.
                                Network participants have their own private keys that are assigned
                                to the transactions they make and act as a personal digital signature.
                                All trips will be recorded.
                            </p>
                        </div>
                        <div className={style.why__item}>
                            <img className={style.why__img} src={bitcoin} alt="bitcoin" />
                            <h2 className={style.why__h2}>PAY CRYPTO</h2>
                            <p className={style.why__p}>
                                With a unique currency, fair compensation, transparent contracts and no intermediaries.
                                Taxi Coin is revolutionizing the creation and distribution of value for taxi activity.
                                The Taxi Coin Blockchain provides each user paying for the trip by our tokens.
                            </p>
                        </div>
                        <div className={style.why__item}>
                            <img className={style.why__img} src={taxi} alt="taxi" />
                            <h2 className={style.why__h2}>TAXI OF THE FUTURE</h2>
                            <p className={style.why__p}>
                                Blockchain could have a similarly disruptive effect to the internet, or it could be the next Y2K.
                                It’ll be up to innovators, disruptors, and visionaries to accept, or address the “status quo” and
                                ultimately, create a better financial system for all people.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={style.review}>
                    <h1 className={style.why__h1}>Read our drivers reviews</h1>
                    <div className={style.yellow_border}></div>
                    <div className={style.slide_numberDisplayBlock}>
                        <p className={style.slider__p}>
                            "I started driving with Uber because I
                            liked the idea that my own car could
                            make me money."
                    </p>
                        <span className={style.slider__sign}>
                            <span className={style.slider__sign_name}>Brandon</span>, Coach and Chicago partner
                    </span>
                    </div>
                    <div className={style.slideshow}>
                        <div className={style.slide_wrapper}>
                            <div className={style.slide}>
                                <div className={style.slide_number}>
                                    <p className={style.slider__p}>
                                        "I started driving with Uber because I
                                        liked the idea that my own car could
                                        make me money."
                            </p>
                                    <span className={style.slider__sign}>
                                        <span className={style.slider__sign_name}>Brandon</span>, Coach and Chicago partner
                            </span>
                                </div>
                            </div>
                            <div className={style.slide}>
                                <div className={style.slide_number}>
                                    <p className={style.slider__p}>
                                        "I wanted something where I could
                                        meet new people and get out of the house.
                                        Uber has helped with both of those things, plus
                                        I’m seeing new parts of the city I’ve never seen before!"
                            </p>
                                    <span className={style.slider__sign}>
                                        <span className={style.slider__sign_name}>Katrina</span>, Mother and Seattle partner
                            </span>
                                </div>
                            </div>
                            <div className={style.slide}>
                                <div className={style.slide_number}>
                                    <p className={style.slider__p}>
                                        "Uber enables me to have the creative freedom for baking
                                        my cakes and also driving on the side so I can make more
                                        money and also have my dream job."
                            </p>
                                    <span className={style.slider__sign}>
                                        <span className={style.slider__sign_name}>Jenny</span>, Business owner and Los Angeles partner
                            </span>
                                </div>
                            </div>
                            <div className={style.slide}>
                                <div className={style.slide_number}>
                                    <p className={style.slider__p}>
                                        "With Uber, I’m able to realize my goals. I’m able to pursue
                                        my dreams. I’m able to stay focused on sharing amazing musical
                                        experiences with the world."
                            </p>
                                    <span className={style.slider__sign}>
                                        <span className={style.slider__sign_name}>Sean</span>, Musician and LA partner
                            </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.readMore}>
                    <h1 className={style.readMore__h1}>Try more in our <span className={style.yellow_span}>app</span></h1>
                    <div className={style.yellow_border}></div>
                    <div className={style.flex}>
                        <div>
                            <a href="#">
                                <img className={style.getItOnImg} src={googleplay} alt="get-it-on-google-play" />
                            </a>
                        </div>
                        <div>
                            <a href="#">
                                <img className={style.getItOnImg} src={appstore} alt="get-it-on-google-play" />
                            </a>
                        </div>
                    </div>
                    <h2 className={style.readMore__h2}>Go in<span className={style.yellow_span}> social</span></h2>
                    <div className={style.flexIcons}>
                        <div className={style.socialIcon}>
                            <a href="#">
                                <img className={style.socialImg} src={twitter} alt="twitter" />
                            </a>
                        </div>
                        <div className={style.socialIcon}>
                            <a href="#">
                                <img className={style.socialImg} src={facebook} alt="facebook" />
                            </a>
                        </div>
                        <div className={style.socialIcon}>
                            <a href="#">
                                <img className={style.socialImg} src={instagram} alt="instagram" />
                            </a>
                        </div>
                        <div className={style.socialIcon}>
                            <a href="#">
                                <img className={style.socialImg} src={linkedin} alt="linkedin" />
                            </a>
                        </div>
                        <div className={style.socialIcon}>
                            <a href="#">
                                <img className={style.socialImg} src={reddit} alt="reddit" />
                            </a>
                        </div>
                        <div className={style.socialIcon}>
                            <a href="#">
                                <img className={style.socialImg} src={telegram} alt="telegram" />
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

Home.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object
}

const mapStateToProps = state => ({
    history: state.historyData.history
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
