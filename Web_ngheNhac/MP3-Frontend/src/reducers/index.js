import {combineReducers} from "redux"
import AuthReducers from "./reducer_auth"
import SongReducers from "./reducer_song"

const rootReducer = combineReducers({
    auth: AuthReducers,
    song: SongReducers
})

export default rootReducer