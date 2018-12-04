import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Chat.css';

class ScrollPane extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scroll: 0,
            active: false,
        }
        this.paneRef = React.createRef();
    }
    componentDidMount() {
        const { scrollRef, horizontal } = this.props;
        let comp = null;
        let pane = null;
        if (horizontal) {
            this.onScroll = this.onScrollH.bind(this);
            this.mouseDown = this.mouseDownH.bind(this);
            this.mouseUp = this.mouseUpH.bind(this);
            this.mouseMove = this.mouseMoveH.bind(this);
            comp = scrollRef.current;
            pane = comp;
        } else {
            this.onScroll = this.onScrollV.bind(this);
            this.mouseDown = this.mouseDownV.bind(this);
            this.mouseUp = this.mouseUpV.bind(this);
            this.mouseMove = this.mouseMoveV.bind(this);
            comp = scrollRef.current;
            pane = this.paneRef.current;
        }
        comp.addEventListener('scroll', (e) => { this.onScroll(e) });
        pane.addEventListener('mousedown', (e) => { this.mouseDown.call(this, e) });
        pane.addEventListener('mousemove', (e) => { this.mouseMove.call(this, e) });
        pane.addEventListener('mouseup', (e) => { this.mouseUp.call(this, e) });
        pane.addEventListener('mouseleave', (e) => { this.mouseUp.call(this, e) });
        this.onScroll();
    }
    componentDidUpdate() {
    }
    componentWillUnmount() {

    }
    mouseDown() { }
    mouseUp() { }
    mouseMove() { }
    mouseDownH() {
        this.setState({ active: true })
    }
    mouseUpH() {
        this.setState({ active: false, scroll: 0 });
    }
    mouseMoveH(e) {
        const { scrollRef } = this.props;
        if (this.state.active) {
            const pane = this.paneRef.current;
            const container = scrollRef.current;
            if (this.state.scroll !== 0 && pane && container) {
                container.scrollLeft = container.scrollLeft - (e.clientX - this.state.scroll);
                this.onScroll();
            }
            this.setState({ scroll: e.clientX });
        }

    }
    mouseDownV() {
        console.log('down');
        this.setState({ active: true })
    }
    mouseUpV() {
        console.log('up');
        this.setState({ active: false, scroll: 0 });
    }
    mouseMoveV(e) {
        const { scrollRef, viewRef } = this.props;
        if (this.state.active) {
            const pane = this.paneRef.current;
            const container = scrollRef.current;
            const view = viewRef.current;
            if (this.state.scroll !== 0 && pane && container) {
                console.log('move');
                const k = container.scrollHeight / view.offsetHeight;
                container.scrollTop = container.scrollTop + (e.clientY - this.state.scroll)*k;
                this.onScroll();
            }
            this.setState({ scroll: e.clientY });
        }

    }
    onScroll() {
    }
    onScrollV() {
        const { viewRef, scrollRef } = this.props;
        const view = viewRef.current;
        const container = scrollRef.current;
        const pane = this.paneRef.current;
        if (pane && container && view && container.scrollHeight > view.offsetHeight) {
            const containerHeight = view.offsetHeight;
            const k = container.scrollTop / (container.scrollHeight);
            const k2 = container.scrollHeight / containerHeight;
            pane.style.height = `${containerHeight / k2}px`;
            pane.style.transform = `translate(0px, ${k * containerHeight}px)`;
            this.setState({ top: container.scrollHeight - container.scrollTop });
        } else {
            pane.style.height = `0px`;
        }
    }
    onScrollH() {
        const { viewRef, scrollRef } = this.props;
        const view = viewRef.current;
        const container = scrollRef.current;
        const pane = this.paneRef.current;
        if (pane && container && view && container.scrollWidth > view.offsetWidth) {
            const containerWidth = view.offsetWidth;
            const k = container.scrollLeft / (container.scrollWidth);
            const k2 = container.scrollWidth / containerWidth;
            pane.style.width = `${containerWidth / k2}px`;
            pane.style.transform = `translate(${k * containerWidth}px, 0px)`;
        } else {
            pane.style.width = `0px`;
        }
    }
    render() {
        if (this.props.horizontal) {
            return (
                <div className={style.scrollPaneH}>
                    <div ref={this.paneRef}></div>
                </div>
            );
        }
        return (
            <div className={style.scrollPane}>
                <div ref={this.paneRef}></div>
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

ScrollPane.propTypes = {
    scrollRef: PropTypes.object.isRequired,
    viewRef: PropTypes.object.isRequired,
}


export default ScrollPane;
