import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaEllipsisV } from 'react-icons/fa';

class UserPage extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.data) {
            console.log("data o userpage: ", this.props.data)
            return (
                <div>
                    <div className="section">
                        <h3>Danh sách các bài hát bạn đã thích ạ</h3>
                        <Row>
                            <Col className="list-song-album-page" >
                                {this.props.data.listSong.map((song, index) => {
                                    return (
                                        <div key={index} style={{ display: '-webkit-box' }}>
                                            <div className="all-card playable"  >
                                                <div className="song-list" key={index} onClick={() => { this.props.handlePlaySong(song) }}>
                                                    <div className="order">
                                                        <span className="list-number">{index + 1}</span>
                                                    </div>
                                                    <img src={song.image} className="thum-40" alt={song.nameSong}></img>
                                                </div>
                                                <div className="song-card-info">
                                                    <div className="title">
                                                        <p className="title-singer">{song.nameSong}</p>
                                                    </div>
                                                    <div className="artist">
                                                        <span>{song.singer}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                {
                                                    song.liked ?
                                                        <FaHeart className='like-icon' onClick={() => this.props.handleUnLikeSong(song.id)} /> :
                                                        <FaRegHeart className='like-icon'  />
                                                }
                                                <Link to={`/song/detail/${song.id}`} style={{ marginLeft: '20px' }}>
                                                    <FaEllipsisV className='like-icon' />
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </Col>
                        </Row>
                    </div>
                </div>
            );
        } else {
            return <></>
        }

    }
}


export default UserPage;