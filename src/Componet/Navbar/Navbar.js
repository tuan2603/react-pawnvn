import React, {Component} from 'react';
import {Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink} from 'mdbreact';
import mainLogo from '../../img/logo.png';
import {getFromStorage} from '../../utils/storage';
import Config from "../../utils/config";
import './Navbar.css';

class HomeMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            user: {
                fullName: '',
                phone: '',
                avatarLink: '',
            },
            isLogin: false,
        };
        this.handleTogglerClick = this.handleTogglerClick.bind(this);
        this.handleNavbarClick = this.handleNavbarClick.bind(this);
    }

    componentWillMount() {
        let b = getFromStorage(Config.USERINFO);
        if (b) {
            this.setState({user: b});
        }
    }

    componentDidMount() {
        let {user, isLogin} = this.state;
        if (user.phone !== '' && !isLogin) {
            this.setState({isLogin: true});
        } else if (user.phone === '' && isLogin) {
            this.setState({isLogin: false});
        }
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
        return (
            <Navbar className="nav-main" expand="md" fixed="top" scrolling color="#afafaf" >
                <NavbarBrand href="/">
                    <img src={mainLogo} alt="or-trans" height="32" />
                </NavbarBrand>
                <NavbarToggler onClick={this.handleTogglerClick}/>
                <Collapse isOpen={this.state.collapsed} navbar>
                    <NavbarNav right onClick={this.handleNavbarClick}>
                        <NavItem>
                            <NavLink to="/" exact >Trang Chủ</NavLink>
                        </NavItem>
                        {/*<NavItem>*/}
                        {/*<NavLink to="/css">CSS</NavLink>*/}
                        {/*</NavItem>*/}
                        {/*<NavItem>*/}
                        {/*<NavLink to="/components">Components</NavLink>*/}
                        {/*</NavItem>*/}
                        {/*<NavItem>*/}
                        {/*<NavLink to="/advanced">Advanced</NavLink>*/}
                        {/*</NavItem>*/}
                        {
                            !this.state.isLogin && <NavItem>
                                <NavLink to="/signin" exact>Đăng Nhập</NavLink>
                            </NavItem>
                        }
                        {
                            !this.state.isLogin && <NavItem>
                                <NavLink to="/signup" exact>Đăng Ký</NavLink>
                            </NavItem>
                        }
                        {
                            this.state.isLogin && <NavItem>
                                <NavLink to="/contact" exact>{this.state.user.fullName}</NavLink>
                            </NavItem>
                        }
                    </NavbarNav>
                </Collapse>
            </Navbar>
        );
    }
}

export default HomeMenu;
