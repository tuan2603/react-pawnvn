import React, {Component} from 'react';
import { NavbarTop } from  '../../components/navbar';
import {Footers} from '../../components/footer';
import {Fa} from "mdbreact";
class MainLayout extends Component {

    render() {
        let  {children} = this.props;
        return (
            <div className="flyout">
                <div className="preloader">
                    <span><i className="lnr lnr-sun"></i></span>
                </div>
                <NavbarTop />
                <main style={{marginTop:"4em"}}>
                    {children}
                </main>
                <Footers/>
            </div>
        );
    }
}

export default (MainLayout);
