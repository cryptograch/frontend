import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Chat.css';

import Loading from '../Loading/Loading';
import Alert from '../Alert/Alert';
import LazyLoad from '../LazyLoad/LazyLoad';

import defaultphoto from '../../assets/default-user.png';

import { connect } from 'react-redux';

import { getMessages, send } from "../../actions/chataction";
import { getPhoto } from '../../actions/photoaction';

class ChatView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            scroll: 0,
            new: false,
        }
        this.scrollRef = React.createRef();
        this.chatViewRef = React.createRef();
    }
    componentDidMount() {
        const { channel, getMessages } = this.props;
        // if (channel.id) {
        //     // getMessages(channel.id);
        // }

        const comp = document.getElementById('lz_container');
        comp.addEventListener('scroll', (e) => { this.onScroll.call(this, e) });
    }
    componentDidUpdate(prevprops) {
        const { chatData } = this.props;
        const prevlist = prevprops.chatData.messages.list;
        const prev = (prevlist) ? prevlist.length : null;
        const currlist = this.props.chatData.messages.list;
        const curr = (currlist) ? currlist.length : null;
        if (!Number.isNaN(prev) && !Number.isNaN(curr) && prev === 0 && curr > 0) {
            this.setScroll()
        }
        if (!Number.isNaN(prev) && !Number.isNaN(curr) && curr !== prev) {
            this.setState({ new: true });
        }

        // if (chatData.success) {
        //     this.setScroll();
        // }
    }
    componentWillUnmount() {
        const comp = document.getElementById('lz_container');
        comp.removeEventListener('scroll', this.onScroll);
    }
    submit() {
        const { send, channel, userData } = this.props;
        const targetUser = channel.members.filter(i => i.identityId !== userData.user.identityId)[0];
        if (targetUser && targetUser.identityId) {
            send(targetUser.identityId, this.state.message);
            this.setScroll();
        }
    }
    onScroll() {
        const view = this.chatViewRef.current;
        const container = this.scrollRef.current;
        const pane = document.getElementById('scrollPane');
        if (pane && container && view) {
            const containerHeight = view.offsetHeight;
            const k = container.scrollTop / (container.scrollHeight);
            const k2 = container.scrollHeight / containerHeight;
            pane.style.height = `${containerHeight / k2}px`;
            pane.style.transform = `translate(0px, ${k * containerHeight}px)`;
            this.setState({ scroll: container.scrollHeight - container.scrollTop });
        }
    }
    setScroll() {
        this.setState({ scroll: 0 })
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
    renderMessage(message, user) {
        if (message && user) {
            return (
                <div class={style.messageMain}>
                    <div className={style.channelPhoto}>
                        {this.renderPhoto(user.profilePictureId)}
                    </div>
                    <div className={style.messageText}>
                        <label>{user.firstName} {user.lastName} <time>{(new Date(message.publicationTime)).toDateString()}</time></label>
                        <p>{message.message}</p>
                    </div>

                </div>
            );
        }
    }
    renderMessages() {
        const { channel, chatData } = this.props;
        const { messages } = chatData;
        if (Array.isArray(messages.list)) {
            return messages.list.slice(0).reverse().map((message, key) => {
                const user = channel.members.filter(i => i.identityId === message.userId)[0];
                return <li key={key}>{this.renderMessage(message, user)}</li>
            })
        }
    }
    renderLazyLoad() {
        const { getMessages, channel } = this.props;
        const { messages } = this.props.chatData;
        const { all, loading } = messages;
        if (messages && !all) {
            if (loading) {
                return <LazyLoad container reverse loading={true} do={() => { }} />
            }
            return <LazyLoad container reverse loading={false} do={() => { getMessages(channel.id) }} />
        }
        return null;
    }
    render() {
        if (this.scrollRef.current && this.state.new) {
            const c = this.scrollRef.current;
            const { scroll } = this.state;
            this.scrollRef.current.scrollTop = c.scrollHeight - scroll;
            this.setState({ new: false });
        }
        return (
            <div>
                <div ref={this.chatViewRef} className={style.messageContainer}>
                    <ul id='lz_container' ref={this.scrollRef} className={style.contentScroll}>
                        {this.renderLazyLoad()}
                        {this.renderMessages()}
                    </ul>
                    <div className={style.scrollPane}>
                        <div id='scrollPane'></div>
                    </div>
                </div>
                <form onSubmit={(e) => { e.preventDefault() }}>
                    <textarea type='text' placeholder='Your message' onChange={(e) => { this.setState({ message: e.target.value }) }}></textarea>
                    <input type='submit' value='Send' onClick={this.submit.bind(this)} />
                </form>
            </div>
        );
    }
}

// const Message = ({ message, user }) => {
//     if (user) {
//         return (
//             <div>
//                 <h3>{user.firstName} {user.lastName} {message.publicationTime}</h3>
//                 <p>{message.message}</p>
//             </div>
//         );
//     }
//     return null;
// }

ChatView.propTypes = {
    chatData: PropTypes.object,
    getMessages: PropTypes.func,
    send: PropTypes.func,
    userData: PropTypes.object,
    photosData: PropTypes.object,
    getPhoto: PropTypes.func
}

const mapStateToProps = state => ({
    chatData: state.chatData,
    userData: state.userData,
    photosData: state.photosData,
});

const mapDispatchtoProps = dispatch => ({
    getMessages: (id) => { dispatch(getMessages(id)) },
    send: (id, message) => { dispatch(send(id, message)) },
    getPhoto: (id) => { dispatch(getPhoto(id)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(ChatView);
