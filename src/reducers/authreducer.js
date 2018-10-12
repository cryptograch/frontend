import {
    USER_FETCH_START,
    USER_FETCH_SUCCESS,
    USER_FETCH_FAILED,
    USER_DELETE,
    TOKEN_START,
    TOKEN_SUCCESS,
    TOKEN_DELETE,
    TOKEN_FAILED,
    USERPHOTO_FETCH_START,
    USERPHOTO_FETCH_SUCCESS,
    USERPHOTO_FETCH_FAILED,
    USER_REGISTER_START,
    USER_REGISTER_FAILED,
    USER_REGISTER_SUCCESS,
    CLEAR_ERRORS,
    CLEAR_ALL,
} from '../actions/authaction';

export const registerInitState = {
    loading: false,
    success: null,
    error: null,
}

const registerData = (state = registerInitState, action) => {
    switch (action.type) {
        case USER_REGISTER_START: return Object.assign({}, state, { loading: true });
        case USER_REGISTER_SUCCESS: return Object.assign({}, state, { loading: false, success: action.message });
        case USER_REGISTER_FAILED: return Object.assign({}, state, { loading: false, error: action.error });
        case CLEAR_ERRORS: return Object.assign({}, registerInitState);
        case CLEAR_ALL: return Object.assign({}, registerInitState);
        default: return state;
    }
}

export const initUserState = {
    user: null,
    loading: false,
    error: null,
}

const userData = (state = initUserState, action) => {
    switch (action.type) {
        case USER_FETCH_START: return Object.assign({}, state, { loading: true });
        case USER_FETCH_SUCCESS: return Object.assign({}, state, { user: action.user, loading: false });
        case USER_FETCH_FAILED: return Object.assign({}, state, { error: action.error, loading: false });
        case USER_DELETE: return Object.assign({}, initUserState);
        case CLEAR_ERRORS: return Object.assign({}, state, { error: null });
        case CLEAR_ALL: return Object.assign({}, initUserState);
        default: return state;
    }
}

export const initTokenState = {
    token: null,
    loading: false,
}

const tokenData = (state = initTokenState, action) => {
    switch (action.type) {
        case TOKEN_START: return Object.assign({}, state, { loading: true });
        case TOKEN_SUCCESS: {
            localStorage.setItem('Taxi_Token', JSON.stringify(action.token));
            return { token: action.token, loading: false };
        }
        case TOKEN_DELETE: {
            localStorage.removeItem('Taxi_Token');
            return initTokenState;
        }
        case TOKEN_FAILED: return Object.assign({}, state, { loading: false });
        default: return state;
    }
}

export const initPhotoState = {
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

export { userData, tokenData, photoData, registerData };