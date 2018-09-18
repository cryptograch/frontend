import {
    USERLIST_FETCH_START,
    USERLIST_FETCH_SUCCESS,
    USERLIST_FETCH_FAILED,
    USERLIST_ERROR_CLEAR,
    USERLIST_CLEAR,
    USERLIST_ALL,
    ADMIN_CHANGE_START,
    ADMIN_CHANGE_SUCCESS,
    ADMIN_CHANGE_FAILED,
    ADMIN_CHANGE_CLEARERROR,
    ADMIN_CHANGE_CLEAR,
    REFUNDLIST_FETCH_START,
    REFUNDLIST_FETCH_SUCCESS,
    REFUNDLIST_FETCH_FAILED,
    REFUNDLIST_ERROR_CLEAR,
    REFUNDLIST_CLEAR,
    REFUNDLIST_ALL
} from '../actions/adminaction';

import { CLEAR_ALL, CLEAR_ERRORS } from '../actions/authaction';

const initUserListState = {
    list: [],
    loading: false,
    error: null,
    all: false,
    page: 1,
}

const userlistData = (state = initUserListState, action) => {
    switch (action.type) {
        case USERLIST_FETCH_START: return Object.assign({}, state, { loading: true });
        case USERLIST_FETCH_SUCCESS: return Object.assign({}, state, { loading: false, page: ++state.page, list: [...state.list, ...action.list] });
        case USERLIST_FETCH_FAILED: return Object.assign({}, state, { loading: false, error: action.error });
        case USERLIST_ERROR_CLEAR: return Object.assign({}, state, { error: null });
        case USERLIST_CLEAR: return Object.assign({}, initUserListState);
        case USERLIST_ALL: return Object.assign({}, state, { all: true });
        case CLEAR_ERRORS: return Object.assign({}, state, { error: null });
        case CLEAR_ALL: return Object.assign({}, initUserListState);
        default: return state;
    }
}

const initRefundListState = {
    list: [],
    loading: false,
    error: null,
    all: false,
    page: 1,
}

const refundlistData = (state = initRefundListState, action) => {
    switch (action.type) {
        case REFUNDLIST_FETCH_START: return Object.assign({}, state, { loading: true });
        case REFUNDLIST_FETCH_SUCCESS: return Object.assign({}, state, { loading: false, page: ++state.page, list: [...state.list, ...action.list] });
        case REFUNDLIST_FETCH_FAILED: return Object.assign({}, state, { loading: false, error: action.error });
        case REFUNDLIST_ERROR_CLEAR: return Object.assign({}, state, { error: null });
        case REFUNDLIST_CLEAR: return Object.assign({}, initUserListState);
        case REFUNDLIST_ALL: return Object.assign({}, state, { all: true });
        case CLEAR_ERRORS: return Object.assign({}, state, { error: null });
        case CLEAR_ALL: return Object.assign({}, initUserListState);
        default: return state;
    }
}

const initAdminChangeState = {
    loading: false,
    success: null,
    error: null,
}

const adminChangeData = (state = initAdminChangeState, action) => {
    switch (action.type) {
        case ADMIN_CHANGE_START: return Object.assign({}, state, { loading: true });
        case ADMIN_CHANGE_SUCCESS: return Object.assign({}, state, { loading: false, success: action.mess });
        case ADMIN_CHANGE_FAILED: return Object.assign({}, state, { loading: false, error: action.error });
        case ADMIN_CHANGE_CLEARERROR: return Object.assign({}, state, { error: null, success: null });
        case ADMIN_CHANGE_CLEAR: return Object.assign({}, initAdminChangeState);
        case CLEAR_ERRORS: return Object.assign({}, state, { error: null });
        case CLEAR_ALL: return Object.assign({}, initAdminChangeState);
        default: return state;
    }
}

export { userlistData, adminChangeData, refundlistData };