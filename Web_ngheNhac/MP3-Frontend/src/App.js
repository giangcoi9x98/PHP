import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Header from "./components/Header"
import Home from "./containers/Home"
import SignUp from "./containers/SignUp"
import Login from "./containers/Login"
import SongPage from "./containers/SongPage"
import AudioController from "./containers/AudioController"
import ProtectedRoute from "./containers/ProtectedRoute"
import UserPage from "./containers/UserPage"
import SearchPage from "./containers/SearchPage"
import ArtistPage from "./containers/ArtistPage"
import AlbumPage from "./containers/AlbumPage"

export default class App extends Component {
    render() {
        return (
            <div>
                <Container>

                    <Router>
                        <Header />
                        <Route exact path="/" component={Home} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/login" component={Login} />
                        <Route path="/song/detail/:id" component={SongPage}/>
                        <ProtectedRoute path="/user/:id" component={UserPage}></ProtectedRoute>
                        <Route path="/search" component={SearchPage}/>
                        <Route path="/artist/detail/:id" component={ArtistPage}/>
                        <Route path="/album/:id" component={AlbumPage}/>
                    </Router>
                </Container>
                <AudioController/>
            </div>
        )
    }
}