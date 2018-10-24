// TODO: import action's types
import {
    DOCPHOTO_FETCH_START,
    DOCPHOTO_FETCH_SUCCESS,
    DOCPHOTO_FETCH_FAILED,
    DOCUMENT_FETCH_START,
    DOCUMENT_FETCH_SUCCESS,
    DOCUMENT_FETCH_FAILED,
    DOCUMENT_CLEAR
} from '../actions/docaction';

import { CLEAR_ERRORS, CLEAR_ALL } from '../actions/authaction';

const initState = {
    loaddoc: false,
    loadphoto: false,
    doc: null,
    errordoc: null,
    photos: [],
}

// TODO: create reducer docData
const docData = (state = initState, action) => {
    switch (action.type) {
        case DOCUMENT_FETCH_START: return Object.assign({}, state, { loaddoc: true });
        case DOCUMENT_FETCH_SUCCESS: return Object.assign({}, state, { loaddoc: false, doc: action.doc });
        case DOCUMENT_FETCH_FAILED: return Object.assign({}, state, { loaddoc: false, errordoc: action.error });
        case DOCPHOTO_FETCH_START: return Object.assign({}, state, { loadphoto: true });
        case DOCPHOTO_FETCH_SUCCESS: return Object.assign({}, state, { loadphoto: false, photos: [...state.photos, {url: action.url, blob: action.blob}] });
        case DOCPHOTO_FETCH_FAILED: return Object.assign({}, state, { loadphoto: false, photos: state.photos.push({errorphoto: action.error}) });
        case DOCUMENT_CLEAR: return Object.assign({}, initState);
        case CLEAR_ERRORS: return Object.assign({}, state, { errordoc: null });
        case CLEAR_ALL: return Object.assign({}, initState);
        default: return state;
    }
}

export { docData };