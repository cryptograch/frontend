import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import style from './AdminUserItem.css';

import { connect } from 'react-redux';
import { sendResponse } from "../../../actions/adminaction";

class AdminUserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
        }
    }
    componentDidMount() {

    }
    componentDidUpdate() {

    }
    submit() {
        this.props.sendResponse(this.props.data.id, this.state.message);
    }
    render() {
        if (this.props.data) {
            return (
                <div className={`${style.adminUserContent}`}>
                    <form className={style.adminUserResForm} onSubmit={(e) => { e.preventDefault() }}>
                        <h3>Please write you response</h3>
                        <textarea type="text" value={this.state.message} placeholder="You message"
                            onChange={(e) => { this.setState({ message: e.target.value }) }} />
                        <input type="submit" value="Submit" onClick={this.submit.bind(this)} />
                    </form>
                </div>
            );
        }
        return null;
    }
}

// Check props type
AdminUserProfile.propTypes = {
    data: PropTypes.object,
    sendResponse: PropTypes.func
}

const mapStateToProps = state => ({

});

const mapDispatchtoProps = dispatch => ({
    sendResponse: (id, mess) => { dispatch(sendResponse(id, mess)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(AdminUserProfile);
