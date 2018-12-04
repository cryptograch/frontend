import { apiurl } from '../appconfig';

import { checkAndGetToken, logout,  refreshToken } from './authaction';

export const MEAL_LIST_FETCH_START = 'MEAL_LIST_FETCH_START';
export const MEAL_LIST_FETCH_SUCCESS = 'MEAL_LIST_FETCH_SUCCESS';
export const MEAL_LIST_FETCH_FAILED = 'MEAL_LIST_FETCH_FAILED';

export const mealliststart = () => ({
    type: MEAL_LIST_FETCH_START
});
export const meallistsucces = (meallist) => ({
    type: MEAL_LIST_FETCH_SUCCESS,
    meallist
});
export const meallistfaild = (error) => ({
    type: MEAL_LIST_FETCH_FAILED,
    error
});
export const meallistclear = () => ({
    type: MEAL_LIST_CLEAR
})

export const fetchMealList = () => (dispatch, getState) => {
    const token = checkAndGetToken(dispatch, getState);
    if (token) {
        dispatch(mealliststart());
        fetch(`${apiurl}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token.auth_token}`
            })
        })
        .then()
        .then(meallist =>{
            dispatch(meallistsucces(meallist));
        })
        .catch(error => dispatch(meallistfaild(error)));
    } else {
        dispatch(logout());
    }
}