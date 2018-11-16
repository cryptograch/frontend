
import {
  CONNECTION_START,
  CONNECTION_SUCCESS,
  CONNECTION_FAILED,
  FETCH_CHANNELS_START,
  FETCH_CHANNELS_SUCCESS,
  FETCH_CHANNELS_FAILED,
  CHAT_MESSAGES_START,
  CHAT_MESSAGES_SUCCESS,
  CHAT_MESSAGES_FAILED,
  CHAT_MESSAGES_CLEAR,
  CHAT_MESSAGES_ALL,
  MESSAGE_SEND_START,
  MESSAGE_SEND_ADD,
  MESSAGE_SEND_FAILED,
} from '../actions/chataction';

import { CLEAR_ALL, CLEAR_ERRORS } from '../actions/authaction';

export const initState = {
  loading: false,
  success: null,
  error: null,
  connection: {
    start: false,
    conn: null,
    error: null,
  },
  channels: {
    loading: false,
    list: [],
    error: null,
  },
  messages: {
    loading: false,
    list: [],
    error: null,
    all: false,
  }
}

const connection = (start, conn, error) => ({ start, conn, error });
const channels = (loading, list, error) => ({ loading, list, error });
const messages = (loading, list, error, all = false) => ({ loading, list, error, all });

const chatData = (state = initState, action) => {
  switch (action.type) {
    case CONNECTION_START: return Object.assign({}, state, { connection: connection(true, null, null) });
    case CONNECTION_SUCCESS: return Object.assign({}, state, { connection: connection(false, action.conn, null) });
    case CONNECTION_FAILED: return Object.assign({}, state, { connection: connection(false, null, action.error) });

    case FETCH_CHANNELS_START: return Object.assign({}, state, { channels: channels(true, [], null) });
    case FETCH_CHANNELS_SUCCESS: return Object.assign({}, state, { channels: channels(false, action.list, null) });
    case FETCH_CHANNELS_FAILED: return Object.assign({}, state, { channels: channels(false, [], action.error) });

    case CHAT_MESSAGES_START: return Object.assign({}, state, { messages: messages(true, [], null) });
    case CHAT_MESSAGES_SUCCESS: return Object.assign({}, state, { messages: messages(false, [...action.list, ...state.messages.list], null) });
    case CHAT_MESSAGES_FAILED: return Object.assign({}, state, { messages: messages(false, [], action.error) });
    case CHAT_MESSAGES_CLEAR: return Object.assign({}, state, { messages: messages(false, [], null) });
    case CHAT_MESSAGES_ALL: return Object.assign({}, state, { messages: messages(false, [], null, true) });

    case MESSAGE_SEND_START: return Object.assign({}, state, { loading: true }); 
    case MESSAGE_SEND_ADD: return Object.assign({}, state, { messages: messages(false, [action.message, ...state.messages.list], null) });
    case MESSAGE_SEND_FAILED: return Object.assign({}, state, { error: action.error });

    case CLEAR_ERRORS: return Object.assign({}, state, { channels: channels(false, [], null), connection: connection(false, null, null) });
    case CLEAR_ALL: return Object.assign({}, initState);
    default: return state;
  }
}

export { chatData };
