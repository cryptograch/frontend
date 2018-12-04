import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Chat.css';

import Loading from '../Loading/Loading';
import Alert from '../Alert/Alert';
import ChatView from './ChatView';
import defaultphoto from '../../assets/default-user.png';
import ScrollPane from './ScrollPane';
import { connect } from 'react-redux';

import { getChannels, subscribe, listClear } from '../../actions/chataction';
import { getPhoto } from '../../actions/photoaction';

class ChatChannels extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            channel: null,
            scroll: 0,
            active: false,
        }
        this.scrollRef = React.createRef();
        this.viewRef = React.createRef();
    }
    componentDidMount() {
        this.props.getChannels();
    }
    componentDidUpdate() {
        const { channels } = this.props.chatData;
        const { user } = this.props.userData;
        const { getPhoto, photosData } = this.props;
        if (Array.isArray(channels.list)) {
            channels.list.forEach(channel => {
                const curruser = channel.members.filter(i => i.identityId !== user.identityId)[0];
                if (curruser && curruser.profilePictureId && !photosData[curruser.profilePictureId]) {
                    getPhoto(curruser.profilePictureId);
                }
            });
        }
    }
    componentWillUnmount() {
    }
    openChat(channel) {
        if (this.state.channel !== channel) {
            this.props.listClear();
            this.setState({ channel });
        }
    }
    submit() {
        this.props.subscribe(this.state.id);
    }
    renderChannels() {
        const { channels } = this.props.chatData;
        const { user } = this.props.userData;
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
                    let curruser;
                    if (channel.members && channel.members.length === 1) {
                        curruser = channel.members[0];
                    } else {
                        curruser = channel.members.filter(i => i.identityId !== user.identityId)[0];
                    }
                    return <li key={key} onClick={(e) => { this.openChat(channel) }}>{this.renderChannel(curruser)}</li>
                });
            }
            return <label>No chats</label>;
        }
        return <label>No chats</label>;
    }
    renderPhoto(id) {
        const { photosData, getPhoto } = this.props;
        if (id && photosData[id]) {
            const { loading, url, error } = photosData[id];
            if (url) {
                return <img src={url} alt='photo' />;
            }
            if (loading) {
                return <Loading />
            }
            if (error) {
                return <Alert local={true} message='Photo dont load' click={() => { getPhoto(id) }} />
            }
            return <img src={defaultphoto} className={style.profilePhoto} alt='photo' />;
        }
        return <img src={defaultphoto} className={style.profilePhoto} alt='photo' />;
    }
    renderChannel(user) {
        if (user) {
            return (
                <div className={style.channelContainer}>
                    <div className={style.channelPhoto}>
                        {this.renderPhoto(user.profilePictureId)}
                    </div>
                    <label>{user.firstName} {user.lastName}</label>
                </div>
            );
        }
        return null;
    }
    renderChat() {
        const { channel } = this.state;
        if (channel) {
            return <ChatView channel={channel} />
        } else {
            return null
        }
    }
    render() {
        return (
            <div>
                <h1 className={style.title}>CHATS</h1>
                <form className={style.formSearch} onSubmit={(e) => { e.preventDefault() }}>
                    <input className={style.idInput} type='text' onChange={(e) => { this.setState({ id: e.target.value }) }} placeholder="User id" />
                    <input className={style.input} type='submit' onClick={this.submit.bind(this)} value='Search' />
                </form>

                <div ref={this.viewRef} className={style.channelList}>
                    <ul ref={this.scrollRef} className={style.usersList}>
                        {this.renderChannels()}
                    </ul>
                    <ScrollPane horizontal scrollRef={this.scrollRef} viewRef={this.viewRef}/>
                </div>
                <div>
                    {this.renderChat()}
                </div>
            </div>
        );
    }
}

// const Channel = ({ user }) => {
//     if (user) {
//         return (
//             <div>
//                 <h3>{user.firstName} {user.lastName}</h3>
//             </div>
//         );
//     }

// }

ChatChannels.propTypes = {
    chatData: PropTypes.object,
    subscribe: PropTypes.func,
    listClear: PropTypes.func,
    userData: PropTypes.object,
    getPhoto: PropTypes.func,
    photosData: PropTypes.object
}

const mapStateToProps = state => ({
    chatData: state.chatData,
    userData: state.userData,
    photosData: state.photosData,
});

const mapDispatchtoProps = dispatch => ({
    getChannels: () => { dispatch(getChannels()) },
    subscribe: (id) => { dispatch(subscribe(id)) },
    listClear: () => { dispatch(listClear()) },
    getPhoto: (id) => { dispatch(getPhoto(id)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(ChatChannels);
