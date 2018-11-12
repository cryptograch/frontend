import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './Rating.css';

import rank1 from '../../assets/Rank1.svg';
import rank2 from '../../assets/Rank2.svg';
import rank3 from '../../assets/Rank3.svg';
import rank4 from '../../assets/Rank4.svg';
import rank5 from '../../assets/Rank5.svg';


class Rating extends Component {
    renderImg(rating) {
        if (rating < 0) {
            return null;
        }
        if (rating <= 1) {
            return <img src={rank1} alt='Beginer' />;
        }
        if (rating <= 2) {
            return <img src={rank2} alt='Novice' />;
        }
        if (rating <= 3) {
            return <img src={rank3} alt='Normal' />;
        }
        if (rating <= 4) {
            return <img src={rank4} alt='Pro' />;
        }
        if (rating <= 5) {
            return <img src={rank5} alt='Grach' />;
        }
        return null;
    }
    render() {
        return (
            <div className={style.container}>
                Rating:
                <div className={style.imgContent}>{this.renderImg(this.props.rating)}</div>
                <label>{this.props.rating}</label>
            </div>
        );
    }
}

Rating.propTypes = {
    rating: PropTypes.number.isRequired
}

export default Rating;
