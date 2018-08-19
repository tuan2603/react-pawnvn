import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import "./ModalLogin.css";
import autoBind from "react-autobind";
import tinylogo from "../../assets/img/tinylogo.png";
import {bindActionCreators} from "redux";
import * as userActions from "../../actions/userActions";
import * as notifyAction from "../../actions/notifyActions";
import {connect} from "react-redux";



class ModalLoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: {
                phone: "",
                password: "",
            },
            submitted: false,
            redirectToVerify: false,
        }
        autoBind(this);
    }

    handlePhone(e) {
        let {username} = this.state;
        username.phone = e.target.value;
        this.setState({username});
    }

    handlePassword(e) {
        let {username} = this.state;
        username.password = e.target.value;
        this.setState({username});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({submitted: true});

        let {phone, password} = this.state.username;
        if (phone !== "" && password !== "") {
            this.props.actions.Login({phone, password}).then(res => {
                if (res === 1){
                    this.setState({redirectToVerify: true});
                }
            });
        }else{
            this.props.actionsNoti.Notification({txt:"Số điện thoại và mật khẩu không để trống",type:"err"});
        }

    }

    render() {
        const {submitted, username, redirectToVerify} = this.state;

        if (redirectToVerify) {
            return <Redirect to="/verify"/>;
        }

        return (
                <div className="modal fade" id="modallogin" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title text-center" id="exampleModalLongTitle">Đăng Nhập với</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-center">
                                    <div className="team-image">
                                        <img src={tinylogo} height={96} alt=""/>
                                    </div>
                                    <h4>Pawn Việt Nam </h4>
                                    <form className="login-form">
                                        <input type="text" onChange={this.handlePhone} pattern="[0-9]*" required={true} className="form-control" placeholder="Số di động"/>
                                        <div className="space-10"></div>
                                        <input type="password" defaultValue=""   onChange={this.handlePassword} required={true} className="form-control" placeholder="Mật khẩu"/>
                                        <div className="space-10"></div>
                                        {submitted && !username &&
                                         <div className="help-block">Số điện thoại và mật khẩu không rổng</div>
                                        }
                                        <button type="submit"  className="bttn-default"  data-dismiss="modal"  onClick={this.handleSubmit}>Đăng nhập</button>
                                    </form>
                                    <div className="space-10"></div>
                                    <Link to="/verify" >Quên mật khẩu</Link>

                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
let mapStateToProps = (state) => {
    return {
        loggingIn: state.userReducers
    };
};
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch),
        actionsNoti: bindActionCreators(notifyAction, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalLoginPage);