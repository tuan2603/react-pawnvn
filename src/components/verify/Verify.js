import React, {Component} from 'react';
import {
    Redirect
} from "react-router-dom";

import {connect} from "react-redux";
import autoBind from "react-autobind";
import * as userActions from "../../actions/userActions";
import {bindActionCreators} from "redux";
import {title} from "../../utils";


class Verify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            submitted: false,
            redirectToReferrer: false,
            phone: ""
        };
        autoBind(this);
    }

    componentDidMount() {
        document.title = `${title} - Xác thực`;
        if (this.props.loggingIn != null) {
            this.setState({phone: this.props.loggingIn.phone})
        }
    }

    verifyChange(event) {
        let code = event.target.value;
        if (code.length === 4) {
            this.setState({code});
        }
    }

    phoneChange(event) {
        let phone = event.target.value;
        if (phone.length === 10) {
            this.setState({phone});
        }
    }

    submitSendSMS() {
        let {phone} = this.state;
        if (phone) {
            this.props.actions.SendSMS(phone * 1);
        }
    }

    handleSubmit() {
        this.setState({submitted: true});
        let {code, phone} = this.state;
        if (code.length === 4 || phone.length === 10) {
            this.props.actions.Verify(code, phone * 1).then(res => {
                if (res === true) {
                    this.setState({redirectToReferrer: true});
                }
            });
        }else{
            console.log(code, phone)
        }
    }

    render() {
        let {redirectToReferrer, phone} = this.state;
        if (redirectToReferrer) {
            return <Redirect to="/"/>;
        }
        let html = null;
        if (phone.length < 10) {
            return (
                <div>
                    <header className="site-header">
                    </header>
                    <div className="subscribe-area section-padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                                    <div className="subscribe-form text-center">
                                        <div className="container-fluid text-center">
                                            <div className="">
                                                <form id="sign-up-form" className="text-center">
                                                    <div className="form-label-xau">
                                                        <p>Số điện thoại</p>
                                                    </div>
                                                    <div className="form-label-group">
                                                        <input className="text-center password" type="text"
                                                               placeholder="" name="phone"
                                                               onChange={this.phoneChange}
                                                        />
                                                    </div>
                                                    <div className="space-20"></div>
                                                    <div className="form-label-xau">
                                                        <button className="btn btn-lg btn-primary btn-block"
                                                                id="mySubmit"
                                                                type="submit"
                                                                onClick={this.submitSendSMS}
                                                        >Gửi yêu cầu
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>);
        } else {
            html =
                <p> {phone.length >= 10 && " ******" + phone.substring(phone.length - 4, phone.length)} </p>
        }
        return (
            <div>
                <header className="site-header">
                </header>
                <div className="subscribe-area section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                                <div className="subscribe-form text-center">
                                    <h3 className="blue-color">Xác thực số điện thoại bằng cách nhập Mã xác thực (OTP)
                                        đã gửi qua SMS đến
                                        bạn</h3>
                                    <div className="space-20"></div>
                                    {html}
                                    <div className="space-20"></div>
                                    <form id="sign-up-form" className="text-center">

                                        <div className="form-label-xau">
                                            <p>Mã xác thực</p>
                                        </div>
                                        <div className="form-label-group">
                                            <input className="text-center password" type="password"
                                                   placeholder="" name="verify"
                                                   onChange={this.verifyChange}
                                            />
                                        </div>
                                        <div className="space-20"></div>
                                        <div className="form-label-xau">
                                            <button className="btn btn-lg btn-primary btn-block" id="mySubmit"
                                                    type="submit"
                                                    onClick={this.handleSubmit}
                                            >Gửi
                                            </button>
                                        </div>
                                        <div className="space-10"></div>
                                        <div className="form-label-xau">
                                            <p>Bấm vào <a style={{color: "blue"}}
                                                          onClick={this.submitSendSMS}> đây </a> để hệ thống
                                                gửi
                                                lại mã xác thực qua SMS(nếu như bạn chưa nhận được tin nhăn sau 5 phút)
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        loggingIn: state.userReducers,
        notification: state.notifyReducers
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(userActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Verify);
