import React from 'react';
import {
    NavLink
} from "react-router-dom";
import {Fa } from 'mdbreact';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import autoBind from "react-autobind";
import {connect} from "react-redux";
import * as userActions from "../../actions/userActions";
import {UploadeImage} from "../contact";
import * as config from "../../utils";
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {title} from "../../utils";
import "./IndentilyCard.css";

class IndentilyCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            saving: false,
            fileFront: "",
            fileBehind: "",
            identityCardNumber: "",
            identityCardDateIssued: Date.now(),
        }
        autoBind(this);
    }

    componentWillMount() {
        if (this.props.User === null) {
            this.props.actionsUser.loadUser();
        }
    }

    componentDidMount() {
        document.title = `${title} - Thông tin người dùng`
    }

    handleIdentityCardNumber(event) {
        this.setState({identityCardNumber: event.target.value, isEdit: true, saving: false});
    }

    handleChangeDate(date) {
        this.setState({identityCardDateIssued: date, isEdit: true, saving: false});
    }

    handleIdentityCardFront(file) {
        this.setState({isEdit: true, fileFront: file, saving: false});
    }

    handleIdentityCardBehind(file) {
        this.setState({isEdit: true, fileBehind: file, saving: false});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({saving: true});
        const {identityCardNumber, identityCardDateIssued, fileFront, fileBehind} = this.state;
        let {actionsUser, User} = this.props;

        if (fileFront !== "") {
            // thỏa điều kiện tỉ lệ 1 : cho upload
            const data = new FormData();
            data.append('avatar', fileFront);
            data.append('id', User._id);
            data.append('expression', 'identityCardFront');
            setTimeout(() => {
                actionsUser.UploadImage(data).then(res => {
                    if (res) {
                        this.setState({isEdit: false, fileFront: ""});
                    }
                })
            }, 1000);
        }

        if (fileBehind !== "") {
            // thỏa điều kiện tỉ lệ 1 : cho upload
            const data = new FormData();
            data.append('avatar', fileBehind);
            data.append('id', User._id);
            data.append('expression', 'identityCardBehind');
            setTimeout(() => {
                actionsUser.UploadImage(data).then(res => {
                    if (res) {
                        this.setState({isEdit: false, fileBehind: ""});
                    }
                })
            }, 2000);
        }

        if (identityCardNumber !== "" || identityCardDateIssued !== "") {
            let obj = {};
            obj.id = User._id;
            if (identityCardNumber !== "") {
                obj.identityCardNumber = identityCardNumber;
            }
            if (identityCardDateIssued !== "") {
                obj.identityCardDateIssued = moment(identityCardDateIssued).valueOf();
            }
            setTimeout(() => {
                actionsUser.UploadDocument(obj).then(res => {
                    if (res) {
                        this.setState({
                            isEdit: false, identityCardNumber: "",
                            identityCardDateIssued: ""
                        });
                    }
                })
            }, 3000);
        }
    }

    render() {
        let {User} = this.props;
        if (User === null) {
            return (
                <div className="indentily-card-main">
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


        let {isEdit, saving, identityCardDateIssued} = this.state;

        let identityCardFront, identityCardBehind, identityCardNumber = null;

        if (User !== null) {
            identityCardFront = `${config.apiUrl}/uploads/${User.phone}/${User.identityCardFront}`;
            identityCardBehind = `${config.apiUrl}/uploads/${User.phone}/${User.identityCardBehind}`;
            identityCardNumber = User.identityCardNumber;
            if (User.identityCardDateIssued != null && isEdit === false) {
                identityCardDateIssued = User.identityCardDateIssued;
            }
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
            <div className="indentily-card-main">
                <header className="site-header">

                </header>
                <div className="subscribe-area section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                                <div className="subscribe-form text-center">
                                    <label className="mt10" htmlFor="fullname">Chứng Minh Nhân Dân(Mặt trước)</label>
                                    <UploadeImage
                                        value={identityCardFront}
                                        lable="Chứng Minh Nhân Dân"
                                        name="identityCardFront"
                                        onChange={this.handleIdentityCardFront}
                                    />
                                    <div className="space-20"></div>

                                    <label className="mt10" htmlFor="fullname">Chứng Minh Nhân Dân(Mặt sau)</label>
                                    <UploadeImage
                                        value={identityCardBehind}
                                        lable="Chứng Minh Nhân Dân"
                                        name="identityCardBehind"
                                        onChange={this.handleIdentityCardBehind}
                                    />
                                    <div className="space-20"></div>

                                    <label className="mt10" htmlFor="fullname">Số chứng minh nhân </label>
                                    <input type="text"
                                           defaultValue={identityCardNumber}
                                           onChange={this.handleIdentityCardNumber} className="card-number"
                                           name="CardNumber"/>
                                    <div className="space-20"></div>

                                    <label className="mt10" htmlFor="fullname">Ngày cấp:</label>
                                    <DatePicker
                                        selected={moment(identityCardDateIssued)}
                                        onChange={this.handleChangeDate}
                                        peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                        dateFormat="DD/MM/YYYY"
                                    />
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

IndentilyCard.propTypes = {
    User: PropTypes.object.isRequired,
    actionsUser: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        actionsUser: bindActionCreators(userActions, dispatch),
    };
}

let mapStateToProps = (state) => {
    return {
        User: state.userReducers,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndentilyCard);
