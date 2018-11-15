import { checkAndGetToken, logout, refreshToken } from './authaction';
import { apiurl } from '../appconfig';

const signalR = require("@aspnet/signalr");

export const CONNECTION_START = 'CONNECTION_START';
export const CONNECTION_SUCCESS = 'CONNECTION_SUCCESS';
export const CONNECTION_FAILED = 'CONNECTION_FAILED'

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
    connection.start().then(() => dispatch(connectionSuccess(connection))).catch(err => dispatch(connectionFailed(error.message)));

    connection.on("publication", (data) => {
        let message = null;
        try {
             message = JSON.parse(data);
        } catch (e) {
            console.log(e);
        }
        dispatch();
        // console.log("sadfasdfasdfasdfadsfs");
        const encodedMsg =  " says " + message;
        console.log(message);
    });

  } else {
    dispatch(logout());
  }
}

export const subscribe = (id) => (dispatch, getState) => {

}

export const send = (id, message) => (dispatch, getState) => {
  const {conn} = getState().chatData.connection;
  if (conn) {
    conn.invoke("Publish","83ea2640-5ed2-4afe-8f86-c29450333c1b", message)
    .then(() => {
      dispatch();
    })
    .catch((err) => {
            return console.error(err.toString());
        });
  }
}
