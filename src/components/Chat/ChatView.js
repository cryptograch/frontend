import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './Chat.css';

import Loading from '../Loading/Loading';
import Alert from '../Alert/Alert';

import { connect } from 'react-redux';

import { getMessages, send } from "../../actions/chataction";

class ChatView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        }
    }
    componentDidMount() {
        const { channel, getMessages } = this.props;
        if (channel.id) {
            getMessages(channel.id);
        }
    }
    componentDidUpdate() {
    }
    submit() {
        const { send, channel, userData } = this.props;
        const targetUser = channel.members.filter(i => i.identityId !== userData.user.identityId )[0];
        if (targetUser && targetUser.identityId) {
            send(targetUser.identityId, this.state.message);
        }
    }
    renderMessages() {
        const { channel, chatData } = this.props;
        const { messages } = chatData;
        if (Array.isArray(messages.list)) {
            return messages.list.slice(0).reverse().map((message, key) => {
                const user = channel.members.filter(i => i.identityId === message.userId)[0];
                return <li key={key}><Message message={message} user={user} /></li>
            })
        }
    }
    render() {
        return (
            <div className={style.chatView}>
                <div>
                    <ul>
                        {this.renderMessages()}
                    </ul>
                </div>
                <form onSubmit={(e) => { e.preventDefault() }}>
                    <textarea type='text' placeholder='Your message' onChange={(e) => { this.setState({ message: e.target.value }) }}></textarea>
                    <input type='submit' value='Send' onClick={this.submit.bind(this)} />
                </form>
            </div>
        );
    }
}

const Message = ({ message, user }) => {
    return (
        <div>
            <h3>{user.firstName} {user.lastName} {message.publicationTime}</h3>
            <p>{message.message}</p>
        </div>
    );
}

ChatView.propTypes = {
    chatData: PropTypes.object,
    getMessages: PropTypes.func,
    send: PropTypes.func,
    userData: PropTypes.object,
}

const mapStateToProps = state => ({
    chatData: state.chatData,
    userData: state.userData,
});

const mapDispatchtoProps = dispatch => ({
    getMessages: (id) => { dispatch(getMessages(id)) },
    send: (id, message) => { dispatch(send(id, message)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(ChatView);
