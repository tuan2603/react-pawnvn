import React from 'react';
import {
    Redirect
} from "react-router-dom";
import {Jumbotron} from 'mdbreact';
import Api from '../../utils/api';
import {getFromStorage, setInStorage} from "../../utils/storage";
import Config from "../../utils/config";
import './Profile.css';
import boy from '../../img/boy.svg';
import {ToastContainer, toast} from 'react-toastify';

class ProfilePicture extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            useraccount: {
                id: '',
                token: '',
                activeType: '',
            },
            user: {
                fullName: '',
                phone: '',
                avatarLink: '',
                accept: false,
            },
            redirect: false,
        };

        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    handleNext() {
        this.setState({redirect: true});
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

    handleUploadImage(ev) {
        ev.preventDefault();
        if (this.state.user.accept) {
            toast.warn('Thông tin đã được xác thực không được thay đổi');
        } else {
            const data = new FormData();
            data.append('avatar', this.uploadInput.files[0]);
            data.append('id', this.state.useraccount.id);
            const headers = new Headers();
            headers.append('Authorization', 'Bearer ' + this.state.useraccount.token);

            const config = {
                method: 'POST',
                headers: headers,
                body: data,
            }
            fetch(Api.PROFILE_PICTRUE, config)
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.value === true) {
                        setInStorage(Config.USERINFO, responseJson.response);
                        this.setState({user: responseJson.response})
                    } else {
                        toast.warn('Upload image bị lỗi, hình ảnh không dược quá 5MB');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    render() {
        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to='/contact'/>;
        }
        return (
            <div>
                <div className="profile-doccument">
                    <div className="form-indentily">
                        <Jumbotron>
                            <div className="profile-title">
                                <h2>Chụp Ảnh Chân Dung <span className="warning">*</span></h2>
                            </div>
                            <div className="form-upload">

                                <div className="upload-container">
                                    <input ref={(ref) => {
                                        this.uploadInput = ref;
                                    }} type="file" onChange={this.handleUploadImage} name="file"
                                           accept="image/*;capture=camera" disabled={this.state.accept}/>
                                </div>

                                <div className="sample_doc">
                                    {
                                        this.state.user.avatarLink !== undefined &&
                                        <img className="img-fluid" style={{maxHeight: "200px"}}
                                             src={Api.AVATAR + this.state.user.phone + '/' + this.state.user.avatarLink}
                                             alt="avatar"/>
                                    }
                                    {
                                        this.state.user.avatarLink === undefined &&
                                        <img className="img-fluid" style={{maxHeight: "200px"}} src={boy} alt="avatar"/>
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
                                <button className="btn btn-lg btn-primary btn-block" id="mySubmit" type="submit"
                                        onClick={this.handleNext}
                                >Tiếp tục
                                </button>
                            </div>
                        </Jumbotron>
                    </div>

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

export default ProfilePicture;
