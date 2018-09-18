import { createBrowserHistory } from 'history';

const initState = {
    history: createBrowserHistory()
}

const historyData = (state = initState, action) => {
    return state;
}

export { historyData };