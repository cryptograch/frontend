import { checkAndGetToken, logout, refreshToken } from './authaction';
import { apiurl } from '../appconfig';

/* Driver profile actions types*/
export const DRIVERPROFILE_FETCH_START = 'DRIVERPROFILE_FETCH_START';
export const DRIVERPROFILE_FETCH_SUCCESS = 'DRIVERPROFILE_FETCH_SUCCESS';
export const DRIVERPROFILE_FETCH_FAILED = 'DRIVERPROFILE_FETCH_FAILED';
export const DRIVERPROFILE_CLEARERROR = 'DRIVERPROFILE_CLEARERROR';

export const DRIVERPHOTO_START = 'DRIVERPHOTO_START';
export const DRIVERPHOTO_SUCCESS = 'DRIVERPHOTO_SUCCESS';
export const DRIVERPHOTO_FAILED = 'DRIVERPHOTO_FAILED';

/* Driver profile reviews list types*/
export const REVIEWLIST_FETCH_START = 'REVIEWLIST_FETCH_START';
export const REVIEWLIST_FETCH_SUCCESS = 'REVIEWLIST_FETCH_SUCCESS';
export const REVIEWLIST_FETCH_FAILED = 'REVIEWLIST_FETCH_FAILED';
export const REVIEWLIST_CLEAR = 'REVIEWLIST_CLEAR';
export const REVIEWLIST_ALL = 'REVIEWLIST_ALL';
export const REVIEWLIST_ADD = 'REVIEWLIST_ADD';

/* Driver profile set review types */
export const SETREVIEW_FETCH_START = 'SETREVIEW_FETCH_START';
export const SETREVIEW_FETCH_SUCCESS = 'SETREVIEW_FETCH_SUCCESS';
export const SETREVIEW_FETCH_FAILED = 'SETREVIEW_FETCH_FAILED';
export const SETREVIEW_CLEARERROR = 'SETREVIEW_CLEARERROR';

export const profileStart = () => ({
    type: DRIVERPROFILE_FETCH_START
});

export const profileSuccess = (profile) => ({
    type: DRIVERPROFILE_FETCH_SUCCESS,
    profile
});

export const profileFailed = (error) => ({
    type: DRIVERPROFILE_FETCH_FAILED,
    error
});

export const profileClear = () => ({
    type: DRIVERPROFILE_CLEARERROR
});

export const photoStart = () => ({
    type: DRIVERPHOTO_START
});

export const photoSuccess = (url) => ({
    type: DRIVERPHOTO_SUCCESS,
    url
});

export const photoFailed = (error) => ({
    type: DRIVERPHOTO_FAILED,
    error
});

export const reviewListStart = () => ({
    type: REVIEWLIST_FETCH_START
});

export const reviewListSuccess = (review) => ({
    type: REVIEWLIST_FETCH_SUCCESS,
    review
});

export const reviewListFailed = (error) => ({
    type: REVIEWLIST_FETCH_FAILED,
    error
});

export const reviewListClear = () => ({
    type: REVIEWLIST_CLEAR
});

export const reviewListAll = () => ({
    type: REVIEWLIST_ALL
});

export const setReviewStart = () => ({
    type: SETREVIEW_FETCH_START
});

export const setReviewSuccess = (success) => ({
    type: SETREVIEW_FETCH_SUCCESS,
    success
});

export const setReviewFailed = (error) => ({
    type: SETREVIEW_FETCH_FAILED,
    error
});

export const setReviewClear = () => ({
    type: SETREVIEW_CLEARERROR
});

export const reviewListAdd = (review) => ({
    type: REVIEWLIST_ADD,
    review
});

/* TODO: actionCreator fetch driver profile by Id*/
export const fetchDriverProfile = (id) => (dispatch, getState) => {
    if (id) {
        const token = checkAndGetToken(dispatch, getState);
        if (token) {
            dispatch(profileStart());
            fetch(`${apiurl}/api/accounts/drivers/${id}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
                .then(res => {
                    if (res.status === 401) {
                        dispatch(refreshToken(token, fetchDriverProfile, id));
                    } else if (res.status === 200) {
                        return res.json();
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(profile => {
                    dispatch(profileSuccess(profile));
                    dispatch(fetchDriverPhoto(token, profile.profilePictureId));
                })
                .catch(error => dispatch(profileFailed(error)));
        } else {
            dispatch(logout());
        }
    }
}

export const fetchDriverPhoto = (tok, id) => (dispatch, getState) => {
    if (id) {
        const token = (tok) ? tok : checkAndGetToken(dispatch, getState);
        if (token) {
            dispatch(photoStart());
            return fetch(`${apiurl}/api/images/${id}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
                .then(res => {
                    if (res.status === 401) {
                        dispatch(refreshToken(token, fetchDriverPhoto, null, id));
                    } else if (res.status === 404) {
                        dispatch(photoSuccess(null));
                    } else if (res.status === 200 || res.status === 204 || res.status === 201) {
                        return res.blob();
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    dispatch(photoSuccess(url));
                })
                .catch(error => dispatch(photoFailed(error.message)));
        } else {
            dispatch(logout());
        }
    }
}

/* TODO: actionCreator fetch driver reviews by id*/
export const fetchDriverReviewList = (id) => (dispatch, getState) => {
    const loading = getState().reviewListData.loading
    if (id && !loading) {
        console.log('fetch');
        const token = checkAndGetToken(dispatch, getState);
        if (token) {
            const page = getState().reviewListData.page
            dispatch(reviewListStart());
            fetch(`${apiurl}/api/accounts/drivers/${id}/comments?PageNumber=${page}&PageSize=${10}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`,
                })
            })
                .then(res => {
                    if (res.status === 200 || res.status === 201 || res.status === 204) {
                        return res.json();
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, fetchDriverReviewList, id));
                    } else if (res.status === 404) {
                        dispatch(reviewListAll());
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(data => {
                    if (Array.isArray(data)) {
                        if (data.length === 0) {
                            dispatch(reviewListAll());
                        } else {
                            dispatch(reviewListSuccess(data));
                        }
                    }
                })
                .catch(error => dispatch(reviewListFailed(error.message)));
        } else {
            dispatch(logout());
        }
    }
}

/* TODO: actionCreator set Review for driver by id */
export const setReview = (driverId, message) => (dispatch, getState) => {
    if (driverId && message) {
        const token = checkAndGetToken(dispatch, getState);
        if (token) {
            dispatch(setReviewStart());
            fetch(`${apiurl}/api/tripshistory/comment`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`,
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({ driverId, message })
            })
                .then(res => {
                    if (res.status === 200) {
                        dispatch(setReviewSuccess('Comment is send'));
                        dispatch(reviewListAdd({
                            driverId, 
                            creationTime: new Date(),
                            customerId: token.id,
                            message
                        }))
                    } else if (res.status === 400) {
                        return res.json();
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, setReview, driverId, message));
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(data => {
                    if (data) {
                        console.log(data);
                    }
                })
                .catch(error => dispatch(setReviewFailed(error.message)));
        } else {
            dispatch(logout());
        }
    }
}