import React, { Component } from 'react';
import { axiosApi } from "../utils/axios"
import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

class Albums extends Component {
    constructor(props) {
        super(props)
        this.state = { items: [] }
        this.getData()
    }

    async getData() {
        const result = await axiosApi.get("/album/new")
        this.setState({ items: result.data })
    }

    render() {
        return (
            <div className="section" >
                <h3>Các Album mới ạ</h3>
                <Row>
                    {this.state.items.map((album, index) => {
                        if (index > 4) return <></>
                        return (

                            <Col key={index} >
                                <Link to={`/album/${album.id}`} >
                                    <img className="album-image" src={album.img} alt={album.albumName} />
                                    <p>{album.albumName}</p>
                                </Link>
                            </Col>
                        )
                    })}
                </Row>
            </div>
        );
    }
}

export default Albums;