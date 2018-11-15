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
import { getPhoto } from '../../../actions/photoaction';

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
        const { doc } = this.props.docData;
        const { photosData } = this.props;
        if (doc) {
            return (
                <div className={style.containerPhoto}>
                    <div className={style.docPhoto}>
                        {this.renderPhoto(photosData[doc.frontId], doc.frontId)}
                    </div>
                    <div className={style.docPhoto}>
                        {this.renderPhoto(photosData[doc.backId], doc.backId)}
                    </div>
                </div>
            );

        } else return <Alert local={true} message='Photo dont load' click={this.props.getDocPhoto} />
    }
    renderPhoto(photo, id) {
        if (photo) {
            if (photo.loading) {
                return <Loading />
            }
            if (photo.url) {
                return <img src={photo.url} alt='photo' onClick={() => { this.props.openImage(photo.url) }} />;
            } else if (photo.error) {
                return <Alert local={true} message='Photo dont load' click={() => { getPhoto(id) }} />
            }
        }
        return <img src={defaultphoto} alt='photo' onClick={() => { this.props.openImage(defaultphoto) }} />;
    }
    renderApproveImg() {
        if (this.props.docData.doc.isApproved) {
            return <img src={yes} title="Approved" alt='ApproveImg' />
        }
        return <img src={no} title="Not approved" alt='ApproveImg' />
    }
    render() {
        // console.log(this.props.docData.doc);
        const { loading, doc, error } = this.props.docData;
        if (loading) {
            return <Loading />
        }
        if (doc) {
            return (
                <div className={style.main}>
                    <div className={style.heading}>
                        <h1>DOCUMENTS</h1>
                        <div className={style.approveImg}>
                            {this.renderApproveImg()}
                        </div>
                    </div>
                    <div className={style.container}>
                        {this.renderMain()}
                        <div className={style.containerInfo}>
                            <h3>Approved: {(this.props.docData.doc.isApproved) ? 'Yes' : 'No'}</h3>
                        </div>
                    </div>
                </div>
            );
        }
        if (error) {
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
    photosData: PropTypes.object,
    getPhoto: PropTypes.func
}

const mapStateToProps = state => ({
    docData: state.docData,
    photosData: state.photosData,
})

const mapDispatchtoProps = dispatch => ({
    getDoc: () => { dispatch(getDocument()) },
    clearErrors: () => { dispatch(clearErrors()) },
    getDocPhoto: () => { dispatch(getDocPhoto()) },
    openImage: (url) => { dispatch(openImage(url)) },
    getPhoto: (id) => { dispatch(getPhoto(id)) }
})

export default connect(mapStateToProps, mapDispatchtoProps)(Documents);
