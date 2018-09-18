import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './NotFound.css';
import Header from '../Header/Header';

class NotFound extends Component {
    render() {
        return (
            <div >
                <Header></Header>
                <div className={style.notFoundContainer}>
                    <div className={style.notFoundMain}>
                        <h1><span>4</span>0<span>4</span></h1>
                        <h2><span>Not</span> Found</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default NotFound;
