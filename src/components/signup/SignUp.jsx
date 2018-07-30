import React from 'react';
import {
    Redirect
} from "react-router-dom";
import './SingUp.css';
import {Collapse} from 'mdbreact';
import IntlTelInput from 'react-intl-tel-input';
import libphonenumber from '../../../node_modules/react-intl-tel-input/dist/libphonenumber.js';
import ReCAPTCHA from 'react-grecaptcha';
import autoBind from "react-autobind";
import validator from "password-validator";
import {show_notification} from "../../actions/notifyActions";
import {verifyCaptcha} from "../../helpers";
import {connect} from "react-redux";

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
        if (username.fullName != "") {
            this.setState({username});
        }
    }


    handleChangePhone(status, value, countryData, number, id) {
        let {username} = this.state;
        username.phone = value;
        username.countryData = countryData;
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
        let {dispatch} = this.props;
    }


    render() {
        let {isDisabled, username, submitted } = this.state;
        return (
            <div className="main-signup">
                <div className="form-signin">
                    <div className="text-center mb-4">
                        <h1 className="h3 mb-3 font-weight-normal">Đăng ký PawnVN!</h1>
                    </div>

                    <div className="form-label-group">
                        <input type="text" placeholder="Họ và Tên"
                               name="fullname"
                               onChange={this.handleChangeFullname}
                        />
                    </div>
                    <Collapse isOpen={submitted && !username.fullName}>
                        <p>Vui lòng nhập đầy đủ họ tên</p>
                    </Collapse>

                    <div className={"form-label-group"}>
                        <IntlTelInput
                            onPhoneNumberChange={this.handleChangePhone}
                            onPhoneNumberBlur={this.handleChangePhone}
                            preferredCountries={['vn']}
                            onlyCountries={['vn', 'us']}
                            onSelectFlag={null}
                            nationalMode={false}
                            separateDialCode={true}
                            fieldId={'telphone'}
                            utilsScript={libphonenumber}/>
                    </div>

                    <Collapse isOpen={submitted && !username.phone}>
                        <p>Vui lòng nhập số điện thoại </p>
                    </Collapse>

                    <div className="form-label-group">
                        <input type="password" className={`password`}
                               placeholder="Mật khẩu" name="password"
                               onChange={this.handleChangePassword}
                        />
                    </div>
                    <Collapse isOpen={submitted && !username.password}>
                        <p>Vui lòng nhập Mật khẩu phải có ít nhất 8 ký tự, có
                            số, chữ hoa, chữ thường, ký tự đặc biệt</p>
                    </Collapse>


                    <div className="form-label-xau">
                        <ReCAPTCHA
                            sitekey="6LfPfVwUAAAAAODFgOV5Qch0OV7lIBky41Tk1rp7"
                            callback={this.verifyCallback}
                            expiredCallback={this.expiredCallback}
                            locale="en"
                        />
                    </div>

                    <div className="form-label-xau">
                        <p>Khi tiếp tục, tôi đồng ý PawnVN được phép thu thập, sử dụng và tiết lộ
                            thông tin được tôi cung cấp theo <a
                                href="/privacy"> Chính sách Bảo mật </a>mà tôi đã
                            đọc và hiểu.</p>
                    </div>
                    <div className="form-label-xau">
                        <button className="btn btn-lg btn-primary btn-block" id="mySubmit" type="submit"
                                disabled={isDisabled}
                                onClick={this.handleSubmit}
                        >ĐĂNG KÝ
                        </button>
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
