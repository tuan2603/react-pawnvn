import React from 'react';
import {
    NavLink
} from "react-router-dom";
import {Jumbotron} from 'mdbreact';
import './Profile.css';
import boy from '../../assets/img/boy.svg';
import {connect} from "react-redux";
import autoBind from "react-autobind";
import * as config from '../../utils';
import {avatarHelper} from "../../helpers";
import {alogin} from "../../actions/userActions";
import {show_notification} from "../../actions/notifyActions";

class Avatar extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    handleUploadImage(ev) {
        ev.preventDefault();
        const {dispatch, username} = this.props;
        const data = new FormData();
        data.append('avatar', this.uploadInput.files[0]);
        data.append('id', username._id);
        avatarHelper(data)
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
        let html = <img className="img-fluid" style={{maxHeight: "200px"}} src={boy} alt="avatar"/>;
        if (username !== null) {
            if (username.avatarLink && username.avatarLink !== null) {
                html = <img className="img-fluid" style={{maxHeight: "200px"}}
                            src={config.apiUrl + '/uploads/' + username.phone + '/' + username.avatarLink}
                            alt="avatar"/>;
            }
        }

        return (
            <div>
                <div className="profile-doccument">
                    <div className="form-indentily">
                        <Jumbotron>
                            <div className="profile-title">
                                <h2>Logo <span className="warning">*</span></h2>
                            </div>
                            <div className="form-upload">

                                <div className="upload-container">
                                    <input  ref={(ref) => {
                                        this.uploadInput = ref;
                                    }}
                                                   type="file" onChange={this.handleUploadImage} name="file"
                                                   accept="image/*;capture=camera"/>
                                </div>

                                <div className="sample_doc">
                                    {
                                        html
                                    }

                                    <p> Bấm để chọn ảnh khác</p>
                                </div>

                            </div>
                            <div>
                                <div className="list">
                                    <div className="icon icon-tick"></div>
                                    <div className="list-item">Hình chụp thẳng trực diện.</div>
                                </div>
                                <div className="list">
                                    <div className="icon icon-tick"></div>
                                    <div className="list-item">Không đội nón, kính râm.</div>
                                </div>
                                <div className="list">
                                    <div className="icon icon-tick"></div>
                                    <div className="list-item">Ảnh rõ nét, không bị mờ.</div>
                                </div>
                                <div className="list">
                                    <div className="icon icon-tick"></div>
                                    <div className="list-item">Nền trơn, màu trắng hoặc xanh dương.</div>
                                </div>
                            </div>

                            <div className="indentily-submit">
                                <NavLink to={"/contact"} className="btn btn-lg btn-primary btn-block" id="mySubmit"
                                         type="submit"
                                >Tiếp tục
                                </NavLink>
                            </div>
                        </Jumbotron>
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

    export default connect(mapStateToProps)(Avatar);
