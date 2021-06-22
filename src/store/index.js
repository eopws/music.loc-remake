import { combineReducers, createStore } from "redux"
import playerReducer from "@store/player"

const rootReducer = combineReducers({
    player: playerReducer,
})

const store = createStore(rootReducer)

export default store
