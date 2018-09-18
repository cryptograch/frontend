import {
    ETH_BALANCE_START,
    ETH_BALANCE_SUCCESS,
    ETH_BALANCE_FAILED,
    TAXI_BALANCE_START,
    TAXI_BALANCE_SUCCESS,
    TAXI_BALANCE_FAILED,
    CHANGE_BALANCE_START,
    CHANGE_BALANCE_SUCCESS,
    CHANGE_BALANCE_FAILED,
    CHANGE_BALANCE_CLEAR,
} from '../actions/ethaction';

import { CLEAR_ALL } from '../actions/authaction';

const initState = {
    ethbalance: null,
    ethbalload: false,
    ethbalerror: null,
    taxibalance: null,
    taxibalload: false,
    taxibalerror: null,
    changebalload: false,
    changebalerror: null,
    changebalsuccess: null,
}

const balanceData = (state = initState, action) => {
    switch (action.type) {
        case ETH_BALANCE_START: return Object.assign({}, state, { ethbalload: true });
        case ETH_BALANCE_SUCCESS: return Object.assign({}, state, { ethbalance: action.bal, ethbalload: false });
        case ETH_BALANCE_FAILED: return Object.assign({}, state, { ethbalerror: action.error, ethbalload: false });
        case TAXI_BALANCE_START: return Object.assign({}, state, { taxibalload: true });
        case TAXI_BALANCE_SUCCESS: return Object.assign({}, state, { taxibalance: action.bal, taxibalload: false });
        case TAXI_BALANCE_FAILED: return Object.assign({}, state, { taxibalerror: action.error, taxibalload: false });
        case CHANGE_BALANCE_START: return Object.assign({}, state, { changebalload: true });
        case CHANGE_BALANCE_SUCCESS: return Object.assign({}, state, { changebalload: false, changebalsuccess: action.mess });
        case CHANGE_BALANCE_FAILED: return Object.assign({}, state, { changebalload: false, changebalerror: action.error });
        case CHANGE_BALANCE_CLEAR: return Object.assign({}, state, { changebalsuccess: null, changebalerror: null });
        case CLEAR_ALL: return Object.assign({}, initState);
        default: return state;
    }
}

export { balanceData };