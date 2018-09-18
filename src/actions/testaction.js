
// All actions should have type
export const TEST_ACTION = 'TEST_ACTION'

// ActionCreators must dispatch action with type and data (if needed)

// Test Action (discribe what happend)
const testAction = (message) => ({
    type: TEST_ACTION,
    message
})

// Test ActionCreator (use in react componets to create action in redux)
export const testRun = (message) => (dispatch, getState) => {
    // dispatch Action
    dispatch(testAction(message));
}