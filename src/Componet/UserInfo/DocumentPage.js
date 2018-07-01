import React from 'react';
import {
    NavLink,  Redirect
} from "react-router-dom";
import {Container, Row, Col, Jumbotron, Fa} from 'mdbreact';
import "./Doccument.css"
import Config from "../../utils/config";
import {getFromStorage, setInStorage} from "../../utils/storage";
import Axios from "axios/index";
import Api from "../../utils/api";

class DocumentPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            useraccount: {
                id: '',
                token: '',
                activeType: '',
            },
            user: {
                phone: '',
                accept: false,
            },
            title:"Bạn cần điền thông tin vào mẫu này để trở thành thành viên của PawnVN.",
            redirect:false,
        };
        this.saveInfoUser = this.saveInfoUser.bind(this);
    }

    saveInfoUser(token, id){
        Axios({
            method: 'GET', //you can set what request you want to be
            url: Api.USERACCOUNT + id,
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(response => {
            if (response.status === 200) {
                setInStorage(Config.USERINFO, response.data.response);
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }


    componentWillMount() {
        let a = getFromStorage(Config.USER);
        if (a) {
            this.setState({useraccount: a});
            this.saveInfoUser(a.token,a.id);
        }
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
                                            <NavLink to="/documents/profile-pictrue">Logo - Danh mục - vị trí Doanh nghiệp <b style={{color:"red"}}>*</b> <Fa icon="angle-right"/></NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/documents/identily-card">Chứng minh nhân dân <b style={{color:"red"}}>*</b> <Fa icon="angle-right"/></NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/documents/business-registration"> Giấy đăng ký Kinh doanh <b style={{color:"red"}}>*</b> <Fa
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
