import React, {Component} from 'react';
import { NavbarTop } from  '../../components';
import {connect} from "react-redux";
import autoBind from "react-autobind";
import {Redirect} from 'react-router-dom';
import {TOKEN} from '../../constants/Users';
import {getInfo} from '../../helpers';
import {getFromSession} from '../../utils';
import {alogin} from "../../actions/userActions";
import {show_notification} from "../../actions/notifyActions";
class MainLayoutLogined extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
        }
        autoBind(this);
    }
    componentDidMount(){
        if(getFromSession(TOKEN) == null )  {
            this.setState({
                redirectToReferrer: true,
            }) ;
        }else{
            const {dispatch, loggingIn} = this.props;
            if (loggingIn === null) {
                getInfo().then(user => {
                    if (user.response === true) {
                        dispatch(alogin(user.value));
                    } else {
                        dispatch(show_notification({txt: "Tên hoặc mật khẩu không đúng", type: "err"}));
                    }
                });
            }
        }
    }
    render() {
        const {children} = this.props;
        const {redirectToReferrer} = this.state;
        if (redirectToReferrer) {
            return <Redirect to={`/signin`}/>
        }
        return (
            <div className="flyout">
                <NavbarTop />
                <main style={{marginTop:"4em"}}>
                    {children}
                </main>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        loggingIn: state.userReducers
    };
};

export default connect(mapStateToProps)(MainLayoutLogined);
