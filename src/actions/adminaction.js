import { checkAndGetToken, logout, refreshToken } from './authaction';
import { apiurl } from '../appconfig';

export const USERLIST_FETCH_START = 'USERLIST_FETCH_START';
export const USERLIST_FETCH_SUCCESS = 'USERLIST_FETCH_SUCCESS';
export const USERLIST_FETCH_FAILED = 'USERLIST_FETCH_FAILED';
export const USERLIST_ERROR_CLEAR = 'USERLIST_ERROR_CLEAR';
export const USERLIST_CLEAR = 'USERLIST_CLEAR';
export const USERLIST_ALL = 'USERLIST_ALL';

export const ADMIN_CHANGE_START = 'ADMIN_CHANGE_START';
export const ADMIN_CHANGE_SUCCESS = 'ADMIN_CHANGE_SUCCESS';
export const ADMIN_CHANGE_FAILED = 'ADMIN_CHANGE_FAILED';
export const ADMIN_CHANGE_CLEARERROR = 'ADMIN_CHANGE_CLEARERROR';
export const ADMIN_CHANGE_CLEAR = 'ADMIN_CHANGE_CLEAR';
export const ADMIN_CHANGE_UPDATE = 'ADMIN_CHANGE_UPDATE';

export const REFUNDLIST_FETCH_START = 'REFUNDLIST_FETCH_START';
export const REFUNDLIST_FETCH_SUCCESS = 'REFUNDLIST_FETCH_SUCCESS';
export const REFUNDLIST_FETCH_FAILED = 'REFUNDLIST_FETCH_FAILED';
export const REFUNDLIST_ERROR_CLEAR = 'REFUNDLIST_ERROR_CLEAR';
export const REFUNDLIST_CLEAR = 'REFUNDLIST_CLEAR';
export const REFUNDLIST_ALL = 'REFUNDLIST_ALL';

const userListStart = () => ({
    type: USERLIST_FETCH_START
});

const userListSuccess = (list) => ({
    type: USERLIST_FETCH_SUCCESS,
    list
});

const userListFailed = (error) => ({
    type: USERLIST_FETCH_FAILED,
    error
});

const userListAll = () => ({
    type: USERLIST_ALL
});

const userListErrorClear = () => ({
    type: USERLIST_ERROR_CLEAR
});

export const userListClear = () => ({
    type: USERLIST_CLEAR
});

const changeStart = () => ({
    type: ADMIN_CHANGE_START
});

const changeSuccess = (mess) => ({
    type: ADMIN_CHANGE_SUCCESS,
    mess
});

const changeFailed = (error) => ({
    type: ADMIN_CHANGE_FAILED,
    error
});

const changeUpdate = (id) => ({
    type: ADMIN_CHANGE_UPDATE,
    id
})

export const changeClearError = () => ({
    type: ADMIN_CHANGE_CLEARERROR
});

const adminChangeClear = () => ({
    type: ADMIN_CHANGE_CLEAR
});

const refundListStart = () => ({
    type: REFUNDLIST_FETCH_START
});

const refundListSuccess = (list) => ({
    type: REFUNDLIST_FETCH_SUCCESS,
    list
});

const refundListFailed = (error) => ({
    type: REFUNDLIST_FETCH_FAILED,
    error
});

const refundListAll = () => ({
    type: REFUNDLIST_ALL
});

const refundListErrorClear = () => ({
    type: REFUNDLIST_ERROR_CLEAR
});

export const refundListClear = () => ({
    type: REFUNDLIST_CLEAR
});

export const getUserList = (search) => (dispatch, getState) => {
    if (!getState().userlistData.loading) {
        const token = checkAndGetToken(dispatch, getState);
        if (token) {
            const page = getState().userlistData.page;
            dispatch(userListStart());
            fetch(`${apiurl}/api/admins/getusers?PageNumber=${page}&PageSize=${5}&${(search) ? `&SearchQuery=${search}&` : ''}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
                .then(res => {
                    if (res.status === 200 || res.status === 201 || res.status === 204) {
                        return res.json();
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, getUserList, search));
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(list => {
                    if (Array.isArray(list)) {
                        if (list.length === 0) {
                            dispatch(userListAll());
                        } else {
                            dispatch(userListSuccess(list));
                        }
                    }
                })
                .catch(error => dispatch(userListFailed(error.message)));
        } else {
            dispatch(logout());
        }
    }
}

export const setUserToAdmin = (id) => (dispatch, getState) => {
    if (id) {
        const token = checkAndGetToken(dispatch, getState);
        if (token) {
            dispatch(changeStart());
            fetch(`${apiurl}/api/admins/root/userToAdmin/${id}`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
                .then(res => {
                    if (res.status === 200 || res.status === 201 || res.status === 204) {
                        dispatch(changeSuccess('User is admin now'));
                        dispatch(getUserList(1, 20));
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, setUserToAdmin, id));
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .catch(error => dispatch(changeFailed(error.message)));
        } else {
            dispatch(logout());
        }
    }
}

export const getRefundList = (issolved) => (dispatch, getState) => {
    if (!getState().refundlistData.loading) {
        const token = checkAndGetToken(dispatch, getState);
        if (token) {
            const page = getState().refundlistData.page;
            dispatch(refundListStart());
            fetch(`${apiurl}/api/admins/refundRequests?PageNumber=${page}&PageSize=${5}&IsSolved=${issolved}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
                .then(res => {
                    if (res.status === 200 || res.status === 201 || res.status === 204) {
                        return res.json();
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, getRefundList, issolved));
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(list => {
                    if (Array.isArray(list)) {
                        if (list.length === 0) {
                            dispatch(refundListAll());
                        } else {
                            dispatch(refundListSuccess(list));
                        }
                    }
                })
                .catch(error => dispatch(refundListFailed(error.message)));
        } else {
            dispatch(logout());
        }
    }
}

// Not done yet
export const deleteAdmin = (id) => (dispatch, getState) => {
    if (id) {
        const token = checkAndGetToken(dispatch, getState);
        if (token) {
            dispatch(changeStart());
            fetch(`${apiurl}/api/admins/root/removeadmin/${id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
            .then(res => {
                if (res.status === 200 || res.status === 201 || res.status === 204) {
                    dispatch(changeSuccess('Admin was removed'));
                } else if (res.status === 401) {
                    dispatch(refreshToken(token, deleteAdmin, id));
                } else {
                    throw new Error(res.statusText);
                }
            })
            .catch(error => dispatch(changeFailed(error.message)));
        } else {
            dispatch(logout());
        }
    }
}

export const deleteUser = (id) => (dispatch, getState) => {
    if (id) {
        const token = checkAndGetToken(dispatch, getState);
        if (token) {
            dispatch(changeStart());
            fetch(`${apiurl}/api/admins/removeuser/${id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
                .then(res => {
                    if (res.status === 200 || res.status === 201 || res.status === 204) {
                        dispatch(changeSuccess('User was deleted'));
                        dispatch(getUserList(1, 20));
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, deleteAdmin, id));
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .catch(error => dispatch(changeFailed(error.message)));
        } else {
            dispatch(logout());
        }
    }
}

export const approveLicense = (id) => (dispatch, getState) => {
    if (id) {
        const token = checkAndGetToken(dispatch, getState);
        if (token) {
            dispatch(changeStart());
            fetch(`${apiurl}/api/admins/driverlicenses/${id}/approve`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
                .then(res => {
                    if (res.status === 200 || res.status === 201 || res.status === 204) {
                        dispatch(changeSuccess('License was approved'));
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, approveLicense, id));
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .catch(error => dispatch(changeFailed(error.message)))
        } else {
            dispatch(logout());
        }
    }
}

export const setComission = (value) => (dispatch, getState) => {
    if (typeof value === 'number') {
        const token = checkAndGetToken(dispatch, getState);
        if (token) {
            dispatch(changeStart());
            fetch(`${apiurl}/api/admins/root/setcomission`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({ value })
            })
                .then(res => {
                    if (res.status === 200 || res.status === 201 || res.status === 204) {
                        dispatch(changeSuccess('Commission was updated'));
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, setComission, value));
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .catch(error => dispatch(changeFailed(error.message)));
        } else {
            dispatch(logout());
        }
    }
}

export const resolveRequest = (id, message) => (dispatch, getState) => {
    if (id && message) {
        const token = checkAndGetToken(dispatch, getState);
        if (token) {
            dispatch(changeStart());
            fetch(`${apiurl}/api/admins/refundRequests/solve/${id}`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({ toRefund: true, message })
            })
                .then(res => {
                    if (res.status === 200 || res.status === 201 || res.status === 204) {
                        dispatch(changeSuccess('Request was resolved'));
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, resolveRequest, id, message));
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .catch(error => dispatch(error.message));
        } else {
            dispatch(logout());
        }
    }
}

export const sendResponse = (identityId, message) => (dispatch, getState) => {
    if (identityId && message) {
        const token = checkAndGetToken(dispatch, getState);
        if (token) {
            dispatch(changeStart());
            fetch(`${apiurl}/api/admins/response`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({ message, identityId })
            })
            .then(res => {
                if (res.status === 200 || res.status === 201 || res.status === 204) {
                    dispatch(changeSuccess('Response was send'));
                } else if (res.status === 401) {
                    dispatch(refreshToken(token, sendResponse, identityId, message));
                } else {
                    throw new Error(res.statusText);
                }
            })
            .catch(error => dispatch(changeFailed(error.message)));
        } else {
            dispatch(logout());
        }
    }
}