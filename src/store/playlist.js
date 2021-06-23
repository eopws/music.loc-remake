import trackImg from '@assets/img/playlist/song-img.png'

const SET_TRACKS        = 'SET_TRACKS'
const SET_CURRENT_TRACK = 'SET_LOADED_TIME'

const SHUFFLE      = 'SHUFFLE'
const SET_REPEAT   = 'SET_REPEAT'
const SWITCH_TRACK = 'SWITCH_TRACK'

const defaultState = {
    tracks: [],
    currentTrack: null,
    repeat: false
}

function playlistReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_TRACKS: {
            return {
                ...state,
                tracks: action.payload,
            }
        }

        case SET_CURRENT_TRACK: {
            // null allowed
            if (typeof action.payload !== 'object') {
                return state
            }

            return {
                ...state,
                currentTrack: action.payload,
            }
        }

        case SHUFFLE: {
            const tracks  = state.tracks.slice()

            for (let i = tracks.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1))

                let temp = tracks[i]
                tracks[i] = tracks[j]
                tracks[j] = temp
            }

            const currentTrackId = state.currentTrack ? state.currentTrack.id : null

            if (currentTrackId !== null) {
                const currentTrackIndex = tracks.findIndex((item) => item.id === currentTrackId)

                let temp = tracks[currentTrackIndex]
                tracks[currentTrackIndex] = tracks[0]
                tracks[0] = temp
            }

            return {
                ...state,
                tracks: tracks,
            }
        }

        case SET_REPEAT: {
            return {
                ...state,
                repeat: !!action.payload,
            }
        }

        case SWITCH_TRACK: {
            const currentTrackId = state.currentTrack ? state.currentTrack.id : null
            const tracks         = state.tracks

            if (currentTrackId === null) {
                return state
            }

            let nextTrackIndex

            if (action.payload === 'prev') {
                nextTrackIndex = tracks.findIndex((item) => item.id === currentTrackId) - 1
            } else {
                nextTrackIndex = tracks.findIndex((item) => item.id === currentTrackId) + 1
            }

            if (!tracks[nextTrackIndex]) {
                if (state.repeat) {
                    nextTrackIndex = 0
                } else {
                    return state
                }
            }

            const newTrack = Object.assign({}, tracks[nextTrackIndex])

            return {
                ...state,
                currentTrack: newTrack
            }
        }

        default: {
            return state
        }
    }
}

export default playlistReducer

export const setTracks       = (tracks) => ({type: SET_TRACKS, payload: tracks})
export const setCurrentTrack = (track) => ({type: SET_CURRENT_TRACK, payload: track})

export const shufflePlaylist = () => ({type: SHUFFLE})
export const setRepeat       = (bool) => ({type: SET_REPEAT, payload: bool})
export const turnPrevTrack   = () => ({type: SWITCH_TRACK, payload: 'prev'})
export const turnNextTrack   = () => ({type: SWITCH_TRACK, payload: 'next'})
