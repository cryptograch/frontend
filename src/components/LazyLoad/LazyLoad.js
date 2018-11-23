import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './LazyLoad.css';
import Loading from '../Loading/Loading';

class LazyLoad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comp: null,
            container: null,
        }
    }
    componentDidMount() {
        const comp = document.getElementById('lazyload');
        const container = document.getElementById('lz_container');
        if (container && this.props.container) {
            if (this.props.reverse) {
                this.scroll = this.scrollReverse.bind(this);
                container.addEventListener('scroll', this.scroll);
            } else {
                this.scroll = this.scrollNormal.bind(this);
                container.addEventListener('scroll', this.scroll);
            }
        } else {
            this.scroll = this.scrollNormal.bind(this);
            window.addEventListener('scroll', this.scroll);
        }
        this.setState({ comp, container }, () => {
            this.scroll();
        });
    }
    componentDidUpdate() {
        this.scroll();
    }
    scroll() {

    }
    scrollNormal() {
        if (!this.props.loading) {
            let wY = window.scrollY + window.innerHeight;
            let tC = this.state.comp.getBoundingClientRect().top;
            if (wY - tC > 10) {
                this.props.do();
            }
        }
    }
    scrollReverse() {
        if (!this.props.loading) {
            let sT = this.state.container.scrollTop;
            if (sT < 250) {
                this.props.do();
            }
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scroll);
        if (this.state.container) {
            this.state.container.removeEventListener('scroll', this.scroll);
        }
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
