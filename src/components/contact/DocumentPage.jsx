import React, { Component } from 'react';
import {
    NavLink
} from "react-router-dom";
import {Container, Row, Col, Jumbotron, Fa} from 'mdbreact';
import "./Doccument.css"

class DocumentPage extends Component {

    render() {
        return (
            <div>
                <div className="main-doccument">
                    <Container>
                        <Row>
                            <Col md="8" className="mt-3 mx-auto">
                                <Jumbotron>
                                    <ul className="list-unstyled example-components-list">
                                        <h6 className="mt-3 grey-text"> Thông tin Doanh nghiệp  </h6>
                                        <li>
                                            <NavLink to="/avatar"> Logo doanh nghiệp <b style={{color:"red"}}>*</b> <Fa icon="angle-right"/></NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/identily-card">Chứng minh nhân dân <b style={{color:"red"}}>*</b> <Fa icon="angle-right"/></NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/business-registration"> Giấy đăng ký Kinh doanh <b style={{color:"red"}}>*</b> <Fa
                                                icon="angle-right"/></NavLink>
                                        </li>
                                    </ul>
                                </Jumbotron>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default DocumentPage;
