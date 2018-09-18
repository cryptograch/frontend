import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert'; */
import style from "./Statistic.css";
import mapssvg from '../../../assets/maps.svg';

import { connect } from 'react-redux';
import { apiurl } from '../../../appconfig';
import { openGoogleMap, addMapRoute } from '../../../actions/globalviewaction';

class StatisticItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            triproute: null,
            routeload: false,
            routeerror: null,
        }
    }
    componentDidMount() {
    }
    componentDidUpdate() {

    }
    /* Not work yet*/
    fetchTripRoute() {
        if (this.props.tokenData.token
            && this.props.trip.id) {
            const token = this.props.tokenData.token;
            this.setState({ routeload: true });
            fetch(`${apiurl}/api/tripshistory/${this.props.userData.user.role}/triproute/${this.props.trip.id}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(data => {
                    if (data) {
                        // console.log(data);
                        this.setState({ routeload: false, triproute: data });
                        this.props.addMapRoute(data);
                    }
                })
                .catch(error => console.log(error));
        }
    }
    renderMap() {
        this.fetchTripRoute();
        const center = {
            lat: this.props.trip.from.latitude,
            lng: this.props.trip.from.longitude
        }
        const labels = [{
            lat: this.props.trip.from.latitude,
            lng: this.props.trip.from.longitude,
            text: 'Start'
        },
        {
            lat: this.props.trip.to.latitude,
            lng: this.props.trip.to.longitude,
            text: 'End'
        }];
        this.props.openGoogleMap(center, labels);
    }
    render() {
        if (this.props.trip) {
            return (
                <div className={style.TripContainer}>
                    <div className={style.TripInfo}>
                        <div className={style.TripTimeInfo}>
                            <div className={style.TripTimeText}>
                                <span>Ended:</span> {(new Date(this.props.trip.finishTime)).toTimeString()}
                            </div>
                            <div className={style.TripMapBtn} onClick={this.renderMap.bind(this)}>
                                <img src={mapssvg} alt='Map' />
                            </div>
                        </div>
                        <div className={style.TripMainInfo}>
                            <div className={style.TripPriceInfo}>
                                <span>Price:</span> {this.props.trip.price}
                            </div>
                            <div className={style.TripPriceInfo}>
                                <span>Distance:</span> {this.props.trip.distance}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }
}

// Check props type
StatisticItem.propTypes = {
    tokenData: PropTypes.object,
    userData: PropTypes.object,
    addMapRoute: PropTypes.func,
    openGoogleMap: PropTypes.func
}

const mapStateToProps = state => ({
    tokenData: state.tokenData,
    userData: state.userData
});

const mapDispatchtoProps = dispatch => ({
    openGoogleMap: (center, labels) => { dispatch(openGoogleMap(center, labels)) },
    addMapRoute: (route) => { dispatch(addMapRoute(route)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(StatisticItem);
