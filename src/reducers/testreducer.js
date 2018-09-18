// Reducers modify state of store
// Actions can call reducers

// import types of actions
import { TEST_ACTION } from '../actions/testaction'

// init state when app is run
const initState = {
    message: null
}

// reducers must be immutable (!important)

// reducer which modify data about test
const testData = (state = initState, action) => {
    switch (action.type) {
        case TEST_ACTION: {
            // create new object with new ref (save immutable)
            // 1st way Create new Object
            return { message: action.message };
            // 2nd way call Object.assign (if data in state is huge and reducer change 1 or 2 props )
            return Object.assign({}, state, { message: action.message })
        }
        default: return state;
    }
}

export { testData }
