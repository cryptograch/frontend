export const USER_FETCH_START = 'USER_FETCH_START';
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
export const USER_FETCH_FAILED = 'USER_FETCH_ERROR';
export const USER_DELETE = 'USER_DELETE';

export const USER_REGISTER_START = 'USER_REGISTER_START';
export const USER_REGISTER_FAILED = 'USER_REGISTER_FAILED';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';

export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_START = 'TOKEN_START';
export const TOKEN_FAILED = 'TOKEN_FAILED';
export const TOKEN_DELETE = 'TOKEN_DELETE';

export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const CLEAR_ALL = 'CLEAR_ALL';

import { apiurl } from '../appconfig';

import { updatestart, updatesuccess, updatefailed } from './chengeaction';
import { getPhoto } from './photoaction';

export const userStart = () => ({
    type: USER_FETCH_START
});

export const userSuccess = (user) => ({
    type: USER_FETCH_SUCCESS,
    user
});

export const userFailed = (error) => ({
    type: USER_FETCH_FAILED,
    error
});

export const userDelete = () => ({
    type: USER_DELETE
});

export const registerStart = () => ({
    type: USER_REGISTER_START
});

export const registerSuccess = (message) => ({
    type: USER_REGISTER_SUCCESS,
    message
});

export const registerFailed = (error) => ({
    type: USER_REGISTER_FAILED,
    error
});

export const tokenStart = () => ({
    type: TOKEN_START
});

export const tokenSuccess = (token) => ({
    type: TOKEN_SUCCESS,
    token
});

export const tokenFailed = () => ({
    type: TOKEN_FAILED
});

export const tokenDelete = () => ({
    type: TOKEN_DELETE
})

export const clearAll = () => ({
    type: CLEAR_ALL
})

export const checkAndGetToken = (dispatch, getState) => {
    if (getState().tokenData.token) {
        return getState().tokenData.token;
    }
    if (localStorage.getItem('Taxi_Token')) {
        const token = JSON.parse(localStorage.getItem('Taxi_Token'));
        dispatch(tokenSuccess(token));
        return token;
    }
    return null;
}

// TODO: ActionCreator refresh token
export const refreshToken = (tok, action, ...actionparams) => (dispatch, getState) => {
    if (!getState().tokenData.loading) {
        dispatch(tokenStart());
        const token = (tok) ? tok : checkAndGetToken(dispatch, getState);
        if (token && token.refresh_token) {
            const refresh = token.refresh_token
            return fetch(`${apiurl}/api/Auth/refreshtoken?refreshToken=${refresh}`, {
                method: 'POST',
            })
                .then(res => {
                    if (res.status === 200) {
                        return res.json()
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(newtoken => {
                    newtoken.role = token.role;
                    newtoken.id = token.id;
                    dispatch(tokenSuccess(newtoken));
                    if (action) {
                        dispatch(action(...actionparams));
                    }
                })
                .catch(error => dispatch(logout()));
        } else {
            dispatch(logout());
        }
    }
}

export const registerUser = (role, regdata, file) => (dispatch, getState) => {
    dispatch(registerStart());
    const url = `${apiurl}/api/accounts/${role}s`;
    return fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(regdata)
    })
        .then(res => {
            if (res.status === 200 || res.status === 204 || res.status === 201) {
                return res.json();
            } else if (res.status === 400) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        })
        .then(data => {
            if (Array.isArray(data[Object.keys(data)[0]])) {
                dispatch(registerFailed(data[Object.keys(data)[0]][0]));
            } else {
                dispatch(registerSuccess('Registration complete, please confirm you email and sign in'));
                // dispatch(loginUser({ userName: regdata.email, password: regdata.password }, role));
            }
        })
        .catch(error => { dispatch(registerFailed(error.message)) });
}

// actionCreator register driver
export const registerDriver = (regdata, file) => (dispatch, getState) => {
    dispatch(userStart());
    // console.log(regdata);
    return fetch(`${apiurl}/api/accounts/drivers`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(regdata)
    })
        .then(res => {
            if (res.status === 200 || res.status === 204 || res.status === 201) {
                return res.json();
            } else if (res.status === 400) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        })
        .then(data => {
            if (Array.isArray(data[Object.keys(data)[0]])) {
                dispatch(userFailed(data[Object.keys(data)[0]][0]));
            } else {
                dispatch(loginUser({ userName: regdata.email, password: regdata.password }, 'driver'));
            }
        })
        .catch(error => { dispatch(userFailed(error.message)) });
}

export const loginUser = (logdata, role) => (dispatch, getState) => {
    dispatch(tokenStart());
    return fetch(`${apiurl}/api/Auth/${role}`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(logdata)
    })
        .then(res => {
            if (res.status === 200 || res.status === 201 || res.status === 204) {
                return res.json();
            } else if (res.status === 400) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        })
        .then(token => {
            if (token.auth_token) {
                token.role = role;
                dispatch(tokenSuccess(token));
                dispatch(getUser(token));
            } else {
                dispatch(tokenFailed());
                // console.log(token[Object.keys(token)[0]][0]);
                dispatch(userFailed(token[Object.keys(token)[0]][0]));
            }
        })
        .catch(error => {
            dispatch(tokenFailed());
            dispatch(userFailed(error.message));
            // dispatch(logout());
        });
}

export const getUser = (tok) => (dispatch, getState) => {
    const token = (tok) ? tok : checkAndGetToken(dispatch, getState);
    if (token) {
        dispatch(userStart());
        const url = (token.role === 'admin') ? `${apiurl}/api/admins/${token.id}` : `${apiurl}/api/accounts/${token.role}s/${token.id}`;
        return fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token.auth_token}`
            })
        })
            .then(res => {
                if (res.status === 200 || res.status === 204 || res.status === 201) {
                    return res.json();
                } else if (res.status === 400) {
                    return res.json();
                } else if (res.status === 404) {
                    dispatch(userFailed(res.statusText));
                } else if (res.status === 401) {
                    dispatch(refreshToken(token, getUser));
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(data => {
                if (data) {
                    data.role = token.role;
                    dispatch(userSuccess(data));
                    if (data.profilePictureId) {
                        dispatch(getPhoto(data.profilePictureId, token));
                    }
                }
            })
            .catch(error => dispatch(userFailed(error.message)));
    } else {
        dispatch(logout());
    }
}

// actionCreator log out user
export const logout = () => (dispatch, getState) => {
    dispatch(userDelete());
    dispatch(tokenDelete());
    dispatch(clearAll());
}

// actionCreator upload user photo
export const uploadPhoto = (file, tok) => (dispatch, getState) => {
    const token = (tok) ? tok : checkAndGetToken(dispatch, getState);
    if (file) {
        dispatch(updatestart());
        if (token) {
            dispatch(photoStart());
            const data = new FormData();
            data.append('files', file);
            return fetch(`${apiurl}/api/profilepicture`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`,
                    // 'Content-Type': 'multipart/form-data'
                }),
                body: data
            })
                .then(res => {
                    if (res.status === 200 || res.status === 201 || res.status === 204) {
                        return res.json();
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, uploadPhoto, file));
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(data => {
                    dispatch(updatesuccess('Photo is updated'))
                    dispatch(getUser());
                })
                .catch((error) => {
                    dispatch(updatefailed(error.message));
                    dispatch(photoFailed(error.message));
                });
        } else {
            dispatch(logout());
        }
    } else {
        dispatch(updatefailed('No file choosed'));
    }
}

// TODO: actionCreator register Customer
export const registerCustomer = (regdata, file) => (dispatch, getState) => {
    dispatch(userStart());
    // console.log(regdata);
    fetch(`${apiurl}/api/accounts/customers`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(regdata)
    })
        .then(res => {
            if (res.status === 200 || res.status === 204 || res.status === 201) {
                return res.json();
            } else if (res.status === 400) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        })
        .then(data => {
            if (Array.isArray(data[Object.keys(data)[0]])) {
                dispatch(userFailed(data[Object.keys(data)[0]][0]));
            } else {
                dispatch(loginUser({ userName: regdata.email, password: regdata.password }, 'customer'));
            }
        })
        .catch(error => { dispatch(userFailed(error.message)) });
}

export const resendLetter = (data) => (dispatch, getState) => {
    dispatch(userStart());
    fetch(`${apiurl}/api/Auth/resendemail`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.status === 204) {
                dispatch(userFailed('Email send'));
            } else {
                throw new Error(res.statusText);
            }
        })
        .catch(error => dispatch(userFailed(error.message)));
}

