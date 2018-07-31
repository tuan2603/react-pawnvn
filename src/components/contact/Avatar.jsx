import React from 'react';
import {
    NavLink
} from "react-router-dom";
import {Jumbotron} from 'mdbreact';
import './Profile.css';
import {connect} from "react-redux";
import autoBind from "react-autobind";
import {avatarHelper} from "../../helpers";
import {alogin} from "../../actions/userActions";
import {show_notification} from "../../actions/notifyActions";
import {UploadeImage} from "../contact";

class Avatar extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    handleUploadImage(file) {
        const {dispatch, username} = this.props;
        const data = new FormData();
        data.append('avatar', file);
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
        let avatarLink  = null;
        if (username !== null) {
            avatarLink = username.avatarLink
        }
        return (
            <div>
                <div className="profile-doccument">
                    <div className="form-indentily">
                        <Jumbotron>
                            <div className="profile-title">
                                <h2>Logo <span className="warning">*</span></h2>
                            </div>
                            <UploadeImage
                                username={username}
                                filename={ avatarLink }
                                uploadF={this.handleUploadImage}
                            />
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
