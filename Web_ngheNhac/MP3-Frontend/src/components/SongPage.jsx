import React, { Component } from 'react';
import { Row, Col, Button, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FaHeart, FaRegHeart, FaPlay } from 'react-icons/fa';

class SongPage extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        console.log("data o song page:", this.props)
        return (
            <div className="">
                <Modal show={this.props.data.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Chú ý</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn cần phải đăng nhập để thực hiện tính năng này</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose} >
                            Đóng
                        </Button>
                        <Button variant="primary" onClick={this.props.handleClose} >
                            <Link to='/login'>Login</Link>
                        </Button>
                    </Modal.Footer>
                </Modal>
                {this.props.data.item && (
                    <Row>
                        <Col lg={2} mg={2}>
                            <img alt={this.props.data.item.nameSong} className="img-song-detail" src={this.props.data.item.image} ></img>
                        </Col>
                        <Col lg={9} mg={9}>
                            <h4>{this.props.data.item.nameSong}</h4>
                            <br />
                            <span>Ca sĩ: </span>
                            <Link to={`/artist/detail/${this.props.data.item.singerId}`} ><span>{this.props.data.item.singer[0]}</span></Link>
                        <br />
                            <span>Lượt thích: </span>
                            <span>{this.props.data.item.likeNumber}</span>
                            <br />
                            <span>Thể loại: </span>
                            <Link to={`/category/detail/${this.props.data.item.categories[0].id}`} ><span>{this.props.data.item.categories[0].name}</span></Link>
                        <br />

                            <Button className="listen-button" onClick={this.props.handlePlaySong} >
                                <FaPlay />
                            </Button>

                            <Button className="like-button" onClick={this.props.handleLikeSong} >{
                                this.props.data.liked ?
                                    <FaHeart /> :
                                    <FaRegHeart />
                            }</Button>

                        </Col>
                    </Row>
                )}

            </div>
        );
    }
}

export default SongPage;