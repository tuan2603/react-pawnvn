import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem} from 'mdbreact';
import mainLogo from '../../assets/img/logo.png';
import {connect} from "react-redux";
import autoBind from "react-autobind";

class NavbarTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
        autoBind(this);
    }


    render() {
        // let {username} = this.props;
        // let {collapsed} = this.state;
        // let htmldn = <NavItem><NavLink to="/signin" exact>Đăng Nhập</NavLink> </NavItem>;
        // let htmldx = <NavItem><NavLink to="/signup" exact>Đăng Ký</NavLink> </NavItem>;
        // if (username !== null) {
        //     if (username.fullName !== null) {
        //         htmldn = <NavItem> <NavLink to="/contact" exact>{username.fullName}</NavLink></NavItem>;
        //
        //     }
        //     htmldx = <NavItem>
        //         <NavLink to="/signin" exact>
        //                             <span className="btn btn-danger btn-sm btn-rounded">
        //                                 <i className="fa fa-sign-out" aria-hidden="true"></i><span className={`logout`}>Đăng xuất</span>
        //                             </span>
        //         </NavLink>
        //     </NavItem>
        // }
        return (
            <nav className="mainmenu-area" data-spy="affix" data-offset-top="200">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse"
                                data-target="#primary_menu">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <NavLink className="navbar-brand" to="#"><img src={mainLogo} alt="Logo" /></NavLink>
                    </div>
                    <div className="collapse navbar-collapse" id="primary_menu">
                        <ul className="nav navbar-nav mainmenu">
                            <li className="active"><a href="#home_page">Home</a></li>
                            <li><a href="#about_page">About</a></li>
                            <li><a href="#features_page">Features</a></li>
                            <li><a href="#gallery_page">Gallery</a></li>
                            <li><a href="#price_page">Pricing</a></li>
                            <li><a href="#questions_page">FAQ</a></li>
                            <li><a href="blog.html">Blog</a></li>
                            <li><a href="#contact_page">Contacts</a></li>
                        </ul>
                        <div className="right-button hidden-xs">
                            <a href="#">Sign Up</a>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        username: state.userReducers
    };
};

export default connect(mapStateToProps)(NavbarTop);
