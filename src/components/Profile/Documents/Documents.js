import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Documents.css';
import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import defaultphoto from '../../../assets/default-license.png';

import { connect } from 'react-redux';

import { getDocument, getDocPhoto } from '../../../actions/docaction';
import { clearErrors } from '../../../actions/authaction';

class Documents extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (!this.props.docData.doc) {
            this.props.getDoc();
        }
    }
    renderMain() {
        if (this.props.docData.loadphoto) {
            return <Loading />
        }
        if (this.props.docData.photos) {
            return this.props.docData.photos.map((photo, key) => {
                return (
                    <div key={key} className={style.docPhoto}>
                        {this.renderPhoto(photo, key)}
                    </div>
                );
            });
        } else return <Alert local={true} message='Photo dont load' click={this.props.getDocPhoto} />
    }
    renderPhoto(photo) {
        if (photo.url) {
            return <img src={photo.url} alt='photo' />;
        } else if (photo.errorphoto) {
            //handle errors here
        }
        return <img src={defaultphoto} alt='photo' />;
    }
    render() {
        // console.log(this.props.docData.doc);
        if (this.props.docData.loaddoc) {
            return <Loading />
        }
        if (this.props.docData.doc) {
            return (
                <div className={style.main}>
                    <h1 className={style.heading}>DOCUMENTS</h1>
                    <div className={style.container}>
                        <div className={style.containerPhoto}>
                            {this.renderMain()}
                            {/* <div className={style.docPhoto}>
                                
                            </div> */}
                        </div>
                        <div className={style.containerInfo}>
                            <h3>Approved: {(this.props.docData.doc.isApproved) ? 'Yes' : 'No'}</h3>
                        </div>
                    </div>
                </div>
            );
        }
        if (this.props.docData.errordoc) {
            return (
                <div className={style.main}>
                    {/* <Alert global={true} error={this.props.docData.errordoc} click={this.props.clearErrors} /> */}
                    <Alert local={true} message='Data dont load' click={this.props.getDoc} />
                </div>
            );
        }
        return null;
    }
}

// Check props type
Documents.propTypes = {
    docData: PropTypes.object,
    getDoc: PropTypes.func,
    clearErrors: PropTypes.func,
    getDocPhoto: PropTypes.func,
}

const mapStateToProps = state => ({
    docData: state.docData,
})

const mapDispatchtoProps = dispatch => ({
    getDoc: () => { dispatch(getDocument()) },
    clearErrors: () => { dispatch(clearErrors()) },
    getDocPhoto: () => { dispatch(getDocPhoto()) }
})

export default connect(mapStateToProps, mapDispatchtoProps)(Documents);
