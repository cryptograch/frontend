import {
    RESLIST_FETCH_START,
    RESLIST_FETCH_SUCCESS,
    RESLIST_FETCH_FAILED,
    RESLIST_CLEAR,
    RESLIST_ALL
} from '../actions/reslistaction';

import { CLEAR_ERRORS, CLEAR_ALL } from '../actions/authaction';

const initState = {
    ress: [],
    loading: false,
    error: null,
    all: false,
    page: 1,
}

const reslistData = (state = initState, action) => {
    switch (action.type) {
        case RESLIST_FETCH_START: return Object.assign({}, state, { loading: true, error: false });
        case RESLIST_FETCH_SUCCESS: return Object.assign({}, state, { loading: false, ress: [...state.ress, ...action.ress], page: ++state.page });
        case RESLIST_FETCH_FAILED: return Object.assign({}, state, { loading: false, error: action.error });
        case RESLIST_CLEAR: return Object.assign({}, initState);
        case CLEAR_ERRORS: return Object.assign({}, state, { error: null });
        case CLEAR_ALL: return Object.assign({}, initState);
        case RESLIST_ALL: return Object.assign({}, state, { all: true });
        default: return state;
    }
}

export { reslistData };