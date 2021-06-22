import { combineReducers, createStore } from "redux"
import playerReducer from "@store/player"
import playlistReducer from "@store/playlist"

const rootReducer = combineReducers({
    player: playerReducer,
    playlist: playlistReducer,
})

const store = createStore(rootReducer)

export default store
