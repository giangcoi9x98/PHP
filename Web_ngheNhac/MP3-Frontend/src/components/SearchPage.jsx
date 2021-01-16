import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class SearchPage extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        console.log('Data o search page: ', this.props.data)
        if (this.props.data) {
            return (
                <div>
                    {
                        true &&
                        (
                            <div className="section">
                                <h3>Bài hát</h3>
                                <Row>
                                {this.props.data.listSong.map((song, index) => {
                                    if (index > 7) return <div></div>
                                    return (
                                        <Col key={index} col lg={2} md={3} className="playable song" onClick={() => {this.props.handlePlaySong(song)}} >
                                            <Link to={`/song/detail/${song.id}`}>
                                                <img src={song.image} className="song-image" alt={song.nameSong}></img>
                                                <p>{song.nameSong}</p>
                                                <div class="player-actions">
                                                    <ul>
                                                        <li style={{ zIndex: 11 }}>
                                                            <i class="icon ic-svg-play-outline"></i>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </Link>
                                        </Col>
                                    )
                                })}
                                </Row>
                            </div>
                        )
                    }
                </div>
            );
        } else {
            return <h3>Xin mời tìm kiếm ạ</h3>
        }
        
    }
}

export default SearchPage;