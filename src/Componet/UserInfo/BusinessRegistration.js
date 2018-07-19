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
import Axios from "axios";
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
            companyNameValid: false,
            representativeNameValid: false,
            licenseeValid: false,
            addressValid: false,
            titleValid: false,
            isChange: false,
            arrayCities: [],
        };

        this.handlelicenseeImageFront = this.handlelicenseeImageFront.bind(this);
        this.handlelicenseeImageBehind = this.handlelicenseeImageBehind.bind(this);
        this.handlebusinessNumber = this.handlebusinessNumber.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangecity = this.handleChangecity.bind(this);
        this.handleChangebusinessDate = this.handleChangebusinessDate.bind(this);
        this.handlecompanyName = this.handlecompanyName.bind(this);
        this.handlerepresentativeName = this.handlerepresentativeName.bind(this);
        this.handletitle = this.handletitle.bind(this);
        this.handlelicensee = this.handlelicensee.bind(this);
        this.handleaddress = this.handleaddress.bind(this);

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
        let {city, companyName, address, businessNumber, businessDate, licensee, representativeName, title} = this.state.user;
        let {user} = this.state;
        if (city !== undefined && companyName !== undefined && address !== undefined &&
            businessNumber !== undefined && businessDate !== undefined &&
            licensee !== undefined && representativeName !== undefined && title !== undefined) {
            this.setState({
                isDisabled: false,
            });
        } else {
            user.businessDate = Date.now();
            this.setState({
                user,
            });
        }
        Axios.get(Api.CITIES)
            .then(response => {
                if (response.status === 200) {
                    this.setState({arrayCities: response.data.value});
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handlecompanyName(event) {
        event.preventDefault();
        let {user} = this.state;
        user.companyName = event.target.value;
        this.setState({user});
        if (event.target.value) {
            this.setState({
                companyNameValid: false,
                isChange: true,
            });
            if (user.city &&
                user.address &&
                user.businessNumber &&
                user.businessDate &&
                user.licensee &&
                user.representativeName &&
                user.title) {
                this.setState({
                    isDisabled: false,
                });
            }
        } else {
            this.setState({
                companyNameValid: true,
                isDisabled: true,
            });
        }
    }

    handlerepresentativeName(event) {
        event.preventDefault();
        let {user} = this.state;
        user.representativeName = event.target.value;
        this.setState({user});
        if (event.target.value) {
            this.setState({
                representativeNameValid: false,
                isChange: true,
            });
            if (user.city &&
                user.companyName &&
                user.address &&
                user.businessNumber &&
                user.businessDate &&
                user.licensee &&
                user.title) {
                this.setState({
                    isDisabled: false,
                });
            }
        } else {
            this.setState({
                representativeNameValid: true,
                isDisabled: true,
            });
        }
    }

    handletitle(event) {
        event.preventDefault();
        let {user} = this.state;
        user.title = event.target.value;
        this.setState({user});
        if (event.target.value) {
            this.setState({
                titleValid: false,
                isChange: true,
            });
            if (user.city &&
                user.companyName &&
                user.address &&
                user.businessNumber &&
                user.businessDate &&
                user.licensee &&
                user.representativeName) {
                this.setState({
                    isDisabled: false,
                });
            }
        } else {
            this.setState({
                titleValid: true,
                isDisabled: true,
            });
        }
    }

    handlelicensee(event) {
        event.preventDefault();
        let {user} = this.state;
        user.licensee = event.target.value;
        this.setState({user});
        if (event.target.value) {
            this.setState({
                licenseeValid: false,
                isChange: true,
            });
            if (user.city &&
                user.companyName &&
                user.address &&
                user.businessNumber &&
                user.businessDate &&
                user.representativeName &&
                user.title) {
                this.setState({
                    isDisabled: false,
                });
            }
        } else {
            this.setState({
                licenseeValid: true,
                isDisabled: true,
            });
        }
    }

    handleaddress(event) {
        event.preventDefault();
        let {user} = this.state;
        user.address = event.target.value;
        this.setState({user});
        if (event.target.value) {
            this.setState({
                addressValid: false,
                isChange: true,
            });
            if (user.city &&
                user.companyName &&
                user.businessNumber &&
                user.businessDate &&
                user.licensee &&
                user.representativeName &&
                user.title) {
                this.setState({
                    isDisabled: false,
                });
            }
        } else {
            this.setState({
                addressValid: true,
                isDisabled: true,
            });
        }
    }

    handlebusinessNumber(event) {
        event.preventDefault();
        let {user} = this.state;
        user.businessNumber = event.target.value;
        this.setState({user});
        if (event.target.value) {
            this.setState({
                businessNumberValid: false,
                isChange: true,
            });
            if (user.city &&
                user.companyName &&
                user.address &&
                user.businessDate &&
                user.licensee &&
                user.representativeName &&
                user.title) {
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
        event.preventDefault();
        let {user} = this.state;
        user.city = event.target.value;
        this.setState({user});
        if (event.target.value) {
            this.setState({
                isChange: true,
            });
            if (
                user.companyName &&
                user.address &&
                user.businessNumber &&
                user.businessDate &&
                user.licensee &&
                user.representativeName &&
                user.title) {
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
        user.businessDate = date;
        this.setState({user});
        if (moment(date).isValid()) {
            this.setState({
                isChange: true,
            });
            if (user.city &&
                user.companyName &&
                user.address &&
                user.businessNumber &&
                user.licensee &&
                user.representativeName &&
                user.title) {
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
        const {id, token} = this.state.useraccount;
        const {city, companyName, address, businessNumber, businessDate, licensee, representativeName, title} = this.state.user;
        if (isChange) {
            if (isDisabled || !id || !token ||
                !moment(businessDate).isValid() || !representativeName || !title ||
                !city || !companyName || !address || !licensee) {
                toast.warn('Vui lòng kiểm tra giá trị nhập');
            } else {
                const headers = new Headers();
                headers.append('Authorization', 'Bearer ' + token);
                headers.append('Content-Type', 'application/json');
                const config = {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        'city': city,
                        'companyName': companyName,
                        'address': address,
                        'businessNumber': businessNumber,
                        'businessDate': moment(businessDate).valueOf(),
                        'licensee': licensee,
                        'representativeName': representativeName,
                        'title': title,
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
                        }
                    })
                    .catch((error) => {
                        toast.warn('Kiểm tra kết nối mạng');
                        console.log(error);
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
            data.append('expression', 'licenseeImageFront');

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
                    if (responseJson.response === true) {
                        setInStorage(Config.USERINFO, responseJson.value);
                        this.setState({user: responseJson.value})
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
            data.append('expression', 'licenseeImageBehind');
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
                    if (responseJson.response === true) {
                        setInStorage(Config.USERINFO, responseJson.value);
                        this.setState({user: responseJson.value})
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }


    render() {
        const {isRedirect, user, isRefesh, arrayCities} = this.state;
        if (isRedirect) {
            return (<Redirect to='/contact'/>);
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
                            <h2>Giấy phép kinh doanh(Mặt trước)<span className="warning">*</span></h2>
                        </div>
                        <div className="form-upload">

                            <div className="upload-container">
                                <input ref={(ref) => {
                                    this.uploadInputFront = ref;
                                }} type="file" onChange={this.handlelicenseeImageFront} name="file1"
                                       accept="image/*;capture=camera" disabled={this.state.accept}/>
                                {/*nếu accept = true có nghĩa là đã xác thực, không được phép chỉnh sữa */}
                            </div>

                            <div className="sample_doc">
                                {
                                    user.licenseeImageFront !== undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}}
                                         src={Api.AVATAR + user.phone + '/' + user.licenseeImageFront}
                                         alt="avatar"/>
                                }
                                {
                                    user.licenseeImageFront === undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}} src={picture} alt="avatar"/>
                                }

                                <p> Bấm để chọn ảnh </p>
                            </div>

                        </div>
                        <div className="profile-title">
                            <h2>Giấy phép kinh doanh(Mặt sau)<span className="warning">*</span></h2>
                        </div>
                        <div className="form-upload">

                            <div className="upload-container">
                                <input ref={(ref) => {
                                    this.uploadInputBehind = ref;
                                }} type="file" onChange={this.handlelicenseeImageBehind} name="file2"
                                       accept="image/*;capture=camera" disabled={this.state.accept}/>
                                {/*nếu accept = true có nghĩa là đã xác thực, không được phép chỉnh sữa */}
                            </div>

                            <div className="sample_doc">
                                {
                                    user.licenseeImageBehind !== undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}}
                                         src={Api.AVATAR + user.phone + '/' + user.licenseeImageBehind}
                                         alt="avatar"/>
                                }
                                {
                                    user.licenseeImageBehind === undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}} src={picture} alt="avatar"/>
                                }

                                <p> Bấm để chọn ảnh </p>
                            </div>

                        </div>
                        <div>
                            <div className="list">
                                <div className="icon icon-tick"></div>
                                <div className="list-item">GPKD còn hiệu lực.</div>
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
                            <p>Tên công ty, doanh nghiệp<span className="warning">*</span></p>
                            <div className="form-label-group">
                                <input type="text" value={user.companyName}
                                       onChange={this.handlecompanyName} className="card-number"
                                       name="companyName" />
                            </div>
                        </div>
                        <Collapse isOpen={this.state.companyNameValid}>
                            <p> Không được rỗng, phải là 5 số </p>
                        </Collapse>
                        <div className="indentily-number">
                            <p>Số đăng ký doanh nghiệp <span className="warning">*</span></p>
                            <div className="form-label-group">
                                <input type="text" value={user.businessNumber}
                                       onChange={this.handlebusinessNumber} className="card-number"
                                       name="businessNumber"/>
                            </div>
                        </div>
                        <Collapse isOpen={this.state.businessNumberValid}>
                            <p> Không được rỗng, số ĐKDN phải 10 số </p>
                        </Collapse>

                        <div className="indentily-number">
                            <p>Tên người đại diện <span className="warning">*</span></p>
                            <div className="form-label-group">
                                <input type="text" value={user.representativeName}
                                       onChange={this.handlerepresentativeName} className="card-number"
                                       name="representativeName"/>
                            </div>
                        </div>
                        <Collapse isOpen={this.state.representativeNameValid}>
                            <p> Không được rỗng, có ít nhất 5 ký tự </p>
                        </Collapse>

                        <div className="indentily-number">
                            <p>Chức danh <span className="warning">*</span></p>
                            <div className="form-label-group">
                                <input type="text" value={user.title}
                                       onChange={this.handletitle} className="card-number"
                                       name="title"/>
                            </div>
                        </div>

                        <Collapse isOpen={this.state.titleValid}>
                            <p> Không được rỗng, có ít nhất 5 ký tự </p>
                        </Collapse>

                        <div className="indentily-number">
                            <p>Ngày cấp: <span className="warning">*</span></p>
                            <div className="form-label-group">
                                <DatePicker
                                    selected={moment(user.businessDate)}
                                    onChange={this.handleChangebusinessDate}
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dateFormat="DD/MM/YYYY"
                                />
                            </div>
                        </div>
                        <div className="indentily-number">
                            <p>Nơi cấp <span className="warning">*</span></p>
                            <div className="form-label-group">
                                <input type="text" value={user.licensee}
                                       onChange={this.handlelicensee} className="card-number"
                                       name="licensee"/>
                            </div>
                        </div>
                        <Collapse isOpen={this.state.licenseeValid}>
                            <p> Không được rỗng, có ít nhất 5 ký tự </p>
                        </Collapse>

                        <div className="indentily-number">
                            <p>Địa chỉ công ty/doanh nghiệp <span className="warning">*</span></p>
                            <div className="form-label-group">
                                <input type="text" value={user.address}
                                       onChange={this.handleaddress} className="card-number"
                                       name="address"/>
                            </div>
                        </div>
                        <Collapse isOpen={this.state.addressValid}>
                            <p> Không được rỗng, có ít nhất 5 ký tự </p>
                        </Collapse>
                        <div className="indentily-number">
                            <p>Tỉnh/Thành phố: <span className="warning">*</span></p>
                            <div className="form-label-group">
                                <select name="city" value={user.city} onChange={this.handleChangecity}>
                                    <option value="">Chọn</option>
                                    {
                                        arrayCities.map((item) => {
                                            return (
                                                <option key={item.ID}
                                                        value={item.Title}>{item.Title}</option>
                                            )
                                        })
                                    }
                                </select>
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
