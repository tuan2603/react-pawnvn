import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Switch, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../assets/css/mdb.css';
import '../assets/css/themify-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import {LayoutRoute, MainLayout, MainLayoutLogined} from "../components/layout";
import {setupTimeOut} from '../utils';
import {Notification} from '../components/notification';
import {HomePageMain} from '../components/home';
import { AppyPage} from '../components/appy';
import {Login} from '../components/logins';
import {SignUp} from '../components/signup';
import {Contact, Avatar, IndentilyCard, InfoUser, Map, BusinessRegistration, Categories} from '../components/contact';
import {Verify} from '../components/verify';
import {Privacy,About} from '../components/privacy';

class App extends Component {
    componentWillMount() {
        setupTimeOut();
    }

    render() {
        let {notification} = this.props;
        return (
            <BrowserRouter >
                <main>
                    {(notification !== null) && <Notification/>}
                    <Switch>
                        <LayoutRoute
                            exact
                            path='/'
                            layout={MainLayout}
                            component={HomePageMain}/>

                        <LayoutRoute
                            exact
                            path='/home.html'
                            layout={MainLayout}
                            component={AppyPage}/>

                        <LayoutRoute
                            exact
                            path='/signin'
                            layout={MainLayout}
                            component={Login}/>

                        <LayoutRoute
                            exact
                            path='/signup'
                            layout={MainLayout}
                            component={SignUp}/>

                        <LayoutRoute
                            exact
                            path='/verify'
                            layout={MainLayout}
                            component={Verify}/>

                        <LayoutRoute
                            exact
                            path='/contact'
                            layout={MainLayoutLogined}
                            component={Contact}/>

                        <LayoutRoute
                            exact
                            path='/avatar'
                            layout={MainLayoutLogined}
                            component={Avatar}/>

                        <LayoutRoute
                            exact
                            path='/identily-card'
                            layout={MainLayoutLogined}
                            component={IndentilyCard}/>

                        <LayoutRoute
                            exact
                            path='/info-user'
                            layout={MainLayoutLogined}
                            component={InfoUser}/>

                        <LayoutRoute
                            exact
                            path='/location'
                            layout={MainLayoutLogined}
                            component={Map}/>

                        <LayoutRoute
                            exact
                            path='/business-registration'
                            layout={MainLayoutLogined}
                            component={BusinessRegistration}/>

                        <LayoutRoute
                            exact
                            path='/choose-categories'
                            layout={MainLayoutLogined}
                            component={Categories}/>

                        <LayoutRoute
                            exact
                            path='/dieu-khoan-su-dung.html'
                            layout={MainLayout}
                            component={Privacy} />

                        <LayoutRoute
                            exact
                            path='/gioi-thieu.html'
                            layout={MainLayout}
                            component={About} />

                        <Redirect to="/"/>
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
