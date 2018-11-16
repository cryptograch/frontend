import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './Chat.css';

import Loading from '../Loading/Loading';
import Alert from '../Alert/Alert';
import ChatView from './ChatView';

import { connect } from 'react-redux';

import { getChannels, subscribe } from '../../actions/chataction';

class ChatChannels extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            channel: null,
        }
    }
    componentDidMount() {
        this.props.getChannels();
    }
    componentDidUpdate() {
    }
    openChat(channel) {
        if (!this.state.channel) {
            this.setState({ channel });
        } else {
            this.setState({ channel: null });
        }

    }
    submit() {
        this.props.subscribe(this.state.id);
    }
    renderChannels() {
        const { channels } = this.props.chatData;
        if (channels) {
            const { loading, list, error } = channels;
            if (loading) {
                return <Loading />
            }
            if (error) {
                return <Alert local message="Data dont load" click={this.props.getChannels} />
            }
            if (list && Array.isArray(list)) {
                return list.map((channel, key) => {
                  const { user } = this.props.userData;
                  const target = channel.members.filter(i => i.identityId !== user.identityId)[0];
                    return <li key={key} onClick={(e) => { this.openChat(channel) }}><Channel channel={channel} user={target}/></li>
                });
            }
            return 'No chats'
        }
        return "No chats";
    }
    renderChat() {
        const { channel } = this.state;
        if (channel) {
            return <ChatView channel={channel} />
        } else {
            return null;
        }
    }
    render() {
        return (
            <div>
                <form onSubmit={(e) => { e.preventDefault() }}>
                    <input type='text' onChange={(e) => { this.setState({ id: e.target.value }) }} placeholder="User id" />
                    <input type='submit' onClick={this.submit.bind(this)} value='Ok' />
                </form>

                <div>
                    <h1>Chats</h1>
                    <ul>
                        {this.renderChannels()}
                    </ul>
                </div>
                <div>
                    {this.renderChat()};
                </div>
            </div>
        );
    }
}

const Channel = ({ channel, user }) => {
    return (
        <div>
            <h3>{user.firstName} {user.lastName}</h3>
        </div>
    );
}

ChatChannels.propTypes = {
    chatData: PropTypes.object,
    subscribe: PropTypes.func,
    userData: PropTypes.object
}

const mapStateToProps = state => ({
    chatData: state.chatData,
    userData: state.userData
});

const mapDispatchtoProps = dispatch => ({
    getChannels: () => { dispatch(getChannels()) },
    subscribe: (id) => { dispatch(subscribe(id)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(ChatChannels);
