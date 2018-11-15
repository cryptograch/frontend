
import {
  CONNECTION_START,
  CONNECTION_SUCCESS,
  CONNECTION_FAILED,
} from '../actions/chataction';

export const initState = {
  connection: {
    start: false,
    conn: null,
    error: null,
  },
  channels: null,
  messages: []
}

const connection = (start, conn, error) => ({start, conn, error });

const chatData = (state = initState, action) => {
  switch(action.type) {
    case CONNECTION_START:  return Object.assign({}, state, { connection: connection(true, null, null)});
    case CONNECTION_SUCCESS: return Object.assign({}, state, { connection: connection(false, action.conn, null)});
    case CONNECTION_FAILED: return Object.assign({}, state, { connection: connection(false, null, action.error)});
    default: return state;
  }
}

export { chatData };
