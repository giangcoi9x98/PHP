import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { axiosApi } from "../utils/axios"
import { playSong } from "../actions/song"
import { useParams } from "react-router"
import SearchPageUI from "../components/SearchPage"

const SearchPage = (props) => {

    const [state, setState] = useState()
    const dispatch = useDispatch()

    const params = new URLSearchParams(props.location.search)
    const keyword = params.get("keyword")

    async function searchSong(searchKeyword) {
        const result = await axiosApi.get(`/search/song?_keyword=${searchKeyword}`)
        console.log("search result: ", result)
        setState(prevState => ({
            ...prevState,
            listSong: result.data
        }))
    }

    const isFirstRender = React.useRef(true);
    React.useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        //logic de o day
        const newParams = new URLSearchParams(props.location.search)
        const newKeyword = newParams.get("keyword")
        searchSong(newKeyword)
    }); //componentWillUpdate

    function handlePlaySong(song) {
        dispatch(playSong(song))
    }

    useEffect(() => {
        searchSong(keyword)
    }, [])

    return (
        <SearchPageUI handlePlaySong={handlePlaySong} data={state} />
    )
}

export default SearchPage