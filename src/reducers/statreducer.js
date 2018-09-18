import {
    STATISTIC_FETCH_START,
    STATISTIC_FETCH_SUCCESS,
    STATISTIC_FETCH_FAILED,
    STATISTIC_CLEAR,
    STATISTIC_ALL
} from '../actions/stataction';

import { CLEAR_ERRORS, CLEAR_ALL } from '../actions/authaction';

const initState = {
    stat: [],
    loading: false,
    error: null,
    all: false,
    page: 1,
}

const statData = (state = initState, action) => {
    switch (action.type) {
        case STATISTIC_FETCH_START: return Object.assign({}, state, { loading: true, error: false });
        case STATISTIC_FETCH_SUCCESS: return Object.assign({}, state, { loading: false, stat: [...state.stat, ...action.stat], page: ++state.page });
        case STATISTIC_FETCH_FAILED: return Object.assign({}, state, { loading: false, error: action.error });
        case STATISTIC_CLEAR: return Object.assign({}, initState);
        case CLEAR_ERRORS: return Object.assign({}, state, { error: null });
        case CLEAR_ALL: return Object.assign({}, initState);
        case STATISTIC_ALL: return Object.assign({}, state, { all: true });
        default: return state;
    }
}

export { statData };