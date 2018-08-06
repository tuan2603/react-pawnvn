import React from 'react';
import {
    Redirect
} from "react-router-dom";
import {Jumbotron} from 'mdbreact';
import {connect} from "react-redux";
import autoBind from "react-autobind";
import {UserDocumentHelper} from "../../helpers";
import {alogin} from "../../actions/userActions";
import {show_notification} from "../../actions/notifyActions";
import {MapGoogle} from "../GoogleMap";

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: null,
            lng: null,
            isChange: false,
            redirectToReferrer: false,
        }
        autoBind(this);
    }

    onAddMap(map) {
        let {username} = this.props;
        if (username !== null) {
            if (username.longitude !== map.lng && username.latitude !== map.lat)
            {
                this.setState({lat: map.lat, lng: map.lng, isChange: true})
            }
        }
    }

    handleSubmit() {
        const {dispatch, username} = this.props;
        let {isChange, lat, lng} = this.state;
        if (isChange) {
            let obj = {};
            if (username != null) {
                obj.id = username._id;
            }
            obj.latitude = lat;
            obj.longitude = lng;
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
        let {redirectToReferrer, isChange} = this.state;
        let latitude = 10.754329, longitude = 106.591489;
        if (username !== null) {
            longitude = username.longitude;
            latitude = username.latitude;
        }
        if (redirectToReferrer) {
            return <Redirect to={'/contact'}/>
        }

        let htmlsub = 'Tiếp tục';
        if (isChange) {
            htmlsub = " Lưu thông tin ";
        }
        return (
            <div>
                <div className="profile-doccument">
                    <div className="form-indentily">
                        <Jumbotron>

                            <div className="indentily-number">
                                <p>Địa điểm Cty/ doanh nghiệp: <span className="warning">*</span></p>
                            </div>

                            <MapGoogle
                                googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyA-Y0s_MUWJ-Hyf4oSE8_eQjZb-V5ZNmG8&v=3.exp&libraries=geometry,drawing,places"}
                                loadingElement={<div style={{height: `100%`}}/>}
                                containerElement={<div style={{height: `400px`}}/>}
                                mapElement={<div style={{height: `100%`}}/>}
                                zoom={12}
                                onAddMap={this.onAddMap}
                                isMarkerShown
                                center={{
                                    lat: latitude,
                                    lng: longitude,
                                }}
                            />

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
