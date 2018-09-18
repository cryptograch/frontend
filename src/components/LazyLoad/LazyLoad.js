import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './LazyLoad.css';
import Loading from '../Loading/Loading';

class LazyLoad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comp: null,
        }
    }
    componentDidMount() {
        const comp = document.getElementById('lazyload');
        window.addEventListener('scroll', this.scroll.bind(this));
        this.setState({ comp }, () => {
            this.scroll();
        });
    }
    componentDidUpdate() {
        this.scroll();
    }
    scroll() {
        if (!this.props.loading) {
            let wY = window.scrollY + window.innerHeight;
            let tC = this.state.comp.getBoundingClientRect().top;
            if (wY - tC > 10) {
                this.props.do();
            }
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scroll);
    }
    render() {
        return <div id="lazyload" className={style.LazyLoad} onClick={this.props.do}><Loading /></div>
    }
}

// Check props type
LazyLoad.propTypes = {
    do: PropTypes.func,
    loading: PropTypes.bool,
    active: PropTypes.bool,
}

export default LazyLoad;
