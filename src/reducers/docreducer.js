// TODO: import action's types
import {
    DOCUMENT_FETCH_START,
    DOCUMENT_FETCH_SUCCESS,
    DOCUMENT_FETCH_FAILED,
    DOCUMENT_CLEAR
} from '../actions/docaction';

import { CLEAR_ERRORS, CLEAR_ALL } from '../actions/authaction';

const initState = {
    loading: false,
    doc: null,
    error: null,
}

// TODO: create reducer docData
const docData = (state = initState, action) => {
    switch (action.type) {
        case DOCUMENT_FETCH_START: return Object.assign({}, state, { loading: true });
        case DOCUMENT_FETCH_SUCCESS: return Object.assign({}, state, { loading: false, doc: action.doc });
        case DOCUMENT_FETCH_FAILED: return Object.assign({}, state, { loading: false, error: action.error });
        case DOCUMENT_CLEAR: return Object.assign({}, initState);
        case CLEAR_ERRORS: return Object.assign({}, state, { error: null });
        case CLEAR_ALL: return Object.assign({}, initState);
        default: return state;
    }
}

export { docData };