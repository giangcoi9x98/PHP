import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { axiosAuth } from "../utils/axios"
import { playSong } from "../actions/song"
import UserPageUI from "../components/UserPage"
import { useParams } from "react-router"

const UserPage = (props) => {

    let { id } = useParams()

    const dispatch = useDispatch()

    const user = useSelector(state => state.auth)

    const [state, setState] = useState()

    async function getListSong(id) {
        const axios = await axiosAuth()
        const result = await axios.get("/song/like")
        console.log("Data list song: ", result)
        setState(prevState => ({
            ...prevState,
            listSong: result.data
        }))
    }

    function handlePlaySong(currentSong) {
        dispatch(playSong(currentSong))
    }

    async function handleUnLikeSong(id) {
        const axios = await axiosAuth();
        await axios.post(`/users/unlike/`, {
            songId: id
        })
        window.location.reload()
    }

    useEffect(() => {
        getListSong()
    }, []) //componentDidMount

    useEffect(() => {
        getListSong()
    })

    return (
        <UserPageUI handleUnLikeSong={handleUnLikeSong} handlePlaySong={handlePlaySong} data={state} />
    )
}

export default UserPage