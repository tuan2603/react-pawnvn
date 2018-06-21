import React from 'react';
import {
    Redirect
} from "react-router-dom";
import './SingUp.css';
import {Collapse,Jumbotron} from 'mdbreact';
import {ToastContainer, toast} from 'react-toastify';
import IntlTelInput from 'react-intl-tel-input';
import libphonenumber from '../../../node_modules/react-intl-tel-input/dist/libphonenumber.js';
import '../../pages/alerts.css';
import ReCAPTCHA from 'react-grecaptcha';
import Axios from 'axios';

import Api from '../../utils/api';
import {setInSession} from '../../utils/sessionStorage';

import passwordValidator from 'password-validator';

const checkPass = new passwordValidator();
// Add properties to it
checkPass
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits()                                 // Must have digits
    .has().symbols()                                 // Must have symbols
    .has().not().spaces();

class SimpleSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            phone: '',
            countryData: '',
            email: '',
            password: '',
            fullnameValid: false,
            phoneValid: false,
            emailValid: false,
            passwordValid: false,
            isDisabled: true,
            isRegister: false,
        };

        this.expiredCallback = this.expiredCallback.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.handleChangeFullname = this.handleChangeFullname.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkValid = this.checkValid.bind(this);
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    handleChangeEmail(event) {
        this.setState({email: event.target.value});
    }

    handleChangeFullname(event) {
        this.setState({fullname: event.target.value});
    }

    handleChangePhone(status, value, countryData, number, id) {
        console.log(status, value, countryData, number, id);
        if (status) {
            this.setState({phone: value, countryData: countryData.dialCode});
        } else {
            this.setState({phone: ''});
        }
        console.log(this.state.phone);
    };

    // specifying your onload callback function
    expiredCallback() {
        this.setState({isDisabled: true});
    };

    //specifying verify callback function
    //secret: '6LfPfVwUAAAAAFs896v-B4rzTILIYqhtSy_wjfbb',
    verifyCallback(token) {
        Axios.post(Api.CAPTCHA, {
            token: token
        })
            .then(response => {
                if (response.data !== undefined) {
                    this.setState({isDisabled: !response.data});
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    checkValid() {
        const {
            fullname,
            phone,
            email,
            password,
        } = this.state;

        if (!checkPass.validate(password)) {
            this.setState({passwordValid: true});
        } else {
            this.setState({passwordValid: false});
        }

        if (fullname === null || fullname.length < 7) {
            this.setState({fullnameValid: true});
        } else {
            this.setState({fullnameValid: false});
        }

        if (phone === null || phone.length < 7 || phone.length > 11 || !parseInt(phone, 10)) {
            this.setState({phoneValid: true});
        } else {
            this.setState({phoneValid: false});
        }

        if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            this.setState({emailValid: true});
        } else {
            this.setState({emailValid: false});
            let a = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            if (a[2] !== "gmail.") {
                this.setState({emailValid: true});
            }
        }

    }

    async handleSubmit() {
        await this.checkValid();
        const {countryData, password, fullname, phone, email, fullnameValid, phoneValid, emailValid, isDisabled, passwordValid} = await this.state;
        if (passwordValid || fullnameValid || phoneValid || emailValid || isDisabled) {
            toast.warn('Vui lòng kiểm tra giá trị nhập');
        } else {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const config = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    fullName: fullname,
                    email: email,
                    password: password,
                    countryCode: countryData,
                    phone: parseInt(phone, 10),
                }),
            };
            fetch(Api.REGISTER, config)
                .then((response) => response.json())
                .then((responseJson) => {
                    switch (responseJson.value) {
                        case 0:
                            toast.success('Đăng ký thành công');
                            setInSession("phone", parseInt(phone, 10));
                            setTimeout(function () {
                                this.setState({isRegister: true});
                            }.bind(this), 2000);

                            break;
                        case 1:
                            toast.warn('Mật khẩu không đúng qui định');
                            this.setState({passwordValid: true});
                            break;
                        case 2:
                            toast.warn('Email đã được sử dụng');
                            this.setState({emailValid: true});
                            break;
                        case 3:
                            toast.warn('Số điện thoại đã được sử dụng');
                            this.setState({emailValid: true});
                            break;
                        default:
                            toast.warn('Lỗi trong quá trình đăng ký');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    toast.warn('Lỗi trong quá trình đăng ký');
                });
        }
    }


    render() {
        let {isRegister} = this.state;
        if (isRegister) {
            return (<Redirect to="/verify"/>);
        }
        return (
            <div className="main-signup">
                <div className="form-signin">
                    <Jumbotron>
                        <div className="text-center mb-4">
                            <h1 className="h3 mb-3 font-weight-normal">Đăng ký PawnVN ngay!</h1>
                            <p>
                                Vui lòng điền thông tin đầy đủ và chính xác để PawnVN có thể liên hệ bạn
                                sớm nhất.
                            </p>
                        </div>
                        <div className="form-label-group">
                            <input type="text" value={this.state.fullname} placeholder="Họ và Tên"
                                   name="fullname"
                                   onChange={this.handleChangeFullname}
                            />
                        </div>
                        <Collapse isOpen={this.state.fullnameValid}>
                            <p>Vui lòng nhập đầy đủ họ tên</p>
                        </Collapse>
                        <div className="form-label-xau">
                            <IntlTelInput
                                onPhoneNumberChange={this.handleChangePhone}
                                onPhoneNumberBlur={this.handleChangePhone}
                                preferredCountries={['vn']}
                                onlyCountries={['vn', 'us']}
                                onSelectFlag={null}
                                nationalMode={false}
                                separateDialCode={true}
                                fieldId={'telphone'}
                                style={{
                                    width: "100%",
                                    border: '1px solid #D0D0D0',
                                    borderRadius: "5px"
                                }}
                                utilsScript={libphonenumber}/>
                        </div>

                        <Collapse isOpen={this.state.phoneValid}>
                            <p>Vui lòng nhập số điện thoại </p>
                        </Collapse>

                        <div className="form-label-group">
                            <input type="email" id="inputemail"
                                   placeholder="Địa chỉ email(Gmail)" name="email"
                                   onChange={this.handleChangeEmail}
                                   value={this.state.email}
                            />
                        </div>
                        <Collapse isOpen={this.state.emailValid}>
                            <p>Vui lòng nhập đúng tài khoản gmail</p>
                        </Collapse>


                        <div className="form-label-group">
                            <input type="password" value={this.state.password}
                                   placeholder="Mật khẩu" name="password"
                                   onChange={this.handleChangePassword}
                            />
                        </div>
                        <Collapse isOpen={this.state.passwordValid}>
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
                                    disabled={this.state.isDisabled}
                                    onClick={this.handleSubmit}
                            >ĐĂNG KÝ
                            </button>
                        </div>
                    </Jumbotron>


                </div>
                <ToastContainer
                    hideProgressBar={true}
                    newestOnTop={true}
                    autoClose={5000}
                />
            </div>
        );
    }
}


export default SimpleSelect;
