import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, FormLabel, Button, Modal, Pagination } from "react-bootstrap"
import { Link } from "react-router-dom"
import Moment from "react-moment"

class Comment extends Component {

    constructor(props) {
        super(props)
    }

    pagination() {
        let arr = []
        for (let i = 1; i < this.props.totalPage; i++) {
            arr.push(i)
        }
        return (
            <Pagination style={{ paddingLeft: '80%' }} >
                <Pagination.Prev onClick={this.props.prevPage} />
                {
                    arr.map((number) => {
                        return <Pagination.Item active={this.props.page === number}
                            onClick={this.props.changePage(number)}
                        >
                            {number}</Pagination.Item>
                    })
                }
                <Pagination.Next onClick={this.props.nextPage} />
            </Pagination>
        )
    }

    render() {
        console.log("data o commentUI:", this.props)
        return (
            <div className="section comment">
                <Modal show={this.props.show} onHide={this.props.handleClose} >
                    <Modal.Header closeButton>
                        <Modal.Title>Chú ý</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn cần phải đăng nhập để thực hiện tính năng này</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose} >
                            Đóng
                         </Button>
                        <Link to='/login'>
                            <Button variant="primary" onClick={this.props.handleClose} >
                                <span>Login</span>
                            </Button>
                        </Link>
                    </Modal.Footer>
                </Modal>
                <h4>Nhận xét ({this.props.data.count})</h4>
                <Row>
                    <Col>
                        <Form onSubmit={this.props.handleSubmit} >
                            <FormGroup>
                                <FormLabel>Nhận xét của bạn</FormLabel>
                                <Form.Control onChange={this.props.handleChange} as="textarea" rows="3" style={{ height: '100px', backgroundColor: '#252323', color: '#ffffff' }} type="text" placeholder="Nhận xét của bạn..."></Form.Control>
                                <br />
                                <Button variant="primary" type="submit" style={{ float: 'right' }}>
                                    Gửi
                                </Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
                {
                    this.props.data.comments ?
                        <div>
                            {this.props.data.comments.map((comment) => {
                                return (
                                    <Row className="comment-box-content">
                                        <Col lg={1}>
                                            <img src={comment.avatar} alt={comment.username}
                                                className="avatar-comment"></img>
                                        </Col>
                                        <Col style={{ marginLeft: '20px' }}>
                                            <p style={{ fontSize: '18px' }}>{comment.name}</p>
                                            <p style={{ fontSize: '15px' }}>{comment.content}</p>
                                            <p style={{ fontSize: '11px' }}>
                                                <Moment format="YYYY/MM/DD">
                                                    {comment.createdAt}
                                                </Moment>
                                            </p>
                                        </Col>
                                    </Row>
                                )
                            })}
                        </div>
                        :
                        <div>Khong co comment</div>
                }
                {this.pagination()}
            </div>

        );
    }
}

export default Comment;