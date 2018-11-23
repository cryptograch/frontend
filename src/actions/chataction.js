import { checkAndGetToken, logout, refreshToken } from './authaction';
import { apiurl } from '../appconfig';

const signalR = require("@aspnet/signalr");

export const CONNECTION_START = 'CONNECTION_START';
export const CONNECTION_SUCCESS = 'CONNECTION_SUCCESS';
export const CONNECTION_FAILED = 'CONNECTION_FAILED'

export const FETCH_CHANNELS_START = 'FETCH_CHANNELS_START';
export const FETCH_CHANNELS_SUCCESS = 'FETCH_CHANNELS_SUCCESS';
export const FETCH_CHANNELS_FAILED = 'FETCH_CHANNELS_FAILED';

export const CHAT_MESSAGES_START = 'CHAT_MESSAGES_START';
export const CHAT_MESSAGES_SUCCESS = 'CHAT_MESSAGES_SUCCESS';
export const CHAT_MESSAGES_FAILED = 'CHAT_MESSAGES_FAILED';
export const CHAT_MESSAGES_CLEAR = 'CHAT_MESSAGES_CLEAR';
export const CHAT_MESSAGES_ALL = 'CHAT_MESSAGES_ALL';

export const MESSAGE_SEND_START = 'MESSAGE_SEND_START';
export const MESSAGE_SEND_ADD = 'MESSAGE_SEND_ADD';
export const MESSAGE_SEND_FAILED = 'MESSAGE_SEND_FAILED';

export const connectionStart = () => ({
  type: CONNECTION_START
});

export const connectionSuccess = (conn) => ({
  type: CONNECTION_SUCCESS,
  conn
});

export const connectionFailed = (error) => ({
  type: CONNECTION_FAILED,
  error
});

export const channelsStart = () => ({
  type: FETCH_CHANNELS_START
});

export const channelsSuccess = (list) => ({
  type: FETCH_CHANNELS_SUCCESS,
  list
});

export const channelsFailed = (error) => ({
  type: FETCH_CHANNELS_FAILED,
  error
});

export const listStart = () => ({
  type: CHAT_MESSAGES_START,
});

export const listSuccess = (list) => ({
  type: CHAT_MESSAGES_SUCCESS,
  list
});

export const listFailed = (error) => ({
  type: CHAT_MESSAGES_FAILED,
  error
});

export const listClear = () => ({
  type: CHAT_MESSAGES_CLEAR,
});

export const listAll = () => ({
  type: CHAT_MESSAGES_ALL,
});

export const sendStart = () => ({
  type: MESSAGE_SEND_START,
});

export const sendAdd = (message) => ({
  type: MESSAGE_SEND_ADD,
  message
});

export const sendFailed = (error) => ({
  type: MESSAGE_SEND_FAILED,
  error
});

export const createConnection = () => (dispatch, getState) => {
  const token = checkAndGetToken(dispatch, getState);
  if (token) {
    dispatch(connectionStart())
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${apiurl}/chat`, {
        accessTokenFactory: () => {
          return token.auth_token;
        }
      })
      .configureLogging(signalR.LogLevel.Information).build();
    connection.start().then(() => dispatch(connectionSuccess(connection))).catch(error => dispatch(connectionFailed(error.message)));

    connection.on("publication", (data) => {
      let message = null;
      try {
        message = JSON.parse(data);
        dispatch(sendAdd({
          publicationTime: message.PublicationTime,
          message: message.Message,
          userId: message.UserId,
        }));
      } catch (e) {
        dispatch(sendFailed(e.message));
      }
    });

  } else {
    dispatch(logout());
  }
}

export const subscribe = (id) => (dispatch, getState) => {
  const { conn } = getState().chatData.connection;
  if (conn) {
    conn.invoke('Subscribe', id)
      .then(() => {
        dispatch(getChannels());
      })
      .catch(error => dispatch(channelsFailed(error.message)));
  }
}

export const send = (id, message) => (dispatch, getState) => {
  const { conn } = getState().chatData.connection;
  if (conn) {
    dispatch(sendStart());
    conn.invoke("Publish", id, message)
      .catch(error => dispatch(sendFailed(error.message)));
  }
}

export const getChannels = () => (dispatch, getState) => {
  const token = checkAndGetToken(dispatch, getState);
  if (token) {
    dispatch(channelsStart());
    fetch(`${apiurl}/api/chat/getchannels`, {
      method: 'GET',
      headers: new Headers({
        'Authorization': `Bearer ${token.auth_token}`
      })
    })
      .then(res => {
        if (res.status === 200 || res.status === 201 || res.status === 204) {
          return res.json();
        } else if (res.status === 401) {
          dispatch(refreshToken(token, getChannels));
        } else if (res.status === 404) {
          dispatch(channelsSuccess(null));
        } else {
          throw new Error(res.statusText);
        }
      })
      .then(data => {
        if (Array.isArray(data)) {
          dispatch(channelsSuccess(data));
        } else {
          dispatch(channelsSuccess(null));
        }
      })
      .catch(error => dispatch(channelsFailed(error.message)));
  } else {
    dispatch(logout());
  }
}

export const getMessages = (id) => (dispatch, getState) => {
  const { page, loading } = getState().chatData.messages;
  if (id && !loading) {
    const token = checkAndGetToken(dispatch, getState);
    if (token) {
      const query = (!Number.isNaN(page)) ? `&from=${page * 5}&to=${page * 5 + 5}`: '';
      dispatch(listStart());
      fetch(`${apiurl}/api/chat/getmessages?channelId=${id}${query}`, {
        method: 'GET',
        headers: new Headers({
          'Authorization': `Bearer ${token.auth_token}`,
        })
      })
        .then(res => {
          if (res.status === 200 || res.status === 201 || res.status === 204) {
            return res.json();
          } else if (res.status === 401) {
            dispatch(refreshToken(token, getMessages, id));
          } else if (res.status === 404) {
            dispatch(listAll());
          } else {
            throw new Error(res.statusText);
          }
        })
        .then(data => {
          if (Array.isArray(data)) {
            if (data.length === 0) {
              dispatch(listAll());
            } else {
              dispatch(listSuccess(data));
            }
          } else {
            dispatch(listAll());
          }
        })
        .catch(error => dispatch(listFailed(error.message)));
    } else {
      dispatch(logout());
    }
  }
}
