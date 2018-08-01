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

class Map extends React.Component {
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
        let latitude = 10.754329, longitude  = 106.591489;
        if (username !== null) {
            longitude = username.longitude;
            latitude = username.latitude;
        }
        return (
            <div>
                <div className="profile-doccument">
                    <div className="form-indentily">
                        <Jumbotron>
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
                                    lat: longitude,
                                    lng: latitude,
                                }}
                                //  center={{lat: map.lat , lng: map.lng}}
                            />

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

export default connect(mapStateToProps)(Map);
