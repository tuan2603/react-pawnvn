import React from 'react';
import {
    Redirect
} from "react-router-dom";

import {Jumbotron} from 'mdbreact';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import autoBind from "react-autobind";
import {connect} from "react-redux";
import {imageUserHelper, UserDocumentHelper} from "../../helpers";
import {show_notification} from "../../actions/notifyActions";
import {alogin} from "../../actions/userActions";
import {UploadeImage} from "../contact";

class IndentilyCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            identityCardNumber: null,
            identityCardDateIssued: null,
            isChange: false,
            redirectToReferrer: false,
        }
        autoBind(this);
    }

    handleIdentityCardNumber(event) {
        this.setState({identityCardNumber: event.target.value, isChange: true});
    }

    handleChangeDate(date) {
        this.setState({identityCardDateIssued: date, isChange: true});
    }

    handleSubmit(e) {
        e.preventDefault();
        const {dispatch, username} = this.props;
        let {isChange} = this.state;
        this.setState({submitted: true});
        const {identityCardNumber, identityCardDateIssued} = this.state;
        if (isChange) {
            let obj = {};
            if (username != null) {
                obj.id = username._id;
            }
            if (identityCardNumber != null) {
                obj.identityCardNumber = identityCardNumber;
            }
            if (identityCardDateIssued != null) {
                obj.identityCardDateIssued = moment(identityCardDateIssued).valueOf();
            }
            console.log(obj);
            setTimeout(()=> {
                UserDocumentHelper(obj).then(user => {
                    if (user.response === true) {
                        dispatch(show_notification({txt: "Upload thành công", type: "suc"}));
                        dispatch(alogin(user.value));
                        this.setState({isChange: false});
                    } else {
                        dispatch(show_notification({txt: user.value, type: "err"}));
                    }
                });
            },2000);
        } else {

            this.setState({redirectToReferrer: true});

        }
    }


    handleIdentityCardFront(file) {
        const {dispatch, username} = this.props;
        const data = new FormData();
        data.append('avatar', file);
        data.append('id', username._id);
        data.append('expression', 'identityCardFront');
        imageUserHelper(data)
            .then(user => {
                if (user.response === true) {
                    dispatch(show_notification({txt: "Upload thành công", type: "suc"}));
                    dispatch(alogin(user.value));
                } else {
                    dispatch(show_notification({txt: user.value, type: "err"}));
                }
            });

    }

    handleIdentityCardBehind(file) {
        const {dispatch, username} = this.props;
        const data = new FormData();
        data.append('avatar', file);
        data.append('id', username._id);
        data.append('expression', 'identityCardBehind');
        imageUserHelper(data)
            .then(user => {
                if (user.response === true) {
                    dispatch(show_notification({txt: "Upload thành công", type: "suc"}));
                    dispatch(alogin(user.value));
                } else {
                    dispatch(show_notification({txt: user.value, type: "err"}));
                }
            });

    }

    render() {
        let {username} = this.props;
        let {isChange, redirectToReferrer} = this.state;
        let identityCardFront, identityCardBehind, identityCardNumber, identityCardDateIssued = null;
        if (username !== null) {
            identityCardFront = username.identityCardFront;
            identityCardBehind = username.identityCardBehind;
            identityCardNumber = username.identityCardNumber;
            identityCardDateIssued = username.identityCardDateIssued;
        }

        if (redirectToReferrer) {
            return <Redirect to={'/contact'}/>
        }

        let htmlsub = 'Tiếp tục';
        if (isChange) {
            htmlsub = " Lưu thông tin ";
        }

        return (

            <div className="profile-doccument">
                <div className="form-indentily">
                    <Jumbotron>
                        <div className="profile-title">
                            <h2>Chứng Minh Nhân Dân(Mặt trước)<span className="warning">*</span></h2>
                        </div>
                        <UploadeImage
                            username={username}
                            filename={identityCardFront}
                            uploadF={this.handleIdentityCardFront}
                        />

                        <div className="profile-title">
                            <h2>Chứng Minh Nhân Dân(Mặt sau)<span className="warning">*</span></h2>
                        </div>

                        <UploadeImage
                            username={username}
                            filename={identityCardBehind}
                            uploadF={this.handleIdentityCardBehind}
                        />

                        <div className="indentily-number">
                            <p>Số chứng minh nhân <span className="warning">*</span></p>
                            <div className="form-label-group">
                                <input type="text"
                                       defaultValue={identityCardNumber}
                                       onChange={this.handleIdentityCardNumber} className="card-number"
                                       name="CardNumber"/>
                            </div>
                        </div>

                        <div className="indentily-number">
                            <p>Ngày cấp: <span className="warning">*</span></p>
                            <div className="form-label-group">
                                <DatePicker
                                    selected={moment(identityCardDateIssued)}
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
                                    onClick={this.handleSubmit}
                            >
                                {htmlsub}
                            </button>
                        </div>
                    </Jumbotron>
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

export default connect(mapStateToProps)(IndentilyCard);
