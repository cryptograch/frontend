import { checkAndGetToken, logout, refreshToken } from './authaction';
import { apiurl } from '../appconfig';

export const FETCH_PHOTO_START = 'FETCH_PHOTO_START';
export const FETCH_PHOTO_SUCCESS = 'FETCH_PHOTO_SUCCESS';
export const FETCH_PHOTO_FAILED = 'FETCH_PHOTO_FAILED';
export const FETCH_PHOTO_CLEAR = 'FETCH_PHOTO_CLEAR';


export const photoStart = (id) => ({
    type: FETCH_PHOTO_START,
    id
});

export const photoSuccess = (id, url) => ({
    type: FETCH_PHOTO_SUCCESS,
    id, url
});

export const photoFailed = (id, error) => ({
    type: FETCH_PHOTO_FAILED,
    id, error
});

export const photoClear = (id) => ({
    type: FETCH_PHOTO_CLEAR,
    id
});

export const getPhoto = (id, tok) => (dispatch, getState) => {
    if (id && !getState().photosData[id]) {
        const token = (tok) ? tok : checkAndGetToken(dispatch, getState);
        if (token) {
            dispatch(photoStart(id));
            fetch(`${apiurl}/api/images/${id}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        return res.blob();
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, getPhoto, id));
                    } else if (res.status === 404) {
                        dispatch(photoSuccess(id, null));
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(blob => {
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        dispatch(photoSuccess(id, url));
                    } else {
                        dispatch(photoSuccess(id, null));
                    }
                })
                .catch(error => dispatch(photoFailed(id, error.message)));
        } else {
            dispatch(logout());
        }
    }
}