import React, { Component } from 'react';
import style from './Loading.css';

class Loading extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.global) {
            return (
                <div className={style.loadcontainer}>
                    <div className={style.loadmain}>
                        <div className={`${style.loadshape} ${style.shapeone}`}></div>
                        <div className={`${style.loadshape} ${style.shapetwo}`}></div>
                        <div className={`${style.loadshape} ${style.shapethree}`}></div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={style.loadcontainerlocal}>
                    <div className={style.loadmain}>
                        <div className={`${style.loadshape} ${style.shapeone}`}></div>
                        <div className={`${style.loadshape} ${style.shapetwo}`}></div>
                        <div className={`${style.loadshape} ${style.shapethree}`}></div>
                    </div>
                </div>
            );
        }
    }
}

export default Loading;
