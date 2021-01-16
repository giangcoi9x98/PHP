import { PLAY_SONG, REMOVE_LIST } from "../actions/song"

export default function (state = { activeSong: [], list: true }, action) {
    console.log("song o reduce`: ", action)
    switch (action.type) {
        case PLAY_SONG:
            let oldTrack = null;
            state.activeSong.forEach((data, index) => oldTrack = (data.id === action.payload.songActive.id ? index : oldTrack))
            if (oldTrack != null) {
                const newList = [...state.activeSong]
                newList.push(newList.splice(oldTrack, 1)[0])
                console.log("PLAY_SONG 1: ", { ...state, activeSong: newList, lisit: true })
                return { ...state, activeSong: newList, lisit: true }
            } else {
                console.log("PLAY_SONG 2: ", { ...state, list: true, activeSong: [...state.activeSong, action.payload.songActive] })
                return { ...state, list: true, activeSong: [...state.activeSong, action.payload.songActive] }
            }
        case REMOVE_LIST:
            console.log("tai sao may lai chay dcm")
            return { ...state, list: false }
        default:
            return state;
    }
}