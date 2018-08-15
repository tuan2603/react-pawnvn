import React from 'react';
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Col,Footer } from 'mdbreact';
import autoBind from 'react-autobind';



class Footers extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return (
            <div className="footer-main">
                <Footer color="stylish" className="font-small pt-4 mt-4">
                    <Container className="text-center text-md-left">
                        <Row className="text-center text-md-left mt-3 pb-3">
                            <Col md="3" lg="3" xl="3" className="mx-auto mt-3">
                                <p><NavLink to="/signup">Đăng ký</NavLink></p>
                                <p><NavLink to="/gioi-thieu.html">Giới thiệu</NavLink></p>
                                <p><NavLink to="/dieu-khoan-su-dung.html">Điều khoản</NavLink></p>
                                <p><NavLink to="/hoi-dap.html">Hỏi đáp</NavLink></p>
                            </Col>
                            <hr className="w-100 clearfix d-md-none"/>
                            <Col md="3" lg="3" xl="3" className="mx-auto mt-3">
                                <p><i className="fa fa-envelope mr-3"></i><a href="mailto:ori.pawnvietnam@gmail.com">ori.pawnvietnam@gmail.com</a></p>
                                <p><i className="fa fa-phone mr-3"></i><a href="+84 938 950 407">+84 938 950 407</a></p>
                                <p><i className="fa fa-question mr-3"></i><a href="/cau-hoi-thuong-gap.html">Câu hỏi thường gặp</a></p>
                            </Col>
                            <hr className="w-100 clearfix d-md-none"/>
                            <Col md="6" lg="6" xl="6" className="mx-auto mt-3 text-right">
                                <p> CTy TNHH OPTIMIZATION RESOURCES INTERFACE </p>
                                <p> Block A - toà nhà Sky Center - Phổ Quang - Q.Tân Bình - TP.HCM</p>
                            </Col>
                        </Row>
                        <hr/>
                        <Row className="d-flex align-items-center">
                            <Col md="8" lg="8">
                                <p className="text-center text-md-left grey-text">&copy; {(new Date().getFullYear())} Copyright: <a href="http://www.pawnvietnam.vn"> pawnvietnam </a></p>
                            </Col>
                            <Col md="4" lg="4" className="ml-lg-0">
                                <div className="text-center text-md-right">
                                    <ul className="list-unstyled list-inline">
                                        <li className="list-inline-item"><a className="btn-floating btn-sm btn-fb mx-1"><i className="fa fa-facebook"> </i></a></li>
                                        <li className="list-inline-item"><a className="btn-floating btn-sm btn-tw mx-1"><i className="fa fa-twitter"> </i></a></li>
                                        <li className="list-inline-item"><a className="btn-floating btn-sm btn-gplus mx-1"><i className="fa fa-google-plus"> </i></a></li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Footer>
            </div>
        );
    }


}

export  default Footers;