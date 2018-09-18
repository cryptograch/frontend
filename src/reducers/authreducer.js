import {
    USER_FETCH_START,
    USER_FETCH_SUCCESS,
    USER_FETCH_FAILED,
    USER_DELETE,
    TOKEN_SUCCESS,
    TOKEN_DELETE,
    USERPHOTO_FETCH_START,
    USERPHOTO_FETCH_SUCCESS,
    USERPHOTO_FETCH_FAILED,
    CLEAR_ERRORS,
    CLEAR_ALL,
} from '../actions/authaction';

const initUserData = {
    user: null,
    loading: false,
    error: null,
}

const userData = (state = initUserData, action) => {
    switch (action.type) {
        case USER_FETCH_START: return Object.assign({}, state, { loading: true });
        case USER_FETCH_SUCCESS: return Object.assign({}, state, { user: action.user, loading: false });
        case USER_FETCH_FAILED: return Object.assign({}, state, { error: action.error, loading: false });
        case USER_DELETE: return Object.assign({}, initUserData);
        case CLEAR_ERRORS: return Object.assign({}, state, { error: null });
        case CLEAR_ALL: return Object.assign({}, initUserData);
        default: return state;
    }
}

const initTokenData = {
    token: null
}

const tokenData = (state = initTokenData, action) => {
    switch (action.type) {
        case TOKEN_SUCCESS: {
            localStorage.setItem('Taxi_Token', JSON.stringify(action.token));
            return { token: action.token };
        }
        case TOKEN_DELETE: {
            localStorage.removeItem('Taxi_Token');
            return initTokenData;
        }
        default: return state;
    }
}

const initPhotoState = {
    blob: null,
    url: null,
    loading: false,
    error: null,
}

const photoData = (state = initPhotoState, action) => {
    switch (action.type) {
        case USERPHOTO_FETCH_START: return Object.assign({}, state, { loading: true });
        case USERPHOTO_FETCH_SUCCESS: return Object.assign({}, state, { blob: action.blob, url: action.url, loading: false });
        case USERPHOTO_FETCH_FAILED: return Object.assign({}, state, { error: action.error, loading: false });
        case CLEAR_ALL: return Object.assign({}, initPhotoState);
        default: return state;
    }
}

export { userData, tokenData, photoData };