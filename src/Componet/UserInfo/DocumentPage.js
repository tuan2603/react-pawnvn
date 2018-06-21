import React from 'react';
import {
    NavLink,  Redirect
} from "react-router-dom";
import {Container, Row, Col, Jumbotron, Fa} from 'mdbreact';
import "./Doccument.css"
import Config from "../../utils/config";
import {getFromStorage} from "../../utils/storage";

class DocumentPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                phone: '',
                accept: false,
            },
            title:"Bạn cần điền thông tin vào mẫu này để trở thành thành viên của PawnVN.",
            redirect:false,
        };

    }

    componentWillMount() {
        let b = getFromStorage(Config.USERINFO);
        if (b) {
            this.setState({user: b});
        }
    }

    componentDidMount() {
        let {phone, accept} = this.state.user;
        if (phone === ""){
            this.setState({ redirect: true });
        }
        if (accept){
            this.setState({ title:"Thông tin đã được xác thực!" });
        }
    }



    render() {
        const { redirect,title } = this.state;
        if (redirect) {
            return <Redirect to='/signin'/>;
        }
        return (
            <div>
                <div className="main-doccument">
                    <Container>
                        <Row>
                            <Col md="8" className="mt-3 mx-auto">
                                <Jumbotron>
                                    {/*<h1><Fa icon="cubes" className="grey-text"/> Components</h1>*/}
                                    <ul className="list-unstyled example-components-list">
                                        <h6 className="mt-3 grey-text"> {title}  </h6>
                                        <li>
                                            <NavLink to="/documents/profile-pictrue">Chụp ảnh chân dung <b style={{color:"red"}}>*</b> <Fa icon="angle-right"/></NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/documents/identily-card">Chứng minh nhân dân <b style={{color:"red"}}>*</b> <Fa icon="angle-right"/></NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/documents/vehicle-image">Hình xe <b style={{color:"red"}}>*</b> <Fa
                                                icon="angle-right"/></NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/documents/vehicle-log">Giấy đăng ký xe <b style={{color:"red"}}>*</b> <Fa icon="angle-right"/></NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/documents/vehicle-license">Giấy phép lái xe <b style={{color:"red"}}>*</b> <Fa icon="angle-right"/></NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/documents/vehicle-insurance">Bảo hiểm xe <b style={{color:"red"}}>*</b> <Fa
                                                icon="angle-right"/></NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/documents/device-information">Thiết bị điện thoại <b style={{color:"red"}}>*</b> <Fa icon="angle-right"/></NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/documents/student-card-clearance">Thẻ sinh viên(chỉ áp dụng nếu bạn là sinh viên) <Fa icon="angle-right"/></NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/documents/registration-book-clearance">Sổ hộ khẩu( chỉ áp dụng nếu bạn không phải là sinh viên) <Fa icon="angle-right"/></NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/documents/cv-clearance">Sơ yếu lý lịch <b style={{color:"red"}}>*</b> <Fa icon="angle-right"/></NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/documents/emergency-contact">Thông tiên liên hệ khẩn cấp <b style={{color:"red"}}>*</b> <Fa icon="angle-right"/></NavLink>
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
