import React, {Component} from 'react';
import {getFromStorage, removeStorage} from '../../utils/storage';
import {removeSession} from '../../utils/sessionStorage';
import Config from '../../utils/config';
import DocumentPage from '../../Componet/UserInfo/DocumentPage';
import {
    Redirect
} from "react-router-dom";
import './Contact.css';

class Contact extends Component {
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
            },
            isLogout: false,
        }

        this.submitLogout = this.submitLogout.bind(this);
    }

    submitLogout() {
        removeStorage(Config.USER);
        removeStorage(Config.USERINFO);
        removeSession(Config.PHONE);
        window.location.reload();
    }

    componentWillMount() {
        let useraccount = getFromStorage(Config.USER);
        if (useraccount) {
            this.setState({useraccount});
        }

        let user = getFromStorage(Config.USERINFO);
        if (user) {
            this.setState({user});
        }
    }

    componentDidMount() {
        if (this.state.user.phone === "") {
            setTimeout(function () {
                this.setState({isLogout: true})
            }.bind(this), 1000);
        }
    }


    render() {
        const {isLogout} = this.state;
        if (isLogout) {
            return (<Redirect to="/signin"/>);
        }
        return (
            <div>
                    <DocumentPage/>
                    <div className="main-contact">
                        <div className="form-signin">
                            {/*<div className="text-center mb-4">*/}
                            {/*<h1 className="h3 mb-3 font-weight-normal">Phone: {this.state.user.phone}</h1>*/}
                            {/*</div>*/}

                            <div className="form-label-xau">
                                <button className="btn btn-lg btn-primary btn-block" id="mySubmit" type="submit"
                                        onClick={this.submitLogout}
                                >Đăng xuất
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default Contact;
