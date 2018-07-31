import React, {Component} from 'react';
import {Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink} from 'mdbreact';
import mainLogo from '../../assets/img/logo.png';
import './Navbar.css';
import {connect} from "react-redux";

class NavbarTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
        this.handleTogglerClick = this.handleTogglerClick.bind(this);
        this.handleNavbarClick = this.handleNavbarClick.bind(this);
    }


    handleTogglerClick() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    handleNavbarClick() {
        this.setState({
            collapsed: false
        });
    }

    render() {
        let {username} = this.props;
        let htmldn = <NavItem><NavLink to="/signin" exact>Đăng Nhập</NavLink> </NavItem>;
        let htmldx = <NavItem><NavLink to="/signup" exact>Đăng Ký</NavLink> </NavItem>;
        if (username !== null) {
            if (username.fullName !== null) {
                htmldn = <NavItem> <NavLink to="/contact" exact>{username.fullName}</NavLink></NavItem>;

            }
            htmldx = <NavItem>
                <NavLink to="/signin" exact>
                                    <span className="btn btn-danger btn-sm btn-rounded">
                                        <i className="fa fa-sign-out" aria-hidden="true"></i><span className={`logout`}>Đăng xuất</span>
                                    </span>
                </NavLink>
            </NavItem>
        }
        return (
            <Navbar className="nav-main" expand="md" fixed="top" scrolling color="#afafaf">
                <NavbarBrand href="/">
                    <img src={mainLogo} alt="or-trans" height="32"/>
                </NavbarBrand>
                <NavbarToggler onClick={this.handleTogglerClick}/>
                <Collapse isOpen={this.state.collapsed} navbar>
                    <NavbarNav right onClick={this.handleNavbarClick}>
                        <NavItem>
                            <NavLink to="/" exact>Trang Chủ</NavLink>
                        </NavItem>
                        {
                            htmldn
                        }
                        {
                            htmldx
                        }
                    </NavbarNav>
                </Collapse>
            </Navbar>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        username: state.userReducers
    };
};

export default connect(mapStateToProps)(NavbarTop);
