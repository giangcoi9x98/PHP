export const PLAY_SONG = "PLAY_SONG"
export const REMOVE_LIST = "REMOVE_LIST"

export const playSong = (song) => {
    console.log("song o action: ", song)
    return dispatch => {
        dispatch({
            type: PLAY_SONG,
            payload: {
                songActive: song
            }
        })
    }
}

export const removeOldList = () => {
    return dispatch => {
        dispatch({
            type: REMOVE_LIST,
        })
    }
}