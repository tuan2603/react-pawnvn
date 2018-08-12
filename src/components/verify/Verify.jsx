import React, { Component } from 'react';
import {
    Redirect
} from "react-router-dom";

import { connect } from "react-redux";
import autoBind from "react-autobind";
import * as userActions from "../../actions/userActions";
import { bindActionCreators } from "redux";


class Verify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            submitted: false,
            redirectToReferrer: false,
        };
        autoBind(this);
    }

    verifyChange(event) {
        let code = event.target.value;
        if (code.length === 4) {
            this.setState({ code });
        }
    }

    submitSendSMS() {
        let { loggingIn } = this.props;
        this.props.actions.SendSMS(loggingIn.phone);
    }

    handleSubmit() {
        this.setState({ submitted: true });
        let { loggingIn } = this.props;
        let { code } = this.state;
        this.props.actions.Verify(code, loggingIn.phone).then(res => {
            if (res === true) {
                this.setState({ redirectToReferrer: true });
            }
        });
    }

    render() {
        let { loggingIn } = this.props;
        let { redirectToReferrer } = this.state;
        if (redirectToReferrer) {
            return <Redirect to="/signin" />;
        }
        let html = null;
        if (loggingIn == null) {
             return <Redirect to="/" />;
        } else {
            html = <p> {loggingIn.phone.length > 4 && " ******" + loggingIn.phone.substring(loggingIn.phone.length - 4, loggingIn.phone.length)} </p>
        }
        return (
            <div>
            <div className="main-signin">
            <div className="form-signin">
                    <form className="m-4">
                        <div className="text-center mb-4">
                            <p>Vui lòng xác thực số điện thoại bằng cách nhập Mã xác thực (OTP) đã gửi qua SMS đến
                            bạn </p>
                            {html}
                        </div>

                        <div className="form-label-xau">
                            <p>Mã xác thực</p>
                        </div>
                        <div className="form-label-group">
                            <input className="text-center password" type="password" 
                                placeholder="" name="verify"
                                onChange={this.verifyChange}
                            />
                        </div>
                        <div className="form-label-xau">
                            <button className="btn btn-lg btn-primary btn-block" id="mySubmit" type="submit"
                                onClick={this.handleSubmit}
                            >Gửi
                        </button>
                        </div>
                        <div className="form-label-xau">
                            <p>Bấm vào <a style={{ color: "blue" }} onClick={this.submitSendSMS}> đây </a> để hệ thống
                                gửi
                            lại mã xác thực qua SMS(nếu như bạn chưa nhận được tin nhăn sau 5 phút) </p>
                        </div>
                        </form>
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
    return { actions: bindActionCreators(userActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Verify);
