import {
    RESET_SEND_START,
    RESET_SEND_SUCCESS,
    RESET_SEND_FAILED,
    RESET_FETCH_START,
    RESET_FETCH_SUCCESS,
    RESET_FETCH_FAILED,
    RESET_CLEAR,
    RESET_CLEAR_SUCCESS,
    RESET_CLEAR_ERROR
} from '../actions/resetaction';
import { CLEAR_ALL } from '../actions/authaction';

const initState = {
    sendsuccess: null,
    sendload: false,
    senderror: null,
    resetsuccess: null,
    resetload: false,
    reseterror: null,
}

const resetData = (state = initState, action) => {
    switch (action.type) {
        case RESET_SEND_START: return Object.assign({}, state, { sendload: true });
        case RESET_SEND_SUCCESS: return Object.assign({}, state, { sendsuccess: action.mess, sendload: false });
        case RESET_SEND_FAILED: return Object.assign({}, state, { senderror: action.error, sendload: false });
        case RESET_FETCH_START: return Object.assign({}, state, { resetload: true });
        case RESET_FETCH_SUCCESS: return Object.assign({}, state, { resetsuccess: action.mess, resetload: false });
        case RESET_FETCH_FAILED: return Object.assign({}, state, { reseterror: action.error, resetload: false });
        case RESET_CLEAR_ERROR: return Object.assign({}, state, { reseterror: null, senderror: null });
        case RESET_CLEAR_SUCCESS: return Object.assign({}, state, { resetsuccess: false, sendsuccess: false });
        case RESET_CLEAR: return Object.assign({}, initState);
        case CLEAR_ALL: return Object.assign({}, initState);
        default: return state;
    }
}

export { resetData };