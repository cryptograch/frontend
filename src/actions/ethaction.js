import { checkAndGetToken, logout, refreshToken } from "./authaction";
import { apiurl } from "../appconfig";

export const ETH_BALANCE_START = 'ETH_BALANCE_START';
export const ETH_BALANCE_SUCCESS = 'ETH_BALANCE_SUCCESS';
export const ETH_BALANCE_FAILED = 'ETH_BALANCE_FAILED';

export const TAXI_BALANCE_START = 'TAXI_BALANCE_START';
export const TAXI_BALANCE_SUCCESS = 'TAXI_BALANCE_SUCCESS';
export const TAXI_BALANCE_FAILED = 'TAXI_BALANCE_FAILED';

export const CHANGE_BALANCE_START = 'CHANGE_BALANCE_START';
export const CHANGE_BALANCE_SUCCESS = 'CHANGE_BALANCE_SUCCESS';
export const CHANGE_BALANCE_FAILED = 'CHANGE_BALANCE_FAILED';
export const CHANGE_BALANCE_CLEAR = 'CHANGE_BALANCE_CLEAR';

const ethStart = () => ({
    type: ETH_BALANCE_START
});

const ethSuccess = (bal) => ({
    type: ETH_BALANCE_SUCCESS,
    bal
});

const ethFailed = (error) => ({
    type: ETH_BALANCE_FAILED,
    error
});

const taxiStart = () => ({
    type: TAXI_BALANCE_START
});

const taxiSuccess = (bal) => ({
    type: TAXI_BALANCE_SUCCESS,
    bal
});

const taxiFailed = (error) => ({
    type: TAXI_BALANCE_FAILED,
    error
});

const changeStart = () => ({
    type: CHANGE_BALANCE_START
});

const changeSuccess = (mess) => ({
    type: CHANGE_BALANCE_SUCCESS,
    mess
});

const changeFailed = (error) => ({
    type: CHANGE_BALANCE_FAILED,
    error
});

export const clearChange = () => ({
    type: CHANGE_BALANCE_CLEAR
});

let EthBalance = 200;
let TaxiBalance = 56;

export const getEthBalance = () => (dispatch, getState) => {
    dispatch(ethStart());

    /* Test timeout */
    /* setTimeout(() => {
        dispatch(ethSuccess(EthBalance));
    }, 1000); */

    /* Cant test this (need eth purse) */
    const token = checkAndGetToken(dispatch, getState);
    if (token) {
        fetch(`${apiurl}/api/balance/ethereum`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token.auth_token}`
            })
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                } else if (res.status === 401) {
                    dispatch(refreshToken(token, getEthBalance));
                } else if (res.status === 400) {
                    return res.json();
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(data => {
                if (Array.isArray(data[Object.keys(data)[0]])) {
                    dispatch(ethFailed(data[Object.keys(data)[0]][0]));
                } else {
                    dispatch(ethSuccess(data));
                }
            })
            .catch(error => dispatch(ethFailed(error.message)));
    } else {
        dispatch(logout());
    }
}

export const getTaxiBalance = () => (dispatch, getState) => {
    dispatch(taxiStart());
    /* Test timeout */
    /* setTimeout(() => {
        dispatch(taxiSuccess(TaxiBalance));
    }, 1000); */

    const token = checkAndGetToken(dispatch, getState);
    if (token) {
        fetch(`${apiurl}/api/balance/tokens`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token.auth_token}`
            })
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                } else if (res.status === 401) {
                    dispatch(refreshToken(token, getTaxiBalance));
                } else if (res.status === 400) {
                    return res.json();
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(data => {
                if (data) {
                    if (Array.isArray(data[Object.keys(data)[0]])) {
                        dispatch(taxiFailed(data[Object.keys(data)[0]][0]));
                    } else {
                        dispatch(taxiSuccess(data));
                    }
                }
            })
            .catch(error => dispatch(taxiFailed(error.message)));
    } else {
        dispatch(logout());
    }
}

export const depositToTaxiBalance = (value) => (dispatch, getState) => {
    dispatch(changeStart());
    /* Test timeout */
    /* const val = Number.parseFloat(value);
    setTimeout(() => {
        if ((EthBalance - val) >= 0) {
            EthBalance -= val;
            TaxiBalance += val;
            dispatch(changeSuccess('Balance changed'));
            dispatch(getEthBalance());
            dispatch(getTaxiBalance());
        } else {
            dispatch(changeFailed('Not enough balance'));
        }
    }, 1000); */

    const token = checkAndGetToken(dispatch, getState);
    if (token) {
        fetch(`${apiurl}/api/deposit`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Bearer ${token.auth_token}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ value })
        })
            .then(res => {
                if (res.status === 200) {
                    dispatch(changeSuccess('Deposit was succesfull'));
                } else if (res.status === 400) {
                    return res.json();
                } else if (res.status === 401) {
                    dispatch(refreshToken(token, depositToTaxiBalance, value));
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(data => {
                if (data) {
                    if (Array.isArray(data[Object.keys(data)[0]])) {
                        dispatch(changeFailed(data[Object.keys(data)[0]][0]));
                    }
                }
            })
            .catch(error => dispatch(changeFailed(error.message)));
    } else {
        dispatch(logout());
    }
}