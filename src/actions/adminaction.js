import { checkAndGetToken, logout, refreshToken } from './authaction';
import { apiurl } from '../appconfig';
import { getPhoto } from './photoaction';

export const USERLIST_FETCH_START = 'USERLIST_FETCH_START';
export const USERLIST_FETCH_SUCCESS = 'USERLIST_FETCH_SUCCESS';
export const USERLIST_FETCH_FAILED = 'USERLIST_FETCH_FAILED';
export const USERLIST_ERROR_CLEAR = 'USERLIST_ERROR_CLEAR';
export const USERLIST_CLEAR = 'USERLIST_CLEAR';
export const USERLIST_ALL = 'USERLIST_ALL';
export const USERLIST_DELETE_ELEMENT = 'USERLIST_DELETE_ELEMENT';
export const USERLIST_UPDATE_ELEMENT = 'USERLIST_UPDATE_ELEMENT';

export const USERLIST_PROFILE_START = 'USERLIST_PROFILE_START';
export const USERLIST_PROFILE_SUCCESS = 'USERLIST_PROFILE_SUCCESS';
export const USERLIST_PROFILE_FAILED = 'USERLIST_PROFILE_FAILED';
export const USERLIST_PROFILE_CLEAR = 'USERLIST_PROFILE_CLEAR';

/*No finish yet */
export const USERLIST_DOC_START = 'USERLIST_DOC_START';
export const USERLIST_DOC_SUCCESS = 'USERLIST_DOC_SUCCESS';
export const USERLIST_DOC_FAILED = 'USERLIST_DOC_FAILED';
export const USERLIST_DOC_CLEAR = 'USERLIST_DOC_CLEAR';

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

export const userListStart = () => ({
    type: USERLIST_FETCH_START
});

export const userListSuccess = (list) => ({
    type: USERLIST_FETCH_SUCCESS,
    list
});

export const userListFailed = (error) => ({
    type: USERLIST_FETCH_FAILED,
    error
});

export const userListAll = () => ({
    type: USERLIST_ALL
});

export const userListDeleteEl = (id) => ({
    type: USERLIST_DELETE_ELEMENT,
    id
})

export const userListClear = () => ({
    type: USERLIST_CLEAR
});

export const changeStart = () => ({
    type: ADMIN_CHANGE_START
});

export const changeSuccess = (mess) => ({
    type: ADMIN_CHANGE_SUCCESS,
    mess
});

export const changeFailed = (error) => ({
    type: ADMIN_CHANGE_FAILED,
    error
});

export const changeUpdate = (id) => ({
    type: ADMIN_CHANGE_UPDATE,
    id
})

export const changeClearError = () => ({
    type: ADMIN_CHANGE_CLEARERROR
});

export const adminChangeClear = () => ({
    type: ADMIN_CHANGE_CLEAR
});

export const refundListStart = () => ({
    type: REFUNDLIST_FETCH_START
});

export const refundListSuccess = (list) => ({
    type: REFUNDLIST_FETCH_SUCCESS,
    list
});

export const refundListFailed = (error) => ({
    type: REFUNDLIST_FETCH_FAILED,
    error
});

export const refundListAll = () => ({
    type: REFUNDLIST_ALL
});

export const refundListErrorClear = () => ({
    type: REFUNDLIST_ERROR_CLEAR
});

export const refundListClear = () => ({
    type: REFUNDLIST_CLEAR
});

export const userListProfileStart = (id) => ({
    type: USERLIST_PROFILE_START,
    id
});

export const userListProfileSuccess = (id, profile) => ({
    type: USERLIST_PROFILE_SUCCESS,
    id, profile
});

export const userListProfileFailed = (id, error) => ({
    type: USERLIST_PROFILE_FAILED,
    id, error
});

export const userListProfileClear = (id) => ({
    type: USERLIST_PROFILE_CLEAR,
    id
});

export const userListDocStart = (id) => ({
    type: USERLIST_DOC_START,
    id
});

export const userListDocSuccess = (id, doc) => ({
    type: USERLIST_DOC_SUCCESS,
    id, doc
});

export const userListDocFailed = (id, error) => ({
    type: USERLIST_DOC_FAILED,
    id, error
});

export const userListDocClear = (id) => ({
    type: USERLIST_DOC_CLEAR,
    id
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
                        dispatch(changeUpdate(id));
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
            // dispatch(refundListSuccess([{
            //     id: '169e7570-cc7b-45ae-88fa-b8c045066427',
            //     message: 'message',
            //     creationTime: new Date().toString(),
            //     solved: false,
            //     customerId: '1bf4707c-0901-4199-9221-bd3cf937c564',
            //     identityId: '6e7164f5-69a5-4aa2-9456-de10209c222a',
            //     tripHistoryId: 'd8624571-f66e-47fe-88cc-2ee8908480cb',
            // }]));
            // dispatch(refundListAll());
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
                        dispatch(changeUpdate(id));
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
                        dispatch(userListDeleteEl(id));
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
                .catch(error => dispatch(changeFailed(error.message)));
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

export const getUserProfile = (id) => (dispatch, getState) => {
    if (id && !getState().userlistData.profiles[id]) {
        const token = checkAndGetToken(dispatch, getState);
        if (token) {
            dispatch(userListProfileStart(id));
            fetch(`${apiurl}/api/admins/getuser/${id}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, getUserProfile, id));
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(data => {
                    if (data) {
                        dispatch(userListProfileSuccess(id, data));
                        if (data) {

                        }
                    } else {
                        dispatch(userListProfileSuccess(id, null));
                    }
                })
                .catch(error => dispatch(userListProfileFailed(id, error.message)));
        } else {
            dispatch(logout());
        }
    }
}

export const getUserLicense = (id) => (dispatch, getState) => {
    if (id && !getState().userlistData.docs[id]) {
        const token = checkAndGetToken(dispatch, getState);
        if (token) {
            dispatch(userListDocStart(id));
            fetch(`${apiurl}/api/admins/driverlicenses/${id}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    } else if (refreshToken.status === 401) {
                        dispatch(refreshToken(token, getUserLicense, id));
                    } else if (res.status === 404) {
                        dispatch(userListDocSuccess(id, null));
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(data => {
                    if (data) {
                        dispatch(userListDocSuccess(id, data));
                        dispatch(getPhoto(data.fronId, token));
                        dispatch(getPhoto(data.backId, token));
                    } else {
                        dispatch(userListDocSuccess(id, null));
                    }
                })
                .catch(error => dispatch(userListDocFailed(error.message)));
        } else {
            dispatch(logout());
        }
    }
}