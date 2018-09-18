import { logout, checkAndGetToken, refreshToken } from './authaction';
import { apiurl } from '../appconfig';

export const RESLIST_FETCH_START = 'RESLIST_FETCH_START';
export const RESLIST_FETCH_SUCCESS = 'RESLIST_FETCH_SUCCESS';
export const RESLIST_FETCH_FAILED = 'RESLIST_FETCH_FAILED';
export const RESLIST_CLEAR = 'RESLIST_CLEAR';
export const RESLIST_ALL = 'RESLIST_ALL';

const resStart = () => ({
    type: RESLIST_FETCH_START
});

const resSuccess = (ress) => ({
    type: RESLIST_FETCH_SUCCESS,
    ress
});

const resFailed = (error) => ({
    type: RESLIST_FETCH_FAILED,
    error
});

const resAll = () => ({
    type: RESLIST_ALL
});

export const resClear = () => ({
    type: RESLIST_CLEAR
});

export const getResponseList = () => (dispatch, getState) => {
    if (!getState().reslistData.loading) {
        const token = checkAndGetToken(dispatch, getState);
        if (token) {
            const page = getState().reslistData.page;
            dispatch(resStart());
            fetch(`${apiurl}/api/accounts/customers/adminresponses?PageNumber=${page}&PageSize=${10}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`,
                })
            })
                .then(res => {
                    if (res.status === 200 || res.status === 201 || res.status === 204) {
                        return res.json();
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, getResponseList));
                    } else if (res.status === 404) {
                        dispatch(resAll());
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(data => {
                    if (Array.isArray(data)) {
                        if (data.length === 0) {
                            dispatch(resAll());
                        } else {
                            dispatch(resSuccess(data));
                        }
                    }
                })
                .catch(error => dispatch(resFailed(error.message)));
        } else {
            dispatch(logout());
        }
    }
}


