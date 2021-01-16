import React, { Component } from 'react';
import { axiosApi } from "../utils/axios"
import Carousel from 'react-bootstrap/Carousel'


class Slide extends Component {
    constructor(props) {
        super(props)
        this.state = { items: [] }
        this.getData()
    }

    async getData() {
        const result = await axiosApi.get("/song/slide")
        this.setState({ items: result.data })
    }

    render() {
        return (
            <div>
                <Carousel>
                    {this.state.items.map((song,index) => {
                        console.log(song.coverImg)
                        return (
                            <Carousel.Item key={index} >
                                <a>
                                    <img className="d-block w-100"
                                        src={song.coverImg}
                                        alt={song.songName}
                                    />
                                </a>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            </div>
        );
    }
}


export default Slide;