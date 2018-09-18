import { logout, checkAndGetToken, refreshToken } from './authaction';
import { apiurl } from '../appconfig';

export const STATISTIC_FETCH_START = 'STATISTIC_FETCH_START';
export const STATISTIC_FETCH_SUCCESS = 'STATISTIC_FETCH_SUCCESS';
export const STATISTIC_FETCH_FAILED = 'STATISTIC_FETCH_FAILED';
export const STATISTIC_CLEAR = 'STATISTIC_CLEAR';
export const STATISTIC_ALL = 'STATISTIC_ALL';

const statStart = () => ({
    type: STATISTIC_FETCH_START
});

const statSuccess = (stat) => ({
    type: STATISTIC_FETCH_SUCCESS,
    stat
});

const statFailed = (error) => ({
    type: STATISTIC_FETCH_FAILED,
    error
});

const statAll = () => ({
    type: STATISTIC_ALL
});

export const statClear = () => ({
    type: STATISTIC_CLEAR
});

export const getStatistic = () => (dispatch, getState) => {
    if (!getState().statData.loading) {
        const token = checkAndGetToken(dispatch, getState);
        if (token) {
            const page = getState().statData.page;
            dispatch(statStart());
            /* if (getState().statData.stat.length < 30) {
                setTimeout(() => {
                    console.log("Load");
                    const newarray = [...("111111111111").split("")];
                    dispatch(statSuccess(newarray));
                }, 2000);
            } else {
                dispatch(statAll());
            } */

            fetch(`${apiurl}/api/tripshistory/${token.role}?PageNumber=${page}&PageSize=${10}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`,
                })
            })
                .then(res => {
                    if (res.status === 200 || res.status === 201 || res.status === 204) {
                        return res.json();
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, getStatistic));
                    } else if (res.status === 404) {
                        dispatch(statAll());
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(data => {
                    if (Array.isArray(data)) {
                        if (data.length === 0) {
                            dispatch(statAll());
                        } else {
                            dispatch(statSuccess(data));
                        }
                    }
                })
                .catch(error => dispatch(statFailed(error.message)));
        } else {
            dispatch(logout());
        }
    }
}


