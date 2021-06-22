const SET_LOADED_TIME   = 'SET_LOADED_TIME'
const SET_DURATION      = 'SET_DURATION'
const SET_IS_PLAYING    = 'SET_IS_PLAYING'
const SET_VOLUME        = 'SET_VOLUME'
const SET_CURRENT_TIME  = 'SET_CURRENT_TIME'

const defaultState = {
    loadedTime: 0,
    duration: 0,
    isPlaying: false,
    volume: 100, // volume value from 0 to 100
    currentTime: 0,
}

function playerReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_LOADED_TIME:
            return {
                ...state,
                loadedTime: action.payload,
            }

        case SET_DURATION:
            return {
                ...state,
                duration: action.payload,
            }

        case SET_IS_PLAYING:
            return {
                ...state,
                isPlaying: action.payload,
            }

        case SET_VOLUME:
            if ((action.payload < 0) || (action.payload > 100)) {
                return state
            }

            return {
                ...state,
                volume: action.payload,
            }

        case SET_CURRENT_TIME:
            return {
                ...state,
                currentTime: action.payload,
            }

        default:
            return state
    }
}

export default playerReducer

export const setLoadedTime   = (time) => ({type: SET_LOADED_TIME, payload: time})
export const setDuration     = (duration) => ({type: SET_DURATION, payload: duration})
export const setIsPlaying    = (bool) => ({type: SET_IS_PLAYING, payload: bool})
export const setVolume       = (volume) => ({type: SET_VOLUME, payload: volume})
export const setCurrentTime  = (time) => ({type: SET_CURRENT_TIME, payload: time})
