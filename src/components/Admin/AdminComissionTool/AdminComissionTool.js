import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';
import profilestyle from '../../Profile/Profile.css';

import profilemainstyle from '../../Profile/ProfileMain/ProfileMain.css';
import style from './AdminComissionTool.css';

import { connect } from 'react-redux';
import { changeClearError, setComission } from '../../../actions/adminaction';

class AdminComissionTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comission: 0,
        }
    }
    componentDidMount() {
    }
    componentDidUpdate() {
    }
    submit() {
        this.props.setComission(this.state.comission);
    }
    renderAlert() {
        if (this.props.changeData.loading) {
            return <Loading global={true} />
        }
        if (this.props.changeData.error) {
            return <Alert global={true} error={this.props.changeData.error} click={this.props.changeClearError} />
        }
        if (this.props.changeData.success) {
            return <Alert global={true} success={this.props.changeData.success} click={this.props.changeClearError} />
        }
        return null;
    }
    render() {
        return (
            <div className={`${profilestyle.profileMain}`}>
                {this.renderAlert()}
                <h3 className={profilemainstyle.heading}>Commission Tool</h3>
                <form className={style.comissionForm} onSubmit={(e) => { e.preventDefault() }}>
                    <h3>Set new commission value</h3>
                    <input type="number" onChange={(e) => { this.setState({ comisson: e.target.value }) }} min="0"/>
                    <input type="submit" onClick={this.submit.bind(this)} value="Submit" onClick={this.submit.bind(this)} />
                </form>
            </div>
        );
    }
}

// Check props type
AdminComissionTool.propTypes = {
    changeData: PropTypes.object,
    changeClearError: PropTypes.func,
    setComission: PropTypes.func
}

const mapStateToProps = state => ({
    changeData: state.adminChangeData,
});

const mapDispatchtoProps = dispatch => ({
    changeClearError: () => { dispatch(changeClearError()) },
    setComission: (value) => { dispatch(setComission(value)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(AdminComissionTool);
