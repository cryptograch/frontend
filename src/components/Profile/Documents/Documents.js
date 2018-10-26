import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Documents.css';
import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import defaultphoto from '../../../assets/default-license.png';
import no from '../../../assets/no.svg';
import yes from '../../../assets/yes.svg';

import { connect } from 'react-redux';

import { getDocument, getDocPhoto } from '../../../actions/docaction';
import { clearErrors } from '../../../actions/authaction';
import { openImage } from "../../../actions/globalviewaction";
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
            return <img src={photo.url} alt='photo' click={() => { this.props.openImage(photo.url) }} />;
        } else if (photo.errorphoto) {
            //handle errors here
        }
        return <img src={defaultphoto} alt='photo' click={() => { this.props.openImage(defaultphoto) }} />;
    }
    renderApproveImg() {
        if (this.props.docData.doc.isApproved) {
            return <img src={yes} title="Approved" alt='ApproveImg' />
        }
        return <img src={no} title="Not approved" alt='ApproveImg' />
    }
    render() {
        // console.log(this.props.docData.doc);
        if (this.props.docData.loaddoc) {
            return <Loading />
        }
        if (this.props.docData.doc) {
            return (
                <div className={style.main}>
                    <div className={style.heading}>
                        <h1>DOCUMENTS</h1>
                        <div className={style.approveImg}>
                            {this.renderApproveImg()}
                        </div>
                    </div>
                    <div className={style.container}>
                        <div className={style.containerPhoto}>
                            {this.renderMain()}
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
    openImage: PropTypes.func,
}

const mapStateToProps = state => ({
    docData: state.docData,
})

const mapDispatchtoProps = dispatch => ({
    getDoc: () => { dispatch(getDocument()) },
    clearErrors: () => { dispatch(clearErrors()) },
    getDocPhoto: () => { dispatch(getDocPhoto()) },
    openImage: (url) => { dispatch(openImage(url)) }
})

export default connect(mapStateToProps, mapDispatchtoProps)(Documents);
