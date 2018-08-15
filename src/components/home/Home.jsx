import React from 'react';
import {
    NavLink
} from "react-router-dom";
import {Container, Col, Row, Fa} from 'mdbreact';
import './HomePage.css';
import SlideTop from './SlideHome';
import {Footers} from '../../components/footer';
import {title} from '../../utils';
import download_btn_clipped from '../../assets/img/download_btn_clipped.jpg';
import app_store_download from '../../assets/img/app_store_download.png';


class HomePageMain extends React.Component {
    componentDidMount() {
        document.title = `${title} - Trang chủ`
    }

    render() {
        return (
            <div>
                <SlideTop/>
                <Container className="home-container">
                    <Row>
                        <Col md="10" className="mx-auto mt-4">
                            <p className="text-center">Google has designed a Material Design to make the web more
                                beautiful and more user-friendly.</p>
                            <p className="text-center">Twitter has created a Bootstrap to support you in faster and
                                easier development of responsive and effective websites.</p>
                            <p className="text-center">We present you a framework containing the best features of
                                both of them - Material Design for Bootstrap.</p>
                            <hr/>
                            <h3 className="text-center mb-3">See it in action</h3>
                            <Row>
                                <Col md="4" className="text-center home-feature-box">
                                    <NavLink to="/css">
                                        <Fa icon="css3" className="pink-text"/>
                                        <span>CSS</span>
                                    </NavLink>
                                </Col>
                                <Col md="4" className="text-center home-feature-box">
                                    <NavLink to="/components">
                                        <Fa icon="cubes" className="blue-text"/>
                                        <span>Components</span>
                                    </NavLink>
                                </Col>
                                <Col md="4" className="text-center home-feature-box">
                                    <NavLink to="/advanced">
                                        <Fa icon="code" className="green-text"/>
                                        <span>Advanced</span>
                                    </NavLink>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>

                <div id="home-cta" className="home-cta text-center">
                    <div className="wrap cols text-center">
                        <div className="col-8 main-color centered-col"><p className="h2">Tải ứng dụng</p>
                            <NavLink to={"#"}
                                className="btn big download wide offset signload-btn"> <img
                                src={app_store_download} alt="" height={40}/></NavLink>
                            <NavLink
                                to={"#"}
                                className="btn big download wide offset signload-btn">
                                <img src={download_btn_clipped} alt="" height={60}/>
                            </NavLink></div>
                    </div>
                </div>

                <Footers/>
            </div>
        );
    }
}

export default HomePageMain;
