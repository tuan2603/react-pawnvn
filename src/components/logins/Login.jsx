import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {alogin, alogout} from '../../actions/userActions';
import {show_notification} from '../../actions/notifyActions';
import {TOKEN} from '../../constants/Users';
import {getInfo, login, verifyCaptcha} from '../../helpers';
import {setInSession, removeSession, getFromSession} from '../../utils';
import IntlTelInput from 'react-intl-tel-input';
import libphonenumber from '../../../node_modules/react-intl-tel-input/dist/libphonenumber.js';
import '../../../node_modules/react-intl-tel-input/dist/main.css';
import './login.css';
import ReCAPTCHA from 'react-grecaptcha';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: {
                phone: "",
                password: "",
                countryData: "",
            },
            submitted: false,
            redirectToReferrer: false,
            redirectToVerify: false,
            isDisabled: true,
        }
        autoBind(this);
    }

    componentDidMount() {
        if (getFromSession(TOKEN) != null) {
            this.props.dispatch(alogout());
            removeSession(TOKEN);
        }
    }

    // specifying your onload callback function
    expiredCallback() {
        let {dispatch} = this.props;
        this.setState({isDisabled: true});
        dispatch(show_notification({txt: "Đã hết thời gian verify captcha", type: "war"}));
    };

    verifyCallback(token) {
        verifyCaptcha(token)
            .then(response => {
                if (response !== undefined) {
                    this.setState({isDisabled: !response});
                }
            });
    }

    onChangeHandler(status, value, countryData, number, id) {
        let {username} = this.state;
        username.phone = value;
        username.countryData = countryData;
        this.setState({username});
    };

    handleChangePassword(e) {
        let {username} = this.state;
        username.password = e.target.value;
        this.setState({username});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({submitted: true});
        const {dispatch} = this.props;
        let {phone, password} = this.state.username;
        login(phone, password)
            .then(user => {
                if (user.value === 0) {
                    setInSession(TOKEN, user.message);
                    dispatch(show_notification({txt: "Đăng nhập thành công", type: "suc"}));
                    if (getFromSession(TOKEN) !== null) {
                        getInfo().then(user => {
                            if (user.response === true) {
                                dispatch(alogin(user.value));
                            }
                        });
                    }
                    this.setState({redirectToReferrer: true});
                } else if (user.value === 1) {
                    dispatch(alogin({phone}));
                    dispatch(show_notification({txt: user.message, type: "war"}));
                    this.setState({redirectToVerify: true});
                } else {
                    dispatch(show_notification({txt: user.message, type: "err"}));
                }
            });
    }

    render() {

        const {username, submitted, redirectToReferrer, isDisabled, redirectToVerify} = this.state;
        if (redirectToReferrer) {
            return <Redirect to="/"/>;
        }
        if (redirectToVerify) {
            return <Redirect to="/verify"/>;
        }
        return (
            <div>
                <div className="main-signin">
                    <div className="form-signin">
                        <form className="m-4">
                            <div className="text-center">
                                <h1 className="h3 mb-3 font-weight-normal">Đăng nhập</h1>
                            </div>
                            <div className={"form-group" + (submitted && !username ? ' has-error' : '')}>
                                <div className={"form-label-group"}>
                                    <IntlTelInput
                                        onPhoneNumberChange={this.onChangeHandler}
                                        onPhoneNumberBlur={this.onChangeHandler}
                                        preferredCountries={['vn']}
                                        onlyCountries={['vn', 'us']}
                                        onSelectFlag={null}
                                        nationalMode={false}
                                        separateDialCode={true}
                                        fieldId={'telphone'}
                                        style={{borderBottom: '0px'}}
                                        utilsScript={libphonenumber}/>
                                </div>
                                {submitted && !username &&
                                <div className="help-block">Username is required</div>
                                }
                            </div>
                            <div className={"form-group" + (submitted && !username.password ? ' has-error' : '')}>
                                <div className={"form-label-group"}>
                                    <input type="password" className={`password`}
                                           placeholder="password" name="password"
                                           onChange={this.handleChangePassword}
                                    />
                                </div>
                                {submitted && !username.password &&
                                <div className="help-block">Password is required</div>
                                }
                            </div>
                            <div className="form-label-xau">
                                <ReCAPTCHA
                                    sitekey="6LfPfVwUAAAAAODFgOV5Qch0OV7lIBky41Tk1rp7"
                                    callback={this.verifyCallback}
                                    expiredCallback={this.expiredCallback}
                                    locale="en"
                                    className="signin-captcha"
                                />
                            </div>
                            <div className="form-label-xau">
                                <button className="btn btn-lg btn-primary btn-block" id="mySubmit"
                                        disabled={isDisabled} onClick={this.handleSubmit}
                                >Đăng nhập
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        loggingIn: state.userReducers,
        notification: state.notifyReducers
    };
};

export default connect(mapStateToProps)(Login);
