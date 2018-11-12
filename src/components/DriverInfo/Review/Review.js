import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';
import defaultphoto from '../../../assets/default-user.png';
import style from './Review.css';
import { apiurl } from '../../../appconfig';

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoload: false,
            photoerror: null,
            photourl: null,
        }
    }
    componentDidMount() {
        const { review } = this.props;
        if (review.pictureId) {
            this.fetchPhoto(review.pictureId);
        }
    }
    componentDidUpdate() {
    }
    fetchPhoto(id) {
        if (id && !this.state.photoload && !this.state.photourl) {
            const token = this.props.tokenData.token;
            this.setState({ photoload: true });
            fetch(`${apiurl}/api/images/${id}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        return res.blob();
                    } else if (res.status === 404) {
                        this.setState({ photourl: defaultphoto });
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(blob => {
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        this.setState({ photourl: url, photoload: false });
                    }
                })
                .catch(error => this.setState({ photoerror: error.message, photoload: false }));
        }
    }
    renderPhoto() {
        const { photoload, photourl, photoerror } = this.state;
        if (photoload) {
            return <Loading />
        }
        if (photourl) {
            return <img src={photourl} alt='photo' />
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
    tokenData: PropTypes.object
}

const mapStateToProps = state => ({
    tokenData: state.tokenData
});

const mapDispatchtoProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchtoProps)(Review);