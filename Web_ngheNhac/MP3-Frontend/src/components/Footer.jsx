import React, { Component } from 'react';
import { Row, Col} from "react-bootstrap"

class Footer extends Component {
    render() {
        return (
            <div className="section footer">
                <Row className="sub-footer">
                    <Col className='footer-content'>
                        <span style={{marginRight: "4px"}} >Project 2:</span>
                        <span>Máy nghe nhạc pro vjp của Hiếu Vũ</span>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Footer;