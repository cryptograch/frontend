import{
    MEAL_LIST_FETCH_START,
    MEAL_LIST_FETCH_SUCCESS,
    MEAL_LIST_FETCH_FAILED,

} from '../actions/mealaction';


import { CLEAR_ERRORS, CLEAR_ALL } from '../actions/authaction';

export const mealIniState = {
    maillist : null,
    error : null,
    loading: false,

}

const mealData = (state = mealIniState, action) => {
    switch (action.type){
        case MEAL_LIST_FETCH_START: return Object.assign({}, state, { loading: true });
        case MEAL_LIST_FETCH_SUCCESS: return Object.assign({}, state, { loading: false, maillist: action.maillist });
        case MEAL_LIST_FETCH_FAILED: return Object.assign({}, state, { loading: false, error: action.error });
        case CLEAR_ERRORS : return Object.assign({}, state, { error: null });
        case CLEAR_ALL : Object.assign({}, mealIniState);
        default: return state;
    }
}

export { mealData };