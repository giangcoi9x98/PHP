import React, { Component } from 'react';
import { axiosApi } from "../utils/axios"
import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

class Artists extends Component {
    constructor(props) {
        super(props)
        this.state = { items: [] }
        this.getData()

    }

    async getData() {
        const result = await axiosApi.get("/artist/suggest")
        this.setState({ items: result.data })
    }

    render() {
        return (
            <div className="section" >
                <h3>Các nghệ sĩ ạ</h3>
                <Row>
                    {this.state.items.map((singer, index) => {
                        return (
                            <Col key={index} lg={2} >
                                <Link to={`artist/${singer.id}`}>
                                    <img src={singer.avatar} className="artist-image" alt={singer.name} />
                                    <p>{singer.name}</p>
                                </Link>
                            </Col>
                        )
                    })}
                </Row>

            </div>
        );
    }
}

export default Artists;