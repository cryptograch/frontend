// TODO: import action's types
import {
    VEHICLE_FETCH_START,
    VEHICLE_FETCH_SUCCESS,
    VEHICLE_FETCH_FAILED,
    VEHICLE_CLEAR,
    VEHPHOTO_DELETE_ID
} from '../actions/vehiclesaction';

import { CLEAR_ERRORS, CLEAR_ALL } from '../actions/authaction';

const initState = {
    loading: false,
    veh: null,
    error: null,
}

// TODO: create reducer docData
const vehData = (state = initState, action) => {
    switch (action.type) {
        case VEHICLE_FETCH_START: return Object.assign({}, state, { loading: true });
        case VEHICLE_FETCH_SUCCESS: return Object.assign({}, state, { loading: false, veh: action.veh });
        case VEHICLE_FETCH_FAILED: return Object.assign({}, state, { loading: false, error: action.error });
        case VEHICLE_CLEAR: return Object.assign({}, initState);
        case CLEAR_ERRORS: return Object.assign({}, state, { error: null });
        case CLEAR_ALL: return Object.assign({}, initState);

        case VEHPHOTO_DELETE_ID: return Object.assign({}, state, { veh: Object.assign(state.veh, { pictures: state.veh.pictures.filter(p => p !== action.id) }) });
        default: return state;
    }
}

export { vehData };