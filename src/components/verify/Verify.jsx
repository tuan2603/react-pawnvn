import React, {Component} from 'react';
import {
    Redirect
} from "react-router-dom";
import "./verify.css";
import {connect} from "react-redux";
import autoBind from "react-autobind";
import {getInfo, verifyHelper, smsHelper} from "../../helpers";
import {getFromSession, setInSession} from "../../utils";
import {TOKEN} from "../../constants/Users";
import {alogin} from "../../actions/userActions";
import {show_notification} from "../../actions/notifyActions";


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
            this.setState({code});
        }
    }

    submitSendSMS() {
        let {dispatch,loggingIn} = this.props;
        smsHelper(loggingIn.phone)
            .then(user => {
                if (user.value === 7) {
                    dispatch(show_notification({txt: "Gửi yêu cầu thành công,  vui lòng xác nhận bằng mã tin nhắn điện thoại", type: "suc"}));
                } else {
                    setTimeout(()=>{
                        dispatch(show_notification({txt: "Không nhận được tin nhắn vui lòng liện hệ qua email", type: "err"}));
                    },1000)
                }
            });
    }

    handleSubmit() {
        this.setState({submitted: true});
        let {dispatch,loggingIn} = this.props;
        let {code} = this.state;
        verifyHelper(code,loggingIn.phone)
            .then(user => {
                console.log(user);
                if (user.value === 0) {
                    setInSession(TOKEN, user.message);
                    dispatch(show_notification({txt: "xác thực thành công", type: "suc"}));
                    if(getFromSession(TOKEN) !== null )  {
                        getInfo().then(user => {
                            if (user.response === true) {
                                dispatch(alogin(user.value));
                            }
                        });
                    }
                    this.setState({redirectToReferrer: true});
                } else {
                    dispatch(show_notification({txt: user.message, type: "err"}));
                }
            });
    }

    render() {
        let {loggingIn} = this.props;
        let {redirectToReferrer} = this.state;
        if (redirectToReferrer){
            return <Redirect to="/signin" />;
        }
        let html = null;
        if (loggingIn == null) {
            return <Redirect to="/" />;
        }else {
             html = <p> {loggingIn.phone.length > 4 && " ******" +loggingIn.phone.substring(loggingIn.phone.length - 4, loggingIn.phone.length)} </p>
        }
        return (
            <div className="main-signup">
                <div className="form-signin">
                    <div className="text-center mb-4">
                        <p>Vui lòng xác thực số điện thoại bằng cách nhập Mã xác thực (OTP) đã gửi qua SMS đến
                            bạn </p>
                        {html}
                    </div>

                    <div className="form-label-xau">
                        <p>Mã xác thực</p>
                    </div>
                    <div className="form-label-group">
                        <input className="text-center" type="password"
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
                        <p>Bấm vào <a style={{color: "blue"}} onClick={this.submitSendSMS}> đây </a> để hệ thống
                            gửi
                            lại mã xác thực qua SMS(nếu như bạn chưa nhận được tin nhăn sau 5 phút) </p>
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

export default connect(mapStateToProps)(Verify);
