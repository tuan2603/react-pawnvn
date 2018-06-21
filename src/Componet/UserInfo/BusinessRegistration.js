import React from 'react';
import {
    Redirect
} from "react-router-dom";
import {Collapse} from 'mdbreact';
import {ToastContainer, toast} from 'react-toastify';
import {Jumbotron} from 'mdbreact';
import Api from '../../utils/api';
import {getFromStorage, setInStorage} from "../../utils/storage";
import Config from "../../utils/config";
import './Profile.css';
import picture from '../../img/picture.svg';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';


class BusinessRegistration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            useraccount: {
                id: '',
                token: '',
                activeType: '',
            },
            user: {
                accept: '',
                phone: '',
                city: '', // tỉnh thành phố
                companyName: '', // Tên công ty, doanh nghiệp
                address: '', // địa chỉ công ty
                businessNumber: '',//số đăng ký doanh nghiệp
                businessDate: moment(), //ngày cấp
                licensee: '', // nơi cấp
                licenseeImageFront: '', // ảnh giấy phép kinh doanh mặt trước
                licenseeImageBehind: '', //ảnh giấy phép kinh doanh mặt sau
                representativeName: '', //tên người đại diện
                title: '',// chức danh
            },
            isDisabled: true,
            businessNumberValid: false,
            isRedirect: false,
            isRefesh: false,
            isChange: false,
        };

        this.handlelicenseeImageFront = this.handlelicenseeImageFront.bind(this);
        this.handlelicenseeImageBehind = this.handlelicenseeImageBehind.bind(this);
        this.handleIdentitybusinessNumber = this.handleIdentitybusinessNumber.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangecity = this.handleChangecity.bind(this);
        this.handleChangebusinessDate = this.handleChangebusinessDate.bind(this);

    }

    componentWillMount() {
        let a = getFromStorage(Config.USER);
        if (a) {
            this.setState({useraccount: a});
        }

        let b = getFromStorage(Config.USERINFO);
        if (b) {
            this.setState({user: b});
        }
    }

    componentDidMount() {
        let {identityCardDateIssued, identitybusinessNumber, birthday, sex} = this.state.user;
        if (identityCardDateIssued !== undefined && identitybusinessNumber !== undefined && birthday !== undefined && sex !== undefined) {
            this.setState({
                isDisabled: false,
            });
        }
    }

    handleIdentitybusinessNumber(event) {
        let {user} = this.state;
        user.identitybusinessNumber = event.target.value;
        this.setState({user});
        if (event.target.value.toString().length === 9 && event.target.value.match(/^[0-9]+$/) != null ) {
            this.setState({
                businessNumberValid: false,
                isChange: true,
            });
            if (user.identityCardDateIssued && user.birthday && user.sex) {
                this.setState({
                    isDisabled: false,
                });
            }
        } else {
            this.setState({
                businessNumberValid: true,
                isDisabled: true,
            });
        }
    }

    handleChangecity(event) {
        let {user} = this.state;
        user.sex = event.target.value;
        if (user.sex) {
            this.setState({
                user,
                isChange: true,
            });
            if (user.identityCardDateIssued && user.birthday && user.identitybusinessNumber) {
                this.setState({
                    isDisabled: false,
                });
            }
        } else {
            this.setState({
                isDisabled: true,
            });
        }
    }

    handleChangeDate(date) {
        let {user} = this.state;
        user.identityCardDateIssued = date;
        if (date !== undefined) {
            this.setState({
                user,
                isChange: true,
            });
            if (user.sex && user.birthday && user.identitybusinessNumber) {
                this.setState({
                    isDisabled: false,
                });
            }
        } else {
            this.setState({
                isDisabled: true,
            });
        }
    }

    handleChangebusinessDate(date) {
        let {user} = this.state;
        user.birthday = date;
        if (date !== undefined) {
            this.setState({
                user,
                isChange: true,
            });
            if (user.sex && user.identityCardDateIssued && user.identitybusinessNumber) {
                this.setState({
                    isDisabled: false,
                });
            }
        } else {
            this.setState({
                isDisabled: true,
            });
        }
    }

    handleSubmit() {
        const {isDisabled, isChange} = this.state;
        const {id} = this.state.useraccount;
        const {sex, identitybusinessNumber, identityCardDateIssued, birthday} = this.state.user;
        if (isChange) {
            if (isDisabled || !moment(birthday).isValid() || (sex + "").toString().length < 4 || !moment(identityCardDateIssued).isValid() || identitybusinessNumber.toString().length !== 9) {
                if (!moment(birthday).isValid() || !moment(identityCardDateIssued).isValid()) {
                    toast.warn('Vui lòng chọn ngày đúng');
                }
                if ((sex + "").length < 4) {
                    toast.warn('Vui lòng chọn giới tính');
                }
                if (identitybusinessNumber.toString().length !== 9) {
                    this.setState({
                        businessNumberValid: true,
                        isDisabled: true,
                    });
                }
            } else {
                console.log(id, sex, identitybusinessNumber, identityCardDateIssued, birthday);
                const headers = new Headers();
                headers.append('Authorization', 'Bearer ' + this.state.useraccount.token);
                headers.append('Content-Type', 'application/json');
                const config = {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        'identitybusinessNumber': identitybusinessNumber,
                        'identityCardDateIssued': moment(identityCardDateIssued).valueOf(),
                        'sex': sex,
                        'birthday': moment(birthday).valueOf(),
                        'id': id,
                    }),
                };
                fetch(Api.PROFILE_DOC, config)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        if (responseJson.value === true) {
                            setInStorage(Config.USERINFO, responseJson.response);
                            toast.success('Cập nhật thành công');
                            setTimeout(function () {
                                this.setState({user: responseJson.response, isRedirect: true});
                            }.bind(this), 2000);

                        } else {
                            toast.warn('Cập nhật thất bại vui lòng kiểm tra giá trị nhập');
                            console.log(responseJson.response);
                            this.setState({isRefesh: true})
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        } else {
            this.setState({isRedirect: true});
        }

    }


    handlelicenseeImageFront(ev) {
        ev.preventDefault();
        if (this.state.useraccount.id === undefined
            || this.state.useraccount.id === ''
            || this.state.user.phone === undefined
            || this.state.user.phone === ''
        ) {
            toast.warn('Vui lòng đăng xuất và đăng nhập lại mới có thể thực hiện công việc này');
        } else {
            const data = new FormData();
            data.append('avatar', this.uploadInputFront.files[0]);
            data.append('id', this.state.useraccount.id);
            data.append('folder', this.state.user.phone);
            data.append('expression', 'identityCardFront');

            const headers = new Headers();
            headers.append('Authorization', 'Bearer ' + this.state.useraccount.token);
            const config = {
                method: 'POST',
                headers: headers,
                body: data,
            };

            fetch(Api.PROFILE_CARD, config)
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.value === true) {
                        setInStorage(Config.USERINFO, responseJson.response);
                        this.setState({user: responseJson.response})
                    } else {
                        console.error(responseJson);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    handlelicenseeImageBehind(ev) {
        ev.preventDefault();
        if (this.state.useraccount.id === undefined
            || this.state.useraccount.id === ''
            || this.state.user.phone === undefined
            || this.state.user.phone === ''
        ) {
            toast.warn('Vui lòng đăng xuất và đăng nhập lại mới có thể thực hiện công việc này');
        } else {
            const data = new FormData();
            data.append('avatar', this.uploadInputBehind.files[0]);
            data.append('id', this.state.useraccount.id);
            data.append('expression', 'identityCardBehind');
            data.append('folder', this.state.user.phone);

            const headers = new Headers();
            headers.append('Authorization', 'Bearer ' + this.state.useraccount.token);
            const config = {
                method: 'POST',
                headers: headers,
                body: data,
            }
            fetch(Api.PROFILE_CARD, config)
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.value === true) {
                        setInStorage(Config.USERINFO, responseJson.response);
                        this.setState({user: responseJson.response})
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }


    render() {
        const {isRedirect, user, isRefesh} = this.state;
        if (isRedirect) {
            return (<Redirect to='/update-user-acount'/>);
        }
        if (isRefesh) {
            setTimeout(() => {
                window.location.reload();
            }, 5000)
        }
        return (

            <div className="profile-doccument">
                <div className="form-indentily">
                    <Jumbotron>
                        <div className="profile-title">
                            <h2>Chứng Minh Nhân Dân(Mặt trước)<span className="warning">*</span></h2>
                        </div>
                        <div className="form-upload">

                            <div className="upload-container">
                                <input ref={(ref) => {
                                    this.uploadInputFront = ref;
                                }} type="file" onChange={this.handlelicenseeImageFront} name="file"
                                       accept="image/*;capture=camera" disabled={this.state.accept}/>
                                {/*nếu accept = true có nghĩa là đã xác thực, không được phép chỉnh sữa */}
                            </div>

                            <div className="sample_doc">
                                {
                                    user.identityCardFront !== undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}}
                                         src={Api.AVATAR + user.phone + '/' + user.identityCardFront}
                                         alt="avatar"/>
                                }
                                {
                                    user.identityCardFront === undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}} src={picture} alt="avatar"/>
                                }

                                <p> Bấm để chọn ảnh </p>
                            </div>

                        </div>
                        <div className="profile-title">
                            <h2>Chứng Minh Nhân Dân(Mặt sau)<span className="warning">*</span></h2>
                        </div>
                        <div className="form-upload">

                            <div className="upload-container">
                                <input ref={(ref) => {
                                    this.uploadInputBehind = ref;
                                }} type="file" onChange={this.handlelicenseeImageBehind} name="file"
                                       accept="image/*;capture=camera" disabled={this.state.accept}/>
                                {/*nếu accept = true có nghĩa là đã xác thực, không được phép chỉnh sữa */}
                            </div>

                            <div className="sample_doc">
                                {
                                    user.identityCardBehind !== undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}}
                                         src={Api.AVATAR + user.phone + '/' + user.identityCardBehind}
                                         alt="avatar"/>
                                }
                                {
                                    user.identityCardBehind === undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}} src={picture} alt="avatar"/>
                                }

                                <p> Bấm để chọn ảnh </p>
                            </div>

                        </div>
                        <div>
                            <div className="list">
                                <div className="icon icon-tick"></div>
                                <div className="list-item">CMND, chưa hết hạn.</div>
                            </div>
                            <div className="list">
                                <div className="icon icon-tick"></div>
                                <div className="list-item">Chụp ảnh bằng điện thoại, không dùng bản quét.</div>
                            </div>
                            <div className="list">
                                <div className="icon icon-tick"></div>
                                <div className="list-item">Hình ảnh rõ nét, không bị mờ.</div>
                            </div>
                        </div>
                        <div className="indentily-number">
                            <p>Số chứng minh nhân <span className="warning">*</span></p>
                            <div className="form-label-group">
                                <input type="text" value={user.identitybusinessNumber}
                                       onChange={this.handleIdentitybusinessNumber} className="card-number"
                                       name="businessNumber"/>
                            </div>
                        </div>
                        <Collapse isOpen={this.state.businessNumberValid}>
                            <p> Không được rỗng, phải là 9 số </p>
                        </Collapse>

                        <div className="indentily-number">
                            <p>Sinh ngày: <span className="warning">*</span></p>
                            <div className="form-label-group">
                                <DatePicker
                                    selected={moment(user.birthday)}
                                    onChange={this.handleChangebusinessDate}
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dateFormat="DD/MM/YYYY"
                                />
                            </div>
                        </div>
                        <div className="indentily-number">
                            <p>Giới tính: <span className="warning">*</span></p>
                            <div className="form-label-group">
                                <select name="city" value={user.sex} onChange={this.handleChangecity}>
                                    <option value="">Chọn</option>
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                    <option value="other">Khác</option>
                                </select>
                            </div>
                        </div>
                        <div className="indentily-number">
                            <p>Ngày cấp: <span className="warning">*</span></p>
                            <div className="form-label-group">
                                <DatePicker
                                    selected={moment(user.identityCardDateIssued)}
                                    onChange={this.handleChangeDate}
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dateFormat="DD/MM/YYYY"
                                />
                            </div>
                        </div>
                        <div className="indentily-submit">
                            <button className="btn btn-lg btn-primary btn-block" id="mySubmit" type="submit"
                                    disabled={this.state.isDisabled} onClick={this.handleSubmit}
                            >Tiếp tục
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

export default BusinessRegistration;
