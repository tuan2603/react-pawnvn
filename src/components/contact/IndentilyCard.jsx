import React from 'react';
import {
    NavLink, Redirect
} from "react-router-dom";
import { Jumbotron } from 'mdbreact';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import autoBind from "react-autobind";
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";
import { UploadeImage } from "../contact";
import * as config from "../../utils";
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {title} from "../../utils";

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
        this.setState({ identityCardNumber: event.target.value, isEdit: true, saving: false });
    }

    handleChangeDate(date) {
        this.setState({ identityCardDateIssued: date, isEdit: true, saving: false });
    }

    handleIdentityCardFront(file) {
        this.setState({ isEdit: true, fileFront: file, saving: false });
    }

    handleIdentityCardBehind(file) {
        this.setState({ isEdit: true, fileBehind: file, saving: false });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ saving: true });
        const { identityCardNumber, identityCardDateIssued, fileFront, fileBehind } = this.state;
        let { actionsUser, User } = this.props;

        if (fileFront !== "") {
            // thỏa điều kiện tỉ lệ 1 : cho upload
            const data = new FormData();
            data.append('avatar', fileFront);
            data.append('id', User._id);
            data.append('expression', 'identityCardFront');
            setTimeout(() => {
                actionsUser.UploadImage(data).then(res => {
                    if (res) {
                        this.setState({ isEdit: false, fileFront: "" });
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
                        this.setState({ isEdit: false, fileBehind: "" });
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
        let { User } = this.props;
        if(User._id === ''){
            return (<Redirect to={"/"} />);
        }
        let { isEdit, saving, identityCardDateIssued } = this.state;
   
        let identityCardFront, identityCardBehind, identityCardNumber = null;
            
        if (User !== null) {
            identityCardFront = `${config.apiUrl}/uploads/${User.phone}/${User.identityCardFront}`;
            identityCardBehind = `${config.apiUrl}/uploads/${User.phone}/${User.identityCardBehind}`;
            identityCardNumber = User.identityCardNumber;
            if(User.identityCardDateIssued != null && isEdit === false){
                identityCardDateIssued = User.identityCardDateIssued;
            }
        }
        
        let $button = (<NavLink
            to={"/contact"}
            className="btn btn-lg btn-primary btn-block" id="mySubmit"
            type="submit">Tiếp tục</NavLink>);
        if (isEdit) {
            $button = (<input
                type="submit"
                disabled={saving}
                value={saving ? 'Saving...' : 'Save'}
                className="btn btn-primary btn-block"
                onClick={this.handleSubmit} />)
        }

        return (

            <div className="profile-doccument">
                <div className="form-indentily">
                    <Jumbotron>
                        <div className="profile-title">
                            <h2>Chứng Minh Nhân Dân(Mặt trước)<span className="warning">*</span></h2>
                        </div>
                        <UploadeImage
                            value={identityCardFront}
                            lable="Chứng Minh Nhân Dân"
                            name="identityCardFront"
                            onChange={this.handleIdentityCardFront}
                        />


                        <div className="profile-title">
                            <h2>Chứng Minh Nhân Dân(Mặt sau)<span className="warning">*</span></h2>
                        </div>
                        <UploadeImage
                            value={identityCardBehind}
                            lable="Chứng Minh Nhân Dân"
                            name="identityCardBehind"
                            onChange={this.handleIdentityCardBehind}
                        />


                        <div className="indentily-number">
                            <p>Số chứng minh nhân <span className="warning">*</span></p>
                            <div className="form-label-group">
                                <input type="text"
                                    defaultValue={identityCardNumber}
                                    onChange={this.handleIdentityCardNumber} className="card-number"
                                    name="CardNumber" />
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
                            {$button}
                        </div>
                    </Jumbotron>
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
