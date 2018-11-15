import { apiurl } from '../appconfig';
// Need to take token
import { checkAndGetToken, logout, refreshToken } from './authaction';

import { updatestart, updatesuccess, updatefailed } from './chengeaction';
import { getPhoto } from './photoaction';

export const DOCUMENT_FETCH_START = 'DOCUMENT_FETCH_START';
export const DOCUMENT_FETCH_SUCCESS = 'DOCUMENT_FETCH_SUCCESS';
export const DOCUMENT_FETCH_FAILED = 'DOCUMENT_FETCH_FAILED';
export const DOCPHOTO_FETCH_START = 'DOCPHOTO_FETCH_START';
export const DOCPHOTO_FETCH_SUCCESS = 'DOCPHOTO_FETCH_SUCCESS';
export const DOCPHOTO_FETCH_FAILED = 'DOCPHOTO_FETCH_FAILED';
export const DOCUMENT_CLEAR = 'DOCUMENT_CLEAR';
// TODO: create all action's types

// TODO: create all action's
const docStart = () => ({
    type: DOCUMENT_FETCH_START
});

const docSuccess = (doc) => ({
    type: DOCUMENT_FETCH_SUCCESS,
    doc
});

const docFailed = (error) => ({
    type: DOCUMENT_FETCH_FAILED,
    error
});

const docphotoStart = () => ({
    type: DOCPHOTO_FETCH_START
});

const docphotoSuccess = (blob, url) => ({
    type: DOCPHOTO_FETCH_SUCCESS,
    blob,
    url
});

const docphotoFailed = (error) => ({
    type: DOCPHOTO_FETCH_FAILED,
    error
});

export const docClear = () => ({
    type: DOCUMENT_CLEAR
});

// TODO: actionCreator upload Document info
export const uploadDocument = (file, file1) => (dispatch, getState) => {
    // dispatch(docStart());
    const token = checkAndGetToken(dispatch, getState);
    if (file ) {
        if (token) {
            dispatch(updatestart());
            const data = new FormData();
            data.append('files', file);
            data.append('files', file1);
            fetch(`${apiurl}/api/documents/driverlicense`, {
                method: 'PUT',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                }),
                body: data
            })
                .then(res => {
                    if (res.status === 200 || res.status === 204 || res.status === 201 || res.status === 202) {
                        dispatch(updatesuccess('Documents is update'));
                        dispatch(getDocument());
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, uploadDocument, file, file1));
                    } else  if (res.status === 400) {
                        return res.json();
                    } else {
                        throw new Error(res.statusText);
                    }   
                })
                .then(data => {
                    if (data && Array.isArray(data[Object.keys(data)[0]])) {
                        dispatch(updatefailed(data[Object.keys(data)[0]][0]));
                    } else {
                        dispatch(updatefailed(null));
                    }
                })
                .catch(error => {
                    dispatch(updatefailed(error.message));
                });
        } else {
            dispatch(logout());
        }
    } else {
        dispatch(updatefailed('No photos'));
    }
}

// TODO: actionCreator get Document info 
export const getDocument = (tok) => (dispatch, getState) => {
    const token = (tok) ? tok : checkAndGetToken(dispatch, getState);
    if (token) {
        dispatch(docStart());
        fetch(`${apiurl}/api/documents/driverlicense`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token.auth_token}`
            })
        })
            .then(res => {
                if (res.status === 200 || res.status === 201 || res.status === 204) {
                    return res.json();
                } else if (res.status === 401) {
                    dispatch(refreshToken(token, getDocument));
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(data => {
                dispatch(docSuccess(data));
                dispatch(getPhoto(data.frontId, token));
                dispatch(getPhoto(data.backId, token));
            })
            .catch(error => dispatch(docFailed(error.message)));
    } else {
        dispatch(logout());
    }
}

// TODO: actionCreator get Document phoho
// export const getDocPhoto = (tok, id) => (dispatch, getState) => {
//     const token = (tok) ? tok : checkAndGetToken(dispatch, getState);
//     if (token) {
//         dispatch(docphotoStart());
//         fetch(`${apiurl}/api/images/${id}`, {
//             method: 'GET',
//             headers: new Headers({
//                 'Authorization': `Bearer ${token.auth_token}`
//             })
//         })
//             .then(res => {
//                 if (res.status === 401) {
//                     dispatch(refreshToken(token, getDocPhoto, null, id));
//                 } else if (res.status === 404) {
//                     dispatch(docphotoSuccess(null, null));
//                     return null
//                 } else if (res.status === 200 || res.status === 204 || res.status === 201 || res.status === 202) {
//                     return res.blob();
//                 } else {
//                     throw new Error(res.statusText);
//                 }
//             })
//             .then(blob => {
//                 if (blob) {
//                     const url = URL.createObjectURL(blob);
//                     dispatch(docphotoSuccess(blob, url));
//                 }
//             })
//             .catch(error => dispatch(docphotoFailed(error.message)));
//     } else {
//         dispatch(logout());
//     }
// }