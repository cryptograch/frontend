import { apiurl } from '../appconfig';
// Need to take token
import { checkAndGetToken, logout, refreshToken } from './authaction';

import { updatestart, updatesuccess, updatefailed } from './chengeaction';
import { getPhoto } from './photoaction';

export const VEHICLE_FETCH_START = 'VEHICLE_FETCH_START';
export const VEHICLE_FETCH_SUCCESS = 'VEHICLE_FETCH_SUCCESS';
export const VEHICLE_FETCH_FAILED = 'VEHICLE_FETCH_FAILED';
export const VEHICLE_CLEAR = 'VEHICLE_CLEAR';
// TODO: create all action's types


// TODO: create all action's
const vehicleStart = () => ({
    type: VEHICLE_FETCH_START
})

const vehicleSuccess = (veh) => ({
    type: VEHICLE_FETCH_SUCCESS,
    veh
});

const vehicleFailed = (error) => ({
    type: VEHICLE_FETCH_FAILED,
    error
})

export const vehClear = () => ({
    type: VEHICLE_CLEAR
})

// TODO: actionCreator upload Vehicle info
export const uploadVehicle = (data, file) => (dispatch, getState) => {
    // dispatch(vehicleStart());
    const token = checkAndGetToken(dispatch, getState);
    const checkdata = (data) => {
        if (data.number && data.model && data.brand && data.color) {
            return true;
        }
        return false;
    }
    if (checkdata(data)) {
        dispatch(updatestart());
        if (token) {
            fetch(`${apiurl}/api/vehicles`, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.auth_token}`,
                }),
                body: JSON.stringify(data)
            })
                .then(res => {
                    if (res.status === 200 || res.status === 204 || res.status === 201 || res.status === 202) {
                        if (file) {
                            dispatch(uploadVehPhoto(file, token));
                        } else {
                            dispatch(updatesuccess('Vehicle is update'));
                            dispatch(getVehicle(token));
                        }
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, uploadVehicle, data, file));
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .catch(error => {
                    dispatch(updatefailed(error.message));
                    dispatch(vehicleFailed(error.message));
                });
        } else {
            dispatch(logout());
        }
    } else if (file) {
        dispatch(updatestart());
        dispatch(uploadVehPhoto(file, token));
    } else {
        dispatch(updatefailed('No data and photo'));
    }
}

// TODO: actionCreator upload Vehicle Photo
export const uploadVehPhoto = (file, token) => (dispatch, getState) => {
    if (file) {
        if (token) {
            const data = new FormData();
            data.append('files', file);
            fetch(`${apiurl}/api/vehicles/images`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`,
                }),
                body: data
            })
                .then(res => {
                    if (res.status === 200 || res.status === 204 || res.status === 201 || res.status === 202) {
                        dispatch(updatesuccess('Vehicle is update'));
                        dispatch(getVehicle(token));
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, uploadVehPhoto, file, data));
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .catch(error => {
                    dispatch(updatefailed(error.message));
                    dispatch(vehicleFailed(error.message));
                });
        } else {
            dispatch(logout());
        }
    }
}


// TODO: actionCreator get Document info 
export const getVehicle = (tok) => (dispatch, getState) => {
    const token = (tok) ? tok : checkAndGetToken(dispatch, getState);
    if (token) {
        dispatch(vehicleStart());
        fetch(`${apiurl}/api/vehicles`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token.auth_token}`
            })
        })
            .then(res => {
                if (res.status === 200 || res.status === 201 || res.status === 204) {
                    return res.json();
                } else if (res.status === 401) {
                    dispatch(refreshToken(token, getVehicle));
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(data => {
                dispatch(vehicleSuccess(data));
                if (data.pictures && Array.isArray(data.pictures)) {
                    data.pictures.forEach(id => {
                        dispatch(getPhoto(id, token));
                    });
                }
            })
            .catch(error => dispatch(vehicleFailed(error.message)));
    } else {
        dispatch(logout());
    }
    // dispatch(vehicleSuccess({
    //     id: "70512059-1248-4e4f-9a17-a1527f924ced",
    //     number: "Number",
    //     model: "Model",
    //     brand: "Brand",
    //     color: "Color",
    //     pictures: ["e89ffbc9-cd46-4ef2-a7ee-c6e97dfd4ade.jpeg", "6ddd6713-e010-4007-8524-9f6acab50d23.png", "e89ffbc9-cd46-4ef2-a7ee-c6e97dfd4ade.jpeg"],
    //     driverId: "0e09a93f-5927-41df-8d4b-aba82da9b949",
    // }));
}