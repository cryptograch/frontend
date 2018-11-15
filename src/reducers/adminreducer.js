import {
    USERLIST_FETCH_START,
    USERLIST_FETCH_SUCCESS,
    USERLIST_FETCH_FAILED,
    USERLIST_ERROR_CLEAR,
    USERLIST_DELETE_ELEMENT,
    USERLIST_CLEAR,
    USERLIST_ALL,
    USERLIST_PROFILE_START,
    USERLIST_PROFILE_SUCCESS,
    USERLIST_PROFILE_FAILED,
    USERLIST_PROFILE_CLEAR,
    USERLIST_DOC_START,
    USERLIST_DOC_SUCCESS,
    USERLIST_DOC_FAILED,
    USERLIST_DOC_CLEAR,
    ADMIN_CHANGE_START,
    ADMIN_CHANGE_SUCCESS,
    ADMIN_CHANGE_FAILED,
    ADMIN_CHANGE_CLEARERROR,
    ADMIN_CHANGE_CLEAR,
    ADMIN_CHANGE_UPDATE,
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
    profiles: {},
    docs: {}
}

const profile = (loading, profile, error) => ({ loading, profile, error });
const doc = (loading, doc, error) => ({ loading, doc, error });

const userlistData = (state = initUserListState, action) => {
    switch (action.type) {
        case USERLIST_FETCH_START: return Object.assign({}, state, { loading: true });
        case USERLIST_FETCH_SUCCESS: return Object.assign({}, state, { loading: false, page: ++state.page, list: [...state.list, ...action.list] });
        case USERLIST_FETCH_FAILED: return Object.assign({}, state, { loading: false, error: action.error });
        case USERLIST_ERROR_CLEAR: return Object.assign({}, state, { error: null });
        case USERLIST_DELETE_ELEMENT: return Object.assign({}, state, { list: state.list.filter((e) => e.id !== action.id) });
        case USERLIST_CLEAR: return Object.assign({}, initUserListState);
        case USERLIST_ALL: return Object.assign({}, state, { all: true });
        case CLEAR_ERRORS: return Object.assign({}, state, { error: null });
        case CLEAR_ALL: return Object.assign({}, initUserListState);

        case USERLIST_PROFILE_START: return Object.assign({}, state, { profiles: Object.assign(state.profiles, { [action.id]: profile(true, null, null) }) });
        case USERLIST_PROFILE_SUCCESS: return Object.assign({}, state, { profiles: Object.assign(state.profiles, { [action.id]: profile(false, action.profile, null) }) });
        case USERLIST_PROFILE_FAILED: return Object.assign({}, state, { profiles: Object.assign(state.profiles, { [action.id]: profile(false, null, action.error) }) });
        case USERLIST_PROFILE_CLEAR: return Object.assign({}, state, { profiles: Object.assign(state.profiles, { [action.id]: undefined }) });

        case USERLIST_DOC_START: return Object.assign({}, state, { docs: Object.assign(state.docs, { [action.id]: doc(true, null, null) }) });
        case USERLIST_DOC_SUCCESS: return Object.assign({}, state, { docs: Object.assign(state.docs, { [action.id]: doc(false, action.doc, null) }) });
        case USERLIST_DOC_FAILED: return Object.assign({}, state, { docs: Object.assign(state.docs, { [action.id]: doc(false, null, action.error) }) });
        case USERLIST_DOC_CLEAR: return Object.assign({}, state, { docs: Object.assign(state.docs, { [action.id]: undefined }) });
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
    id: null,
}

const adminChangeData = (state = initAdminChangeState, action) => {
    switch (action.type) {
        case ADMIN_CHANGE_START: return Object.assign({}, state, { loading: true });
        case ADMIN_CHANGE_SUCCESS: return Object.assign({}, state, { loading: false, success: action.mess });
        case ADMIN_CHANGE_FAILED: return Object.assign({}, state, { loading: false, error: action.error });
        case ADMIN_CHANGE_CLEARERROR: return Object.assign({}, state, { error: null, success: null });
        case ADMIN_CHANGE_CLEAR: return Object.assign({}, initAdminChangeState);
        case ADMIN_CHANGE_UPDATE: return Object.assign({}, state, { id: action.id });
        case CLEAR_ERRORS: return Object.assign({}, state, { error: null });
        case CLEAR_ALL: return Object.assign({}, initAdminChangeState);
        default: return state;
    }
}

export { userlistData, adminChangeData, refundlistData };