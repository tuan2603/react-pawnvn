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
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Axios from "axios/index";
import Map from "../GoogleMap/Map";


const json = [
    {value: 'smartphone', label: 'SmartPhones'},
    {value: 'tablet', label: 'Tablet'}];

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
                longitude: 106.591489,
                latitude: 10.754329,
                categories:[],
            },
            redirect: false,
            selectedOption: [],
            category: [],
            isMarkerShown: false,
            isChange: false,
            map: {lat:"",lng:""},
        };

        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.onAddMap = this.onAddMap.bind(this);
    }

    componentWillMount() {
        Axios({
            method: 'GET', //you can set what request you want to be
            url: Api.CATEGORY,
        }).then(response => {
            if (response.status === 200) {
                this.setState({category: response.data.value});
            } else {
                this.setState({category: json});
            }
        }).catch(function (error) {
            console.log(error);
        });

        let a = getFromStorage(Config.USER);
        if (a) {
            this.setState({useraccount: a});
        }

        let b = getFromStorage(Config.USERINFO);
        if (b) {
            this.setState({user: b});
        }
    }
    componentDidMount(){
        if (this.state.user.categories !== undefined) {
            this.setState({selectedOption:this.state.user.categories});
        }
    }


    handleChangeCategory(selectedOption) {
        // selectedOption can be null when the `x` (close) button is clicked
        if (selectedOption) {
            this.setState({selectedOption, isChange: true});
        }
    }

    onAddMap(map) {
        //console.log(map);
        this.setState({
            map: map,
            isChange: true
        });
    }

    handleNext() {
        const {isChange, map, selectedOption} = this.state;
        const {id, token} = this.state.useraccount;
        if (isChange) {
            const headers = new Headers();
            headers.append('Authorization', 'Bearer ' + token);
            headers.append('Content-Type', 'application/json');
            const config = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    'latitude': map.lat,
                    'longitude': map.lng,
                    'categories':selectedOption,
                    'id': id,
                }),
            };
            fetch(Api.UPDATE_USER, config)
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.value === true) {
                        setInStorage(Config.USERINFO, responseJson.response);
                        toast.success('Cập nhật thành công');
                        setTimeout(function () {
                            this.setState({user: responseJson.response, redirect: true});
                        }.bind(this), 2000);

                    } else {
                        toast.warn('Cập nhật thất bại vui lòng kiểm tra giá trị nhập');
                        console.log(responseJson.response);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });

        } else {
            this.setState({redirect: true});
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
                    //console.log(responseJson);
                    if (responseJson.response === true) {
                        setInStorage(Config.USERINFO, responseJson.value);
                        this.setState({user: responseJson.value});
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
        const {redirect, selectedOption, category, user} = this.state;
        if (redirect) {
            return <Redirect to='/contact'/>;
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
                                    <input ref={(ref) => {
                                        this.uploadInput = ref;
                                    }} type="file" onChange={this.handleUploadImage} name="file"
                                           accept="image/*;capture=camera" disabled={this.state.accept}/>
                                </div>

                                <div className="sample_doc">
                                    {
                                        user.avatarLink !== undefined &&
                                        <img className="img-fluid" style={{maxHeight: "200px"}}
                                             src={Api.AVATAR + user.phone + '/' + user.avatarLink}
                                             alt="avatar"/>
                                    }
                                    {
                                        user.avatarLink === undefined &&
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
                            <div className="indentily-number">
                                <p>Danh mục cầm đồ: <span className="warning">*</span></p>
                            </div>
                            <Select
                                name="form-field-name"
                                value={selectedOption}
                                multi={true}
                                onChange={this.handleChangeCategory}
                                options={category}
                            />
                            <div className="indentily-number">
                                <p>Địa điểm Cty/ doanh nghiệp: <span className="warning">*</span></p>
                            </div>
                            <Map
                                googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyA-Y0s_MUWJ-Hyf4oSE8_eQjZb-V5ZNmG8&v=3.exp&libraries=geometry,drawing,places"}
                                loadingElement={<div style={{height: `100%`}}/>}
                                containerElement={<div style={{height: `400px`}}/>}
                                mapElement={<div style={{height: `100%`}}/>}
                                zoom={14}
                                onAddMap={this.onAddMap}
                                isMarkerShown
                                // center={{lat:  106.591489, lng: 10.754329}}
                                center={{
                                    lat: user.latitude ? user.latitude : 10.754329,
                                    lng: user.longitude ? user.longitude :  106.591489,
                                }}
                                //  center={{lat: map.lat , lng: map.lng}}
                            />
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
