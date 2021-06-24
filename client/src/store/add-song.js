const SET_IS_SHOWN = 'SET_IS_SHOWN'

const defaultState = {
    isShown: false
}

function addSongReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_IS_SHOWN:
            return {
                ...state,
                isShown: action.payload
            }

        default:
            return state
    }
}

export default addSongReducer

export const hideModal = () => ({type: SET_IS_SHOWN, payload: false})
export const showModal = () => ({type: SET_IS_SHOWN, payload: true})
