import React, {Component} from 'react';
import { Jumbotron } from 'mdbreact';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import * as userActions from '../../actions/userActions';
import {verifyCaptcha} from '../../helpers';
import IntlTelInput from 'react-intl-tel-input';
import libphonenumber from '../../../node_modules/react-intl-tel-input/dist/libphonenumber.js';
import '../../../node_modules/react-intl-tel-input/dist/main.css';
import './login.css';
import ReCAPTCHA from 'react-grecaptcha';
import {bindActionCreators} from 'redux';

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
        // logout
        this.props.actions.alogout();
    }

    // specifying your onload callback function
    expiredCallback() {
        this.setState({isDisabled: true});
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
        let {phone, password} = this.state.username;
        this.props.actions.Login({phone, password}).then(res => {
            if (res === 0) {
                this.setState({redirectToReferrer: true});
            }
            if (res === 1){
                this.setState({redirectToVerify: true});
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
                    <Jumbotron>
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
                            <div className={"form-label-group" + (submitted && !username.password ? ' has-error' : '')}>
                
                                    <input type="password" className={`password card-number`}
                                           placeholder="password" name="password"
                                           onChange={this.handleChangePassword}
                                          
                                    />                   
                            </div>
                            {submitted && !username.password &&
                                <div className="help-block">Password is required</div>
                                }
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
                        </Jumbotron>
                    </div>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        loggingIn: state.userReducers
    };
};
function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(userActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
