import React, { useState, useEffect } from "react"
import { axiosApi, axiosAuth } from "../utils/axios"
import { useSelector, useDispatch } from "react-redux"
import CommentUI from "../components/Comment"

const Comment = (props) => {

    const maxCommentOnPage = 10

    const [state, setState] = useState({
        data: { comments: null, count: 0 },
        page: 1,
        totalPage: 1,
        show: false
    })

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

    function getComment(pageNumber) {
        console.log("props o comment:", props)
        let url = `/song/comment/${props.songId}?page=${pageNumber}&size=${maxCommentOnPage}`;
        axiosApi.get(url).then((result) => {
            console.log("commment result: ", result)
            setState(prevState => ({
                ...prevState,
                data: result.data,
                totalPage: Math.round(result.data.count / maxCommentOnPage)
            }))
        })
    }

    function changePage(pageNumber) {
        setState(prevState => ({
            ...prevState,
            page: pageNumber
        }))
        getComment(pageNumber)
    }

    function prevPage(){
        if (state.page >1){
            setState(prevState => ({
                ...prevState,
                page: state.page - 1
            }))
            getComment(state.page - 1)
        }
    }

    function nextPage(){
        if (state.page < state.totalPage){
            setState(prevState => ({
                ...prevState,
                page: state.page + 1
            }))
            getComment(state.page + 1)
        }
    }

    function handleChange(event){
        console.log("input: ", event.target.value)
        let content = event.target.value
        setState(prevState => ({
            ...prevState,
            input: content
        }))
    }

    async function handleSubmit(event){
        event.preventDefault()
        if(!props.logined){
            handleShow()
           return
        } else {
            if (state.input.length > 0){
                const axios = await axiosAuth()
                axios.post(`/users/comment/${props.songId}`, {
                    content: state.input
                  }).then((result) => {
                    window.location.reload()
                    setState(prevState => ({
                        ...prevState,
                        input: " "
                    }))
                  }).catch((e) => {
                    console.log("Loi o cho submit comment yeu cau dev xem lai")
                  })
            }
        }
    }

    useEffect(() => {
        getComment(1)
    }, []) // = compomentDidMount


    return (
        <CommentUI handleSubmit={handleSubmit} handleChange={handleChange} page={state.page} totalPage={state.totalPage} changePage={changePage} nextPage={nextPage} prevPage={prevPage} data={state.data} handleClose={handleClose} show={state.show} logined={props.logined} />
    )
}

export default Comment