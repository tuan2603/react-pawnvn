import React, {Component} from 'react';
import {MainMenu} from '../../components/navbar2';
import {Footers} from '../../components/footer';
import {ModalLoginPage} from "../logins";

class MainLayout extends Component {

    render() {
        let {children} = this.props;
        return (
            <div >
                <MainMenu/>
                <ModalLoginPage/>
                <main>
                    {children}
                </main>
                <Footers/>
            </div>
        );
    }
}

export default (MainLayout);
