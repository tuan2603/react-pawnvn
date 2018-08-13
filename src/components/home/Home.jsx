import React from 'react';
import {
    NavLink
} from "react-router-dom";
import { Container, Col, Row, Fa } from 'mdbreact';
import './HomePage.css';
import SlideTop from './SlideHome';

class HomePageMain extends React.Component {
    render() {
        return (
            <div >
                <SlideTop />
                <Container className="home-container">
                    <Row>
                        <Col md="10" className="mx-auto mt-4">
                            <p className="text-center">Google has designed a Material Design to make the web more
                                beautiful and more user-friendly.</p>
                            <p className="text-center">Twitter has created a Bootstrap to support you in faster and
                                easier development of responsive and effective websites.</p>
                            <p className="text-center">We present you a framework containing the best features of
                                both of them - Material Design for Bootstrap.</p>
                            <hr />
                            <h3 className="text-center mb-3">See it in action</h3>
                            <Row>
                                <Col md="4" className="text-center home-feature-box">
                                    <NavLink to="/css">
                                        <Fa icon="css3" className="pink-text" />
                                        <span>CSS</span>
                                    </NavLink>
                                </Col>
                                <Col md="4" className="text-center home-feature-box">
                                    <NavLink to="/components">
                                        <Fa icon="cubes" className="blue-text" />
                                        <span>Components</span>
                                    </NavLink>
                                </Col>
                                <Col md="4" className="text-center home-feature-box">
                                    <NavLink to="/advanced">
                                        <Fa icon="code" className="green-text" />
                                        <span>Advanced</span>
                                    </NavLink>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <div className="phonering-alo-phone phonering-alo-green phonering-alo-show" id="phonering-alo-phoneIcon" style={{left: "0px", bottom: "200px", position: "fixed"}}>
                    <div className="phonering-alo-ph-circle"> </div>
                    <div className="phonering-alo-ph-circle-fill"> </div>
                    <NavLink to="tel:0975 227 856" />
                    <div className="phonering-alo-ph-img-circle">
                        <NavLink to="tel:0975 227 856" />
                        <NavLink to="tel:0975 227 856" className="pps-btn-img " title="Liên hệ?">

                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePageMain;
