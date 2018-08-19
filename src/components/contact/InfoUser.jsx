import React from 'react';
import {
    Redirect
} from "react-router-dom";

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import autoBind from "react-autobind";
import {connect} from "react-redux";
import {UserDocumentHelper} from "../../helpers";
import {show_notification} from "../../actions/notifyActions";
import {alogin} from "../../actions/userActions";
import {title} from "../../utils";
import "./InfoUser.css"


class InfoUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: null,
            birthday: null,
            fullName: null,
            isChange: false,
            redirectToReferrer: false,
        }
        autoBind(this);
    }

    componentDidMount() {
        document.title = `${title} - Thông tin người dùng`
    }

    handleFullname(event) {
        this.setState({fullName: event.target.value, isChange: true});
    }

    handleChangeSex(event) {
        this.setState({sex: event.target.value, isChange: true});
    }


    handleChangeBirthday(date) {
        this.setState({birthday: date, isChange: true});
    }

    handleSubmit(e) {
        e.preventDefault();
        const {dispatch, username} = this.props;
        let {isChange} = this.state;
        this.setState({submitted: true});
        const {sex, birthday, fullName} = this.state;
        if (isChange) {
            let obj = {};
            if (username != null) {
                obj.id = username._id;
            }
            if (fullName != null) {
                obj.fullName = fullName;
            }
            if (sex != null) {
                obj.sex = sex;
            }
            if (birthday != null) {
                obj.birthday = moment(birthday).valueOf();
            }
            console.log(obj);
            setTimeout(() => {
                UserDocumentHelper(obj).then(user => {
                    if (user.response === true) {
                        dispatch(show_notification({txt: "Upload thành công", type: "suc"}));
                        dispatch(alogin(user.value));
                        this.setState({isChange: false});
                    } else {
                        dispatch(show_notification({txt: user.value, type: "err"}));
                    }
                });
            }, 2000);

        } else {
            this.setState({redirectToReferrer: true});
        }
    }


    render() {
        let {username} = this.props;
        let {isChange, redirectToReferrer} = this.state;
        let sex, birthday, fullName = null;
        if (username !== null) {
            birthday = username.birthday;
            sex = username.sex;
            fullName = username.fullName;
        }

        if (redirectToReferrer) {
            return <Redirect to={'/contact'}/>
        }

        let htmlsub = 'Tiếp tục';
        if (isChange) {
            htmlsub = " Lưu thông tin ";
        }

        return (
            <div className="info-main">
                <header className="site-header">

                </header>
                <div className="subscribe-area section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                                <div className="subscribe-form text-center">
                                    <label className="mt10" htmlFor="fullname">Họ và Tên</label>
                                    <input type="text"
                                           defaultValue={fullName}
                                           onChange={this.handleFullname} className="card-number"
                                           name="fullname"/>
                                    <div className="space-20"></div>

                                    <label className="mt10" htmlFor="birthday">Sinh ngày:</label>
                                    <DatePicker
                                        selected={moment(birthday)}
                                        onChange={this.handleChangeBirthday}
                                        peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                        dateFormat="DD/MM/YYYY"

                                    />
                                    <div className="space-20"> </div>

                                    <label className="mt10" htmlFor="city">Giới tính:</label>
                                    <select name="city" defaultValue={sex} onChange={this.handleChangeSex}>
                                        <option value="">Chọn</option>
                                        <option value="male">Nam</option>
                                        <option value="female">Nữ</option>
                                        <option value="other">Khác</option>
                                    </select>
                                    <div className="space-20"> </div>


                                    <button className="bttn-default" id="mySubmit" type="submit"
                                            onClick={this.handleSubmit}
                                    >
                                        {htmlsub}
                                    </button>

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
        username: state.userReducers,
        notification: state.notifyReducers
    };
};

export default connect(mapStateToProps)(InfoUser);
