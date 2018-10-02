import React from 'react';
import {
    NavLink
} from "react-router-dom";
import {Fa} from 'mdbreact';
import {TextInput} from '../../components';
import autoBind from "react-autobind";
import {connect} from "react-redux";
import * as userActions from "../../actions/userActions";
import {UploadeImage} from "../contact";
import * as config from "../../utils";
import {getCity} from "../../helpers";
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import {title} from "../../utils";
import "./BusinessRegistration.css";


class BusinessRegistration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
            isEditDoc: false,
            User: this.props.userprops,
            ImageFront: '',
            ImageBehind: '',
            saving: false,
            businessDate: Date.now(),
            arrayCities: []
        };

        autoBind(this);

    }

    componentWillMount() {

        //get danh sach city
        getCity().then(city => {
            if (city.response === true) {
                this.setState({arrayCities: city.value});
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        let {User} = this.state;
        if (User._id === "") {
            this.props.actionsUser.loadUser();
            return this.setState({User: this.props.userprops})
        }

        document.title = `${title} - Giấy phép kinh doanh`
    }

    updateCatState(event) {

        const field = event.target.name;
        const User = this.state.User;
        User[field] = event.target.value;
        console.log(User);
        this.setState({User: User, isEdit: true, saving: false, isEditDoc: true});
    }

    handleChangeDate(date) {
        let {User} = this.state;
        User.businessDate = moment(date).valueOf();
        console.log(User);
        this.setState({User: User, businessDate: date, isEdit: true, isEditDoc: true, saving: false});
    }


    handleSubmit(e) {
        e.preventDefault();
        this.setState({saving: true});
        let {User, ImageFront, ImageBehind, isEditDoc} = this.state;
        let {userprops, actionsUser} = this.props;

        if (userprops._id === undefined) {
            console.log(userprops);
            this.setState({saving: false});
            return;
        }
        if (ImageFront !== "") {
            // thỏa điều kiện tỉ lệ 1 : cho upload
            const data = new FormData();
            data.append('avatar', ImageFront);
            data.append('id', userprops._id);
            data.append('expression', 'licenseeImageFront');
            setTimeout(() => {
                actionsUser.UploadImage(data).then(res => {
                    if (res) {
                        this.setState({isEdit: false, ImageFront: ""});
                    }
                })
            }, 1000);
        }

        if (ImageBehind !== "") {
            // thỏa điều kiện tỉ lệ 1 : cho upload
            const data = new FormData();
            data.append('avatar', ImageBehind);
            data.append('id', userprops._id);
            data.append('expression', 'licenseeImageBehind');
            setTimeout(() => {
                actionsUser.UploadImage(data).then(res => {
                    if (res) {
                        this.setState({isEdit: false, ImageBehind: ""});
                    }
                })
            }, 2000);
        }

        if (isEditDoc) {
            let obj = {};
            obj = Object.assign({}, User);
            obj._id = undefined;
            obj.id = User._id;
            console.log(obj);
            setTimeout(() => {
                actionsUser.UploadDocument(obj).then(res => {
                    if (res) {
                        this.setState({
                            isEdit: false,
                            isEditDoc: false,
                        });
                    }
                })
            }, 3000);
        }
    }


    handlelicenseeImageFront(file) {

        this.setState({ImageFront: file, isEdit: true, saving: false});
    }

    handlelicenseeImageBehind(file) {

        this.setState({ImageBehind: file, isEdit: true, saving: false});
    }


    render() {
        let {arrayCities, isEdit, saving, businessDate} = this.state;
        let {userprops} = this.props;
        if (userprops === null) {
            return (
                <div className="business-registration-main">
                    <header className="site-header">

                    </header>
                    <div className="subscribe-area section-padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                                    <div className="subscribe-form text-center">
                                        <div className="container-fluid text-center">
                                            <div className="">
                                                <p><Fa icon="spinner" size="5x" spin/></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        let licenseeImageFront, licenseeImageBehind = null;
        if (userprops.licenseeImageFront) {
            licenseeImageFront = `${config.apiUrl}/uploads/${userprops.phone}/${userprops.licenseeImageFront}`;
        }
        if (userprops.licenseeImageBehind) {
            licenseeImageBehind = `${config.apiUrl}/uploads/${userprops.phone}/${userprops.licenseeImageBehind}`;
        }
        if (userprops.businessDate != null && isEdit === false) {
            businessDate = userprops.businessDate
        }
        let {city} = this.state.User;
        if (userprops.city != null && isEdit === false) {
            city = userprops.city
        }


        let $button = (<NavLink
            to={"/contact"}
            className="bttn-default" id="mySubmit"
            type="submit">Tiếp tục</NavLink>);
        if (isEdit) {
            $button = (<input
                type="submit"
                disabled={saving}
                value={saving ? 'Saving...' : 'Save'}
                className="bttn-default"
                onClick={this.handleSubmit}/>)
        }

        return (
            <div className="business-registration-main">
                <header className="site-header">

                </header>
                <div className="subscribe-area section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                                <div className="subscribe-form text-center">
                                    <label className="mt10" htmlFor="licenseeImageFront">Giấy phép kinh doanh(Mặt trước):</label>
                                    <UploadeImage
                                        value={licenseeImageFront}
                                        lable="Giấy phép kinh doanh mặt trước"
                                        name="licenseeImageFront"
                                        onChange={this.handlelicenseeImageFront}
                                    />
                                    <div className="space-20"></div>
                                    <label className="mt10" htmlFor="licenseeImageBehind">Giấy phép kinh doanh(Mặt sau):</label>
                                    <UploadeImage
                                        value={licenseeImageBehind}
                                        lable="Giấy phép kinh doanh mặt sau"
                                        name="licenseeImageBehind"
                                        onChange={this.handlelicenseeImageBehind}
                                    />
                                    <div className="space-20"></div>
                                    <label className="mt10" htmlFor="companyName">Tên công ty, doanh nghiệp:</label>
                                    <TextInput
                                        name="companyName"
                                        label="Tên công ty"
                                        value={userprops.companyName}
                                        onChange={this.updateCatState}
                                    />
                                    <div className="space-20"></div>
                                    <label className="mt10" htmlFor="businessNumber">Số đăng ký doanh nghiệp:</label>
                                    <TextInput
                                        name="businessNumber"
                                        label="Số đăng ký doanh nghiệp"
                                        value={userprops.businessNumber}
                                        onChange={this.updateCatState}
                                    />
                                    <div className="space-20"></div>
                                    <label className="mt10" htmlFor="fullname">Tên người đại diện: </label>
                                    <TextInput
                                        name="representativeName"
                                        label="Tên người đại diện"
                                        value={userprops.representativeName}
                                        onChange={this.updateCatState}
                                    />
                                    <div className="space-20"></div>
                                    <label className="mt10" htmlFor="title">Chức danh: </label>
                                    <TextInput
                                        name="title"
                                        label="Chức danh"
                                        value={userprops.title}
                                        onChange={this.updateCatState}
                                    />
                                    <div className="space-20"></div>
                                    <label className="mt10" htmlFor="businessDate">Ngày cấp:</label>
                                    <DatePicker
                                        selected={moment(businessDate)}
                                        onChange={this.handleChangeDate}
                                        peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                        dateFormat="DD/MM/YYYY"
                                    />
                                    <div className="space-20"></div>
                                    <label className="mt10" htmlFor="licensee">Nơi cấp: </label>
                                    <TextInput
                                        name="licensee"
                                        label="Nơi cấp"
                                        value={userprops.licensee}
                                        onChange={this.updateCatState}
                                    />
                                    <div className="space-20"></div>
                                    <label className="mt10" htmlFor="address">Địa chỉ công ty/doanh nghiệp: </label>
                                    <TextInput
                                        name="address"
                                        label="Địa chỉ "
                                        value={userprops.address}
                                        onChange={this.updateCatState}
                                    />
                                    <div className="space-20"></div>
                                    <label className="mt10" htmlFor="city">Tỉnh/Thành phố: </label>
                                    <select name="city" value={city} onChange={this.updateCatState}>
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
                                    <div className="space-20"></div>
                                    {$button}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

BusinessRegistration.propTypes = {
    userprops: PropTypes.object.isRequired,
    actionsUser: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        actionsUser: bindActionCreators(userActions, dispatch),
    };
}

let mapStateToProps = (state) => {
    let user = {
        _id: '',
        city: '', // tỉnh thành phố
        companyName: '', // Tên công ty, doanh nghiệp
        address: '', // địa chỉ công ty
        businessNumber: '',//số đăng ký doanh nghiệp
        businessDate: '', //ngày cấp
        licensee: '', // nơi cấp
        representativeName: '', //tên người đại diện
        title: '',// chức danh
    }
    if (state.userReducers) {
        return {
            userprops: state.userReducers
        };
    } else {
        return {
            userprops: user,
        };
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessRegistration);
