const initialState = {
    isLoading: false,
}
const START_LOADING = 'START_LOADING';
const STOP_LOADING = 'STOP_LOADING';

const startLoadingActionCreator = () => ({
    type: START_LOADING
})
const stopLoadingActionCreator = () => ({
    type: STOP_LOADING
})
const loaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case STOP_LOADING:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}
export { loaderReducer, startLoadingActionCreator, stopLoadingActionCreator };