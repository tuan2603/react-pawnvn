import React from 'react';
import {
    Redirect
} from "react-router-dom";

import ReCAPTCHA from 'react-grecaptcha';
import autoBind from "react-autobind";
import validator from "password-validator";
import {show_notification} from "../../actions/notifyActions";
import {register, verifyCaptcha} from "../../helpers";
import {title} from "../../utils";
import {connect} from "react-redux";
import {alogin} from "../../actions/userActions";
import "./SignUp.css";

const checkPass = new validator();
// Add properties to it
checkPass
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits()                                 // Must have digits
    .has().symbols()                                 // Must have symbols
    .has().not().spaces();

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: {
                phone: "",
                password: "",
                countryData: "",
                fullName: "",
            },
            isDisabled: true,
            submitted: false,
            redirectToReferrer: false,
        };
        autoBind(this);
    }

    componentDidMount() {
        document.title = `${title} - Đăng ký`
    }

    handleChangePassword(event) {
        let {username} = this.state;
        username.password = event.target.value;
        if (checkPass.validate(username.password)) {
            this.setState({username});
        }
    }


    handleChangeFullname(event) {
        let {username} = this.state;
        username.fullName = event.target.value;
        if (username.fullName !== "") {
            this.setState({username});
        }
    }


    handleChangePhone(e) {
        let {username} = this.state;
        username.phone = e.target.value;
        username.countryData = "+84";
        this.setState({username});
    };

    // specifying your onload callback function
    expiredCallback() {
        let {dispatch} = this.props;
        this.setState({isDisabled: true});
        dispatch(show_notification({txt: "Đã hết thời gian verify captcha", type: "war"}));
    };

    verifyCallback(token) {
        verifyCaptcha(token)
            .then(response => {
                if (response !== undefined) {
                    this.setState({isDisabled: !response});
                }
            });
    }


    handleSubmit(e) {
        e.preventDefault();
        this.setState({submitted: true});
        const {dispatch} = this.props;
        let {phone, password, fullName, countryData} = this.state.username;
        register({phone, password, fullName, countryCode: countryData})
            .then(user => {
                if (user.value === 0) {
                    dispatch(show_notification({
                        txt: "Đăng ký thành công, vui lòng xác nhận bằng mã tin nhắn điện thoại ",
                        type: "suc"
                    }));
                    dispatch(alogin({phone}));
                    setTimeout(() => {
                        this.setState({redirectToReferrer: true});
                    }, 3000)
                } else {
                    dispatch(show_notification({txt: user.message, type: "err"}));
                }
            });
    }


    render() {
        let {isDisabled,  redirectToReferrer} = this.state;
        if (redirectToReferrer) {
            return <Redirect to="/verify"/>;
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
                                    <h3 className="blue-color">Đăng ký Cho Vay</h3>
                                    <div className="space-20"></div>
                                    <form id="sign-up-form" className="text-center">
                                        <label className="mt10" htmlFor="fullname">Họ và Tên</label>
                                        <input type="text"
                                               name="fullname"
                                               onChange={this.handleChangeFullname}
                                        />
                                        <div className="space-10"></div>
                                        <label className="mt10" htmlFor="phone">Số di động</label>
                                        <input type="text"
                                               name="phone"
                                               onChange={this.handleChangePhone}
                                        />

                                        <div className="space-10"></div>

                                        <label className="mt10" htmlFor="phone">Mật khẩu</label>
                                            <input type="password"
                                                   name="password"
                                                   onChange={this.handleChangePassword}
                                            />

                                        <div className="space-10"></div>

                                        <div className="form-label-xau">
                                            <ReCAPTCHA
                                                sitekey="6LfPfVwUAAAAAODFgOV5Qch0OV7lIBky41Tk1rp7"
                                                callback={this.verifyCallback}
                                                expiredCallback={this.expiredCallback}
                                                locale="en"
                                            />
                                        </div>
                                        <div className="space-10"></div>
                                        <p>Khi tiếp tục, tôi đồng ý PawnVN được phép thu thập, sử dụng và tiết lộ
                                            thông tin được tôi cung cấp theo <a
                                                href="/dieu-khoan-su-dung.html"> Chính sách Bảo mật </a>mà tôi đã
                                            đọc và hiểu.</p>


                                        <button className="bttn-default text-center" id="mySubmit"
                                                type="submit"
                                                disabled={isDisabled}
                                                onClick={this.handleSubmit}
                                        >ĐĂNG KÝ
                                        </button>
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

export default connect(mapStateToProps)(SignUp);
