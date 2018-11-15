import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import defaultphoto from '../../../assets/default-user.png';
import style from './Review.css';
import { apiurl } from '../../../appconfig';

import { getPhoto } from "../../../actions/photoaction";

class Review extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { review, photosData, getPhoto } = this.props;
        if (review.pictureId && !photosData[review.pictureId]) {
            getPhoto(review.pictureId);
        }
    }
    componentDidUpdate() {
    }
    renderPhoto() {
        const { review, photosData, getPhoto } = this.props;
        if (review.pictureId && photosData[review.pictureId]) {
            const { loading, url, error } = this.props.photosData[review.pictureId]
            if (loading) {
                return <Loading />
            }
            if (url) {
                return <img src={url} alt='photo' />
            }
            if (error) {
                return <Alert local message='Photo dont load' click={() => { getPhoto(review.pictureId) }} />
            }
            return <img src={defaultphoto} alt='photo' />
        }
        return <img src={defaultphoto} alt='photo' />
    }
    render() {
        const { review } = this.props;
        return (
            <div className={style.reviewContainer}>
                <div className={style.reviewPhoto}>
                    {this.renderPhoto()}
                </div>
                <div className={style.reviewContent}>
                    <span className={style.reviewInfo}>{review.firstName} {review.lastName} <time>{(new Date(review.creationTime)).toDateString()}</time></span>
                    <div className={style.reviewMessage}>{review.message}</div>
                </div>
            </div>
        )
    }
}

Review.propTypes = {
    review: PropTypes.object.isRequired,
    reviewListData: PropTypes.object,
    getPhoto: PropTypes.func,
    photosData: PropTypes.object
}

const mapStateToProps = state => ({
    reviewListData: state.reviewListData,
    photosData: state.photosData,
});

const mapDispatchtoProps = dispatch => ({
    getPhoto: (id) => { dispatch(getPhoto(id)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(Review);