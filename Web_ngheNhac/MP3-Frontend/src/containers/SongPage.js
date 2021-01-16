import React, { useState, useEffect } from "react"
import { axiosAuth } from "../utils/axios"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router";
import SongPageUI from "../components/SongPage"
import { playSong } from "../actions/song"
import Comment from "./Comment"

const SongPage = (props) => {


    let { id } = useParams()

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth)
    const songInfo = useSelector(state => state.song)
    const [state, setState] = useState({
        liked: false,
        show: false
    })

    async function getData(id) {
        const axios = await axiosAuth()
        const result = await axios.get(`/song/detail/${id}`)
        setState(prevState => ({
            ...prevState,
            item: result.data,
            liked: result.data.liked
        }))
    }

    function handleShow() {
        setState(prevState => ({
            ...prevState,
            show: true
        }))
    }

    function handleClose() {
        setState(prevState => ({
            ...prevState,
            show: false
        }))
    }

    function handlePlaySong() {
        console.log("item play song: ", state)
        dispatch(playSong(state.item))
    }

    async function handleLikeSong() {
        if (!user.logined) {
            handleShow()
            return
        }
        const axios = await axiosAuth()
        if (!state.liked) {
            setState(prevState => ({
                ...prevState,
                liked: true,
                item: {
                    ...state.item,
                    likeNumber: parseInt(state.item.likeNumber) + 1
                }
            }))
            await axios.post("/users/like", {
                songId: state.item.id
            })
        } else {
            setState(prevState => ({
                ...prevState,
                liked: false,
                item: {
                    ...state.item,
                    likeNumber: parseInt(state.item.likeNumber) - 1
                }
            }))
            await axios.post("/users/unlike", {
                songId: state.item.id
            })
        }
    }


    useEffect(() => {
        getData(id)
    }, []) // = compomentDidMount

    return (

        <div className='section'>
            <SongPageUI handleLikeSong={handleLikeSong} handlePlaySong={handlePlaySong} handleClose={handleClose} data={state} />
            <Comment  songId={id} logined={user.logined} />
        </div>
    )


}

export default SongPage