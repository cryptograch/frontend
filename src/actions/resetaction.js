import { apiurl } from "../appconfig";

export const RESET_SEND_START = 'RESET_SEND_START';
export const RESET_SEND_SUCCESS = 'RESET_SEND_SUCCESS';
export const RESET_SEND_FAILED = 'RESET_SEND_FAILED';

export const RESET_FETCH_START = 'RESET_FETCH_START';
export const RESET_FETCH_SUCCESS = 'RESET_FETCH_SUCCESS';
export const RESET_FETCH_FAILED = 'RESET_FETCH_FAILED';

export const RESET_CLEAR_SUCCESS = 'RESET_CLEAR_SUCCESS';
export const RESET_CLEAR_ERROR = 'RESET_CLEAR_ERROR';
export const RESET_CLEAR = 'RESET_SEND_CLEAR';


const sendStart = () => ({
    type: RESET_SEND_START
});

const sendSuccess = (mess) => ({
    type: RESET_SEND_SUCCESS,
    mess
});

const sendFailed = (error) => ({
    type: RESET_SEND_FAILED,
    error
});

const resetStart = () => ({
    type: RESET_FETCH_START
});

const resetSuccess = (mess) => ({
    type: RESET_FETCH_SUCCESS,
    mess
});

const resetFailed = (error) => ({
    type: RESET_FETCH_FAILED,
    error
});

export const clearReset = () => ({
    type: RESET_CLEAR
});

export const clearSuccess = () => ({
    type: RESET_CLEAR_SUCCESS
});

export const clearError = () => ({
    type: RESET_CLEAR_ERROR
});

export const sendResetLetter = (email) => (dispatch, getState) => {
    if (email) {
        dispatch(sendStart());
        fetch(`${apiurl}/api/Auth/restore`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ email })
        })
            .then(res => {
                if (res.status === 200 || res.status === 201 || res.status === 204) {
                    dispatch(sendSuccess('Letter send'));
                } else if (res.status === 400) {
                    return res.json();
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(data => {
                if (Array.isArray(data[Object.keys(data)[0]])) {
                    dispatch(sendFailed(data[Object.keys(data)[0]][0]));
                }
            })
            .catch(error => dispatch(sendFailed(error.message)));
    } else {
        dispatch(sendFailed('No email'));
    }
}

export const resetPassword = (resetdata) => (dispatch, getState) => {
    if (resetdata) {
        dispatch(resetStart());
        fetch(`${apiurl}/api/Auth/reset`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(resetdata)
        })
        .then(res => {
            if (res.status === 200 || res.status === 201 || res.status === 204) {
                dispatch(resetSuccess('Password reset successful'));
            } else {
                throw new Error(res.statusText);
            }
        })
        .catch(error => dispatch(resetFailed(error.message)))
    } else {
        dispatch(resetFailed('No reset data'));
    }
}