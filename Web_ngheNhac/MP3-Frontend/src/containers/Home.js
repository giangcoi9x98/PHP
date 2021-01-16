import React, {useState} from "react"
import Slide from "../components/Slide"
import NewSong from "../components/NewSong"
import Albums from "../components/Albums"
import Artist from "../components/Artists"
import Footer from "../components/Footer"

const Home = (props) => {
    return (
        <>
        <Slide/>
        <NewSong/>
        <Albums/>
        <Artist/>
        <Footer/>
        </>
    )
}


export default Home

