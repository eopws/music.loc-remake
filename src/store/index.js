import { combineReducers, createStore } from "redux"
import playerReducer from "@store/player"
import playlistReducer from "@store/playlist"
import addSongReducer from "@store/add-song"

const rootReducer = combineReducers({
    player: playerReducer,
    playlist: playlistReducer,
    addSong: addSongReducer,
})

const store = createStore(rootReducer)

export default store
