import {
    FETCH_PHOTO_START,
    FETCH_PHOTO_SUCCESS,
    FETCH_PHOTO_FAILED,
    FETCH_PHOTO_CLEAR,
} from '../actions/photoaction';

import { CLEAR_ALL  } from '../actions/authaction';

const  initState = { }

const photo = (loading, url, error) => ({ loading, url, error });

const photosData = (state = initState, action) => {
    switch (action.type) {
        case FETCH_PHOTO_START: return Object.assign({}, state, { [action.id]: photo(true, null, null) });
        case FETCH_PHOTO_SUCCESS: return Object.assign({}, state, { [action.id]: photo(false, action.url, null) });
        case FETCH_PHOTO_FAILED: return Object.assign({}, state, { [action.id]: photo(true, null, action.error) });
        case FETCH_PHOTO_CLEAR: return Object.assign({}, state, { [action.id]: undefined });
        case CLEAR_ALL: return Object.assign({}, initState);
        default: return state;
    }
}

export { photosData };