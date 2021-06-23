import trackImg from '@assets/img/playlist/song-img.png'

const SET_TRACKS        = 'SET_TRACKS'
const SET_CURRENT_TRACK = 'SET_LOADED_TIME'

const SET_REPEAT   = 'SET_REPEAT'
const SWITCH_TRACK = 'SWITCH_TRACK'

const defaultState = {
    tracks: {},
    currentTrack: null,
    repeat: false
}

function playlistReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_TRACKS:
            return {
                ...state,
                tracks: action.payload,
            }

        case SET_CURRENT_TRACK:
            // null allowed
            if (typeof action.payload !== 'object') {
                return state
            }

            return {
                ...state,
                currentTrack: action.payload,
            }

        case SET_REPEAT:
            return {
                ...state,
                repeat: !!action.payload,
            }

        case SWITCH_TRACK:
            let nextTrackId

            if (action.payload === 'prev') {
                nextTrackId = +state.currentTrack?.id - 1
            } else {
                nextTrackId = +state.currentTrack?.id + 1
            }

            if (!state.tracks[nextTrackId]) {
                if (action.payload === 'next' && state.repeat) {
                    nextTrackId = 0
                } else {
                    return state
                }
            }

            const nextTrack   = Object.assign({}, state.tracks[nextTrackId])

            nextTrack.id = nextTrackId

            return {
                ...state,
                currentTrack: nextTrack
            }

        default:
            return state
    }
}

export default playlistReducer

export const setTracks       = (tracks) => ({type: SET_TRACKS, payload: tracks})
export const setCurrentTrack = (track) => ({type: SET_CURRENT_TRACK, payload: track})

export const setRepeat     = (bool) => ({type: SET_REPEAT, payload: bool})
export const turnPrevTrack = () => ({type: SWITCH_TRACK, payload: 'prev'})
export const turnNextTrack = () => ({type: SWITCH_TRACK, payload: 'next'})
