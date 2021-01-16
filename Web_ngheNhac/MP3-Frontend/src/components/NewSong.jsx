import React, { Component } from 'react';
import { axiosApi } from "../utils/axios"
import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

class NewSong extends Component {
    constructor(props) {
        super(props)
        this.state = { items: [] }
        this.getData()
    }

    async getData() {
        const result = await axiosApi.get('/song/new')
        this.setState({ items: result.data })
    }

    render() {
        return (
            <div className="section">
                <h3>Các bài hát mới</h3>
                <Row>
                    {this.state.items.map((song, index) => {
                        if (index > 11) return <></>
                        return (
                            <Col key={index} col lg={2} md={2} className="playable song" >
                                <Link to={`song/detail/${song.id}`} >
                                    <img src={song.image} className="song-image" alt={song.songName} />
                                    <p>{song.songName}</p>
                                    <div className="player-actions">
                                        <ul>
                                            <li style={{ zIndex: 11 }} >
                                                <i className="icon ic-svg-play-outline"></i>
                                            </li>
                                        </ul>
                                    </div>
                                </Link>
                            </Col>
                        )
                    })}
                </Row>
            </div>
        );
    }
}

export default NewSong;