import React from 'react';
import {
    NavLink
} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import autoBind from "react-autobind";
import * as userActions from "../../actions/userActions";
import * as notifyActions from "../../actions/notifyActions";
import {UploadeImage} from "../contact";
import * as config from "../../utils";
import './Avatar.css';
import {title} from "../../utils";


class Avatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            saving: false,
            file: "",
            imgagel: new Image(),
        }
        autoBind(this);
    }

    componentDidMount() {
        document.title = `${title} - Ảnh đại diện`
    }

    handleUploadImage(file) {
        this.setState({isEdit: true, file, saving: false});
    }

    onLoad() {
        let {file, imgagel} = this.state;
        var width = imgagel.naturalWidth,
            height = imgagel.naturalHeight;
        let {actionsNot, actionsUser, username} = this.props;
        window.URL.revokeObjectURL(imgagel.src);
        if ((width / height <= 1.1 && width / height >= 0.9) || file.size / 1024 / 1204 > 5) {
            // thỏa điều kiện tỉ lệ 1 : cho upload
            const data = new FormData();
            data.append('avatar', file);
            data.append('id', username._id);
            actionsUser.UploadeAvata(data).then(res => {
                if (res) {
                    this.setState({isEdit: false, saving: false});
                }
            })
        }
        else {
            // sai thỉ lệ thông báo người dùng up lại anh khác
            actionsNot.Notification({txt: "Ảnh yêu cầu tỉ lệ 1:1, không quá 5MB", type: "err"})
        }
    }

    onSave() {
        this.setState({saving: true});
        let {file} = this.state;
        if (file) {
            //kiểm tra anh có đúng kích thước theo yêu cấu hay không           
            var img = this.state.imgagel;
            img.src = window.URL.createObjectURL(file);
            img.onload = this.onLoad.bind(this);
            this.setState({imgagel: img})
        }
    }

    render() {
        let {username} = this.props;
        let {isEdit, saving} = this.state;
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
                onClick={this.onSave}/>)
        }

        let avatarLink = null;
        if (username !== null && username.avatarLink !== null) {
            avatarLink = `${config.apiUrl}/uploads/${username.phone}/${username.avatarLink}`;
        }

        return (
            <div className="avatar-main">
                <header className="site-header">

                </header>
                <div className="subscribe-area section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                                <div className="subscribe-form text-center">
                                    <h3 className="blue-color"> Logo </h3>
                                    <div className="space-20"></div>
                                    <UploadeImage
                                        value={avatarLink}
                                        lable="avatar"
                                        name="avatarLink"
                                        onChange={this.handleUploadImage}
                                    />
                                    <div>
                                        <div className="list">
                                            <div className="icon icon-tick"></div>
                                            <div className="list-item">Ảnh yêu cầu tỉ lệ 1:1, không quá
                                                5MB
                                            </div>
                                        </div>
                                        <div className="list">
                                            <div className="icon icon-tick"></div>
                                            <div className="list-item">Ảnh rõ nét, không bị mờ.</div>
                                        </div>
                                    </div>

                                    <div className="indentily-submit">
                                        {$button}

                                    </div>

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
        notify: state.notifyReducers,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actionsNot: bindActionCreators(notifyActions, dispatch),
        actionsUser: bindActionCreators(userActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
