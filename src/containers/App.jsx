import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter , Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'font-awesome/css/font-awesome.min.css';
// import '../assets/css/mdb.css';
// import '../assets/css/style.css';
import '../assets/css/normalize.css';
import './App.css';
import {LayoutRoute, MainLayout} from "../components/layout";
import {setupTimeOut, getFromSession} from '../utils';
import {Notification} from '../components/notification';
import {HomePageMain} from '../components/home';
import {Login} from '../components/logins';
import {SignUp} from '../components/signup';
import {Contact} from '../components/contact';
import {TOKEN} from "../constants/Users";
import {getInfo} from '../helpers';
import {alogin} from "../actions/userActions";

class App extends Component {
    componentWillMount() {
        setupTimeOut();
        const {dispatch} = this.props;
        if(getFromSession(TOKEN) !== null )  {
            getInfo().then(user => {
                if (user.response === true) {
                    dispatch(alogin(user.value));
                }
            });
        }
    }

    render() {
        const {  notification } = this.props;
        return (
            <BrowserRouter >
            <main>
                {( notification !== null) && <Notification />}
                <Switch>
                    <LayoutRoute
                        exact
                        path='/'
                        layout={MainLayout}
                        component={HomePageMain} />

                    <LayoutRoute
                        exact
                        path='/signin'
                        layout={MainLayout}
                        component={Login} />

                    <LayoutRoute
                        exact
                        path='/signup'
                        layout={MainLayout}
                        component={SignUp} />

                    <LayoutRoute
                        exact
                        path='/contact'
                        layout={MainLayout}
                        component={Contact} />
                </Switch>
            </main>
            </BrowserRouter>
        );
    }
}
let mapStateToProps = (state) => {
    return {
        loggingIn: state.userReducers,
        notification: state.notifyReducers
    };
};
export default connect(mapStateToProps)(App);
