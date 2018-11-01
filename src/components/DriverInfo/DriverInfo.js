import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchDriverProfile, fetchDriverReviewList, setReview, fetchDriverPhoto, reviewListClear } from '../../actions/driverprofileaction';
import { openProfile } from '../../actions/globalviewaction';
import Loading from '../Loading/Loading';
import Alert from '../Alert/Alert';
import defaultphoto from '../../assets/default-user.png';
import style from './DriverInfo.css';

class DriverInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opinion: '',
        }
    }
    submit() {
        this.props.setReview(this.props.driverData.profile.id, this.state.opinion);
    }
    componentDidMount() {
        if (this.props.id) {
            this.props.fetchDriverProfile(this.props.id);
            //this.props.reviewListClear();
            this.props.fetchDriverReviewList(this.props.id);
        }
        if (this.props.match && this.props.match.params.id) {
            this.props.fetchDriverProfile(this.props.match.params.id);
            //this.props.reviewListClear();
            this.props.fetchDriverReviewList(this.props.match.params.id);
        }
    }
    componentDidUpdate() {
        // if (this.props.driverData.profile) {
        //     console.log(this.props.driverData.profile);
        // }
        // console.log(this.props.reviewListData);
    }
    renderDriverPhoto() {
        const { photoload, photourl, photoerror, profile } = this.props.driverData;
        if (photoload) {
            return <Loading />
        }
        if (photourl) {
            return <img src={this.props.driverData.photourl} alt='photo' />
        }
        if (photoerror) {
            return <Alert local={true} message='Photo dont load' click={() => { this.props.fetchDriverPhoto(null, profile.id) }} />
        }
        return <img src={defaultphoto} alt='photo' />;
    }
    renderDriverInfo() {
        const { loading, error, profile } = this.props.driverData;
        if (loading) {
            return <Loading />
        }
        if (error) {
            return <Alert local={true} message='Profile dont load' />
        }
        if (profile) {
            const { profile } = this.props.driverData
            return (
                <div>
                    <h2>Name : {profile.firstName} {profile.lastName}</h2>
                    <h2>phone: {profile.phoneNumber}</h2>
                    <h2>email: {profile.email}</h2>
                </div>
            );
        }
    }
    renderReviews() {
        const { loading, reviews, error } = this.props.reviewListData;
        const { profile } = this.props.driverData;
        if (loading) {
            return <Loading />
        }
        if (reviews) {
            return reviews.map((review, key) => {
                return (
                    <li key={key}>
                        <Review review={review} />
                    </li>
                );


            })
        }
        if (error) {
            return <Alert local={true} message='Comments dont load' click={() => { this.fetchDriverReviewList(profile.id) }} />
        }
        return null;
    }
    render() {
        return (
            <div className={style.infoConteiner}>
                <div className={style.general}>
                    <div className={style.driverInfoPhoto}>
                        {this.renderDriverPhoto()}
                    </div>
                    {this.renderDriverInfo()}
                </div>
                <div className={style.reviews}>
                    <h1>Write your review</h1>
                    <div className={style.newReview}>
                        <textarea type='text' placeholder="very interesting opinion" onChange={(e) => { this.setState({ opinion: e.target.value }) }} />
                        <button onClick={this.submit.bind(this)}>SEND</button>
                    </div>
                    <h1>Other reviews</h1>
                    <ul className={style.reviewList}>
                        {this.renderReviews()}
                    </ul>
                </div>
            </div>
        )
    }
}

const Review = ({ review }) => {
    return (
        <div className={style.reviewContainer}>
            <span className={style.reviewInfo}>{(new Date(review.creationTime)).toDateString()}</span>
            <b className={style.reviewMessage}>{review.message}</b>
        </div>
    );
}

DriverInfo.propTypes = {
    driverData: PropTypes.object,
    fetchDriverProfile: PropTypes.func,
    reviewListData: PropTypes.object,
    fetchDriverReviewList: PropTypes.func,
    setReview: PropTypes.func,
    fetchDriverPhoto: PropTypes.func,
    reviewListClear: PropTypes.func
}

const mapStateToProps = state => ({
    driverData: state.driverData,
    reviewListData: state.reviewListData,
    setReviewData: state.setReviewData,
});

const mapDispatchtoProps = dispatch => ({
    fetchDriverProfile: (id) => { dispatch(fetchDriverProfile(id)) },
    openProfile: () => { dispatch(openProfile()) },
    fetchDriverReviewList: (id) => { dispatch(fetchDriverReviewList(id)) },
    setReview: (id, message) => { dispatch(setReview(id, message)) },
    fetchDriverPhoto: () => { dispatch(fetchDriverPhoto(null, id)) },
    reviewListClear: () => { dispatch(reviewListClear()) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(DriverInfo);