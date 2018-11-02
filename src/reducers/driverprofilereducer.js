import {
    DRIVERPROFILE_FETCH_START,
    DRIVERPROFILE_FETCH_SUCCESS,
    DRIVERPROFILE_FETCH_FAILED,
    DRIVERPROFILE_CLEARERROR,
    DRIVERPHOTO_START,
    DRIVERPHOTO_SUCCESS,
    DRIVERPHOTO_FAILED,
    REVIEWLIST_FETCH_START,
    REVIEWLIST_FETCH_SUCCESS,
    REVIEWLIST_FETCH_FAILED,
    REVIEWLIST_CLEAR,
    REVIEWLIST_ALL,
    REVIEWLIST_ADD,
    SETREVIEW_FETCH_START,
    SETREVIEW_FETCH_SUCCESS,
    SETREVIEW_FETCH_FAILED,
    SETREVIEW_CLEARERROR,
} from '../actions/driverprofileaction';

import { CLEAR_ERRORS, CLEAR_ALL } from '../actions/authaction';

export const profileInitState = {
    profile: null,
    error: null,
    loading: false,
    photourl: null,
    photoload: false,
    photoerror: null,
}

const driverData = (state = profileInitState, action) => {
    switch (action.type) {
        case DRIVERPROFILE_FETCH_START: return Object.assign({}, state, { loading: true });
        case DRIVERPROFILE_FETCH_SUCCESS: return Object.assign({}, state, { loading: false, profile: action.profile });
        case DRIVERPROFILE_FETCH_FAILED: return Object.assign({}, state, { loading: false, error: action.error });
        case DRIVERPROFILE_CLEARERROR: return Object.assign({}, state, { error: null });
        case DRIVERPHOTO_START: return Object.assign({}, state, { photoload: true });
        case DRIVERPHOTO_SUCCESS: return Object.assign({}, state, { photoload: false, photourl: action.url });
        case DRIVERPHOTO_FAILED: return Object.assign({}, state, { photoload: false, photoerror: action.error });
        case CLEAR_ERRORS: return Object.assign({}, state, { error: null, photoerror: null });
        case CLEAR_ALL: return Object.assign({}, profileInitState);
        default: return state;
    }
}

export const reviewListInitState = {
    reviews: [],
    loading: false,
    error: null,
    all: false,
    page: 1,
}

const reviewListData = (state = reviewListInitState, action) => {
    switch (action.type) {
        case REVIEWLIST_FETCH_START: return Object.assign({}, state, { loading: true });
        case REVIEWLIST_FETCH_SUCCESS: return Object.assign({}, state, { loading: false, reviews: [...state.reviews, ...action.review], page: ++state.page });
        case REVIEWLIST_FETCH_FAILED: return Object.assign({}, state, { loading: false, error: action.error });
        case REVIEWLIST_CLEAR: return Object.assign({}, reviewListInitState);
        case REVIEWLIST_ALL: return Object.assign({}, state, { all: true });
        case REVIEWLIST_ADD: return Object.assign({}, state, { reviews: [action.review, ...state.reviews]});
        case CLEAR_ERRORS: return Object.assign({}, state, { error: null });
        case CLEAR_ALL: return Object.assign({}, reviewListInitState);
        default: return state;
    }
}

export const setReviewInitState = {
    loading: false,
    success: null,
    error: null,
}

const setReviewData = (state = setReviewInitState, action) => {
    switch (action.type) {
        case SETREVIEW_FETCH_START: return Object.assign({}, state, { loading: true });
        case SETREVIEW_FETCH_SUCCESS: return Object.assign({}, state, { loading: false, success: action.success });
        case SETREVIEW_FETCH_FAILED: return Object.assign({}, state, { loading: false, error: action.error });
        case SETREVIEW_CLEARERROR: return Object.assign({}, state, { error: null, success: null });
        case CLEAR_ERRORS: return Object.assign({}, state, { error: null, success: null });
        case CLEAR_ALL: return Object.assign({}, setReviewInitState);
        default: return state;
    }
}

export { driverData, reviewListData, setReviewData };