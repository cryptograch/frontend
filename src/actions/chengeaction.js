import { apiurl } from '../appconfig';

import { checkAndGetToken, logout, getUser, refreshToken } from './authaction';

export const UPDATE_FETCH_START = 'UPDATE_FETCH_START';
export const UPDATE_FETCH_SUCCESS = 'UPDATE_FETCH_SUCCESS';
export const UPDATE_FETCH_FAILED = 'UPDATE_FETCH_FAILED';
export const CLEAR_UPDATE_SUCCESS = 'CLEAR_UPDATE_SUCCESS';
export const CLEAR_UPDATE_ERROR = 'CLEAR_UPDATE_ERROR';
export const CLEAR_UPDATE = 'CLEAR_UPDATE';

export const updatestart = () => ({
    type: UPDATE_FETCH_START
});

export const updatesuccess = (success) => ({
    type: UPDATE_FETCH_SUCCESS,
    success
});

export const updatefailed = (error) => ({
    type: UPDATE_FETCH_FAILED,
    error
});

export const clearSuccess = () => ({
    type: CLEAR_UPDATE_SUCCESS
});

export const clearError = () => ({
    type: CLEAR_UPDATE_ERROR
});

export const clearUpdate = () => ({
    type: CLEAR_UPDATE
});

export const changeProfile = (data) => (dispatch, getState) => {
    const token = checkAndGetToken(dispatch, getState);
    if (data) {
        if (token) {
            dispatch(updatestart());
            fetch(`${apiurl}/api/accounts/${token.role}s/${token.id}`, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.auth_token}`
                }),
                body: JSON.stringify(data)
            })
                .then(res => {
                    if (res.status === 204) {
                        dispatch(updatesuccess('Profile was updated'));
                        dispatch(getUser(token));
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, changeProfile, data));
                    } else if (res.status === 400) {
                        return res.json();
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(data => {
                    if (data) {
                        if (Array.isArray(data[Object.keys(data)[0]])) {
                            dispatch(updatefailed(data[Object.keys(data)[0]][0]));
                        }
                    }
                })
                .catch(error => dispatch(updatefailed(error.message)));

        }
        else {
            dispatch(logout());
        }
    }
};

export const changeKey = (data) => (dispatch, getState) => {
    const token = checkAndGetToken(dispatch, getState);
    if (data) {
        if (token) {
            dispatch(updatestart());
            fetch(`${apiurl}/api/balance/changekey`, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.auth_token}`
                }),
                body: JSON.stringify(data)
            })
                .then(res => {
                    if (res.status === 204) {
                        dispatch(updatesuccess('Private Key was updated'));
                        dispatch(getUser());
                        // console.log('key update ok');
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, changeProfile, data));
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .catch(error => dispatch(updatefailed(error.message)));
        } else {
            dispatch(logout());
        }
    }
}
