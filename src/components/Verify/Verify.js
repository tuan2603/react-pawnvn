import React, {Component} from 'react';
import {
    Redirect
} from "react-router-dom";
import "./verify.css";
import {getFromSession} from '../../utils/sessionStorage';
import Api from '../../utils/api';
import Axios from "axios/index";
import {ToastContainer, toast} from 'react-toastify';


class Verify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verify: '',
            phone: '',
            code: '',
            isRefesh: false,
            isSignIn: false,
        }
        this.verifyChange = this.verifyChange.bind(this);
        this.verifyPhone = this.verifyPhone.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.submitSendSMS = this.submitSendSMS.bind(this);
    }

    componentWillMount() {
        let phone = getFromSession('phone');
        if (phone) {
            this.setState({phone});
        }
    }

    verifyPhone(event) {
        this.setState({phone: event.target.value});
    }

    verifyChange(event) {
        this.setState({verify: event.target.value});
    }

    submitSendSMS() {
        const {phone} = this.state;
        if (phone.length < 5 || phone === undefined) {
            toast.error('phone number not exists. If you have account, click below to login');
        } else {
            Axios.post(Api.SENDSMS, {
                phone: parseInt(phone, 10),
            })
                .then(response => {
                    if (response.status === 200) {
                        let {value, code} = response.data;
                        console.log(value, code);
                        toast.success('Hệ thống đã gửi SMS, vui lòng kiểm tra tin nhắn');
                    }
                })
                .catch(function (error) {
                    toast.warn('Please check value typing');
                });
        }
    }

    handleSubmit() {
        const {phone, verify} = this.state;
        if (phone.length < 6 || phone === undefined) {
            toast.error('phone number not exists. If you have account, click below to login');
        } else {
            Axios.post(Api.VERIFYWEB, {
                phone: parseInt(phone, 10),
                code: verify,
            })
                .then(response => {
                    if (response.status === 200) {
                        let {activeType, value} = response.data;
                        if (activeType === 2 && value === 0) {
                            toast.success('Xác nhận thành công, đăng nhập và cập nhật thông tin để sớm trở thành thành viên OR-TRANS', {
                                position: toast.POSITION.BOTTOM_CENTER
                            });
                            setTimeout(function () {
                                this.setState({isSignIn: true});
                            }.bind(this), 2000);
                        } else {
                            toast.warn('Xác nhận không thành công');
                            setTimeout(function () {
                                this.setState({isRefesh: true});
                            }.bind(this), 2000);
                        }
                    } else {
                        toast.warn('Xác nhận không thành công');
                        setTimeout(function () {
                            this.setState({isRefesh: true});
                        }.bind(this), 2000);
                    }
                })
                .catch(function (error) {
                    toast.warn('Please check value typing');
                });
        }
    }

    render() {
        return (
            <div className="main-signup">
                <div className="form-signin">
                    {this.state.isSignIn ? (<Redirect to="/signin"/>) : ""}
                    {this.state.isRefesh ? (<Redirect to="/verify"/>) : ""}
                    <div className="text-center mb-4">
                        <p>Vui lòng xác thực số điện thoại bằng cách nhập Mã xác thực (OTP) đã gửi qua SMS đến
                            bạn </p>
                        <p> {this.state.phone.length > 4 && " ******" + this.state.phone.substring(this.state.phone.length - 4, this.state.phone.length)} </p>
                    </div>
                    <div className="form-label-xau">
                        <p>Số điện thoại</p>
                    </div>
                    <div className="form-label-group">
                    <input className="text-center" type="tel"
                               placeholder="" name="phone"
                               onChange={this.verifyPhone}
                        />
                    </div>
                    <div className="form-label-xau">
                        <p>Mã xác thực</p>
                    </div>
                    <div className="form-label-group">
                        <input className="text-center" type="password" value={this.state.verify}
                               placeholder="" name="verify"
                               onChange={this.verifyChange}
                        />
                    </div>
                    <div className="form-label-xau">
                        <button className="btn btn-lg btn-primary btn-block" id="mySubmit" type="submit"
                                onClick={this.handleSubmit}
                        >Gửi</button>
                    </div>
                    <div className="form-label-xau">
                        <p>Bấm vào <a style={{color: "blue"}} onClick={this.submitSendSMS}> đây </a> để hệ thống
                            gửi
                            lại mã xác thực qua SMS(nếu như bạn chưa nhận được tin nhăn sau 5 phút) </p>
                    </div>
                    {/*<Row className="d-flex">*/}
                    {/*<Col md="10" className="mx-auto mt-4">*/}
                    {/*<p>Bấm vào <a style={{color: "blue"}} href="/signin"> đây </a> để đăng nhập (nếu như bạn*/}
                    {/*đã*/}
                    {/*có tài khoản ) </p>*/}
                    {/*</Col>*/}
                    {/*</Row>*/}
                    <ToastContainer
                        hideProgressBar={true}
                        newestOnTop={true}
                        autoClose={5000}
                    />
                </div>
            </div>

        );
    }
}

export default Verify;
