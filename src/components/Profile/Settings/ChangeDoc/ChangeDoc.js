import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../Settings.css';

import { connect } from 'react-redux';

import { uploadDocument } from '../../../../actions/docaction';
import licencedefault from '../../../../assets/default-license.png';
import userdefault from '../../../../assets/default-user.png';

class ChangeDoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docphoto: null,
            docphotourl: null,
            dayFrom: "",
            yearFrom: "",
            monthFrom: "",
            dayTo: "",
            yearTo: "",
            monthTo: "",
            fileName: "Choose file",
        }
        this.chooseDocPhoto = this.chooseDocPhoto.bind(this);
    }
    chooseDocPhoto(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({ docphotourl: reader.result });
            };
            reader.readAsDataURL(file);
            this.setState({
                docphoto: file,
                fileName: file.name,
            });
        }
    }
    uploadDoc() {
        this.props.uploadDocument({
            dayFrom: this.state.dayFrom,
            yearFrom: this.state.yearFrom,
            monthFrom: this.state.monthFrom,
            dayTo: this.state.dayTo,
            yearTo: this.state.yearTo,
            monthTo: this.state.monthTo,
        }, this.state.docphoto);
    }
    render() {

        if (this.props.userData.user) {
            return (
                <div className={style.docContainer}>
                    <h2 className={style.docTitle}>Add your license photo</h2>
                    <div className={style.docPhoto}>
                        <div className={style.docPhotoPreload}>
                            <img src={(this.state.docphotourl) ? this.state.docphotourl : licencedefault} alt='photo' />
                        </div>
                        <div className={style.docPhotoInput}>
                            <input type='file' accept='image/*' onChange={(e) => { this.chooseDocPhoto(e) }} />
                            <label>Choose</label><input type='text' value={this.state.fileName} placeholder='File' readOnly />
                        </div>
                    </div>
                    <h2 className={style.docTitle}>Add your license info</h2>
                    <div className={style.docMain}>
                        <div className={style.docMainSide}>
                            <div className={style.docMainTitle}>Driver License</div>
                            <div className={style.docMainPhoto}>
                                <img src={userdefault} alt='photo' />
                            </div>
                        </div>
                        <div className={style.docInfo}>
                            <div className={style.docInfoRow}><label>From:</label></div>
                            <div className={style.docInfoRow}>
                                <input className={style.signInInput} type='text' placeholder="Day" required onChange={(e) => { this.setState({ dayFrom: e.target.value }) }} />
                                <input className={style.signInInput} type='text' placeholder="Mon" required onChange={(e) => { this.setState({ monthFrom: e.target.value }) }} />
                                <input className={style.signInInput} type='text' placeholder="Year" required onChange={(e) => { this.setState({ yearFrom: e.target.value }) }} />
                            </div>
                            <div className={style.docInfoRow}><label>To:</label></div>
                            <div className={style.docInfoRow}>
                                <input className={style.signInInput} type='text' placeholder="Day" required onChange={(e) => { this.setState({ dayTo: e.target.value }) }} />
                                <input className={style.signInInput} type='text' placeholder="Mon" required onChange={(e) => { this.setState({ monthTo: e.target.value }) }} />
                                <input className={style.signInInput} type='text' placeholder="Year" required onChange={(e) => { this.setState({ yearTo: e.target.value }) }} />
                            </div>
                        </div>
                    </div>
                    <div className={style.docSubmit}>
                        <button className={style.button} onClick={this.uploadDoc.bind(this)}>SUBMIT</button>
                    </div>
                </div>
            );
            /*  return (
                 <div className={style.changeDoc}>
                     <div className={style.changePhoto}>
                       <h1>Add Documents</h1>
                       <input type='file' id="pfotoloader" className={style.pfotoinput} accept='image/*' onChange={(e) => { this.chooseDocPhoto(e) }} />
                       <label htmlFor="pfotoloader" ><span><strong>{this.state.fileName}</strong></span></label>
                     </div>
                     <div className={style.docForm}>
                         <h1>Date of issue</h1>
                         <div className={style.date}>
                             <input className={style.signInInput} type='text' placeholder="Day" required onChange={(e) => { this.setState({ dayFrom: e.target.value }) }} />
                             <input className={style.signInInput} type='text' placeholder="Mon" required onChange={(e) => { this.setState({ monthFrom: e.target.value }) }} />
                             <input className={style.signInInput} type='text' placeholder="Year" required onChange={(e) => { this.setState({ yearFrom: e.target.value }) }} />
                         </div>
                         <h1>Valid until</h1>
                         <div className={style.date}>
                             <input className={style.signInInput} type='text' placeholder="Day" required onChange={(e) => { this.setState({ dayTo: e.target.value }) }} />
                             <input className={style.signInInput} type='text' placeholder="Mon" required onChange={(e) => { this.setState({ monthTo: e.target.value }) }} />
                             <input className={style.signInInput} type='text' placeholder="Year" required onChange={(e) => { this.setState({ yearTo: e.target.value }) }} />
                         </div>
                     </div>
                     <button className={style.signInInputSubmit} onClick={this.uploadDoc.bind(this)}>SUBMIT</button>
                 </div>
             ); */
        }
        return null;
    }
}

// Check props type
ChangeDoc.propTypes = {
    userData: PropTypes.object,
}

const mapStateToProps = state => ({
    userData: state.userData
})

const mapDispatchtoProps = dispatch => ({
    uploadDocument: (data, file) => { dispatch(uploadDocument(data, file)) },
})

export default connect(mapStateToProps, mapDispatchtoProps)(ChangeDoc);
