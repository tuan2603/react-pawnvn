import React, {Component} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import mainLogo from '../../assets/img/logo.png';
import tinylogo from '../../assets/img/tinylogo.png';
import {connect} from "react-redux";
import "./MainMenuArea.css";
import autoBind from "react-autobind";
import { Link} from 'react-scroll';
import {bindActionCreators} from "redux";
import * as userActions from "../../actions/userActions";
import $ from 'jquery';



class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectHome: false
        }
        autoBind(this);
    }

    handleLogout(){
        this.props.actions.alogout();
        this.setState({redirectHome: true})
    }

    componentDidMount(){
        $(".mainmenu-area #primary_menu li a").on("click", function (event) {
            $(".navbar-collapse").removeClass("in").removeClass("show");
        });

    }

    render() {
        let {redirectHome} = this.state;
        if (redirectHome) {
            return (<Redirect to={"/"} />);
        }
        let {username} = this.props;
        let $htmldk = (<li ><NavLink to="/signup" exact>Đăng Ký</NavLink></li>);
        let $htmldnxs =  (<li ><a className="dangnhapxs" data-target="#modallogin" data-toggle="modal">Đăng nhập</a></li>);
        let $htmldn = (<div className="right-button hidden-xs"><a data-target="#modallogin" data-toggle="modal">Đăng nhập</a></div>);
        if (username !== null) {
            $htmldk = null;
            $htmldn = (<div className="right-button hidden-xs"><a onClick={this.handleLogout}>Đăng Xuất</a></div>);
            if (username.fullName !== null) {
                $htmldnxs = <li  ><NavLink to="/contact" >{username.fullName}</NavLink></li>;
            }
        }
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
                            <NavLink className="navbar-brand mainlogo" to="/"><img src={mainLogo} height={40} alt="Logo"/></NavLink>
                            <NavLink className="navbar-brand tinylogo" to="/"><img src={tinylogo} height={56} alt="Logo"/></NavLink>
                        </div>
                        <div className="collapse navbar-collapse" id="primary_menu">
                            <ul className="nav navbar-nav mainmenu">
                                <li><NavLink to="/" exact>Trang Chủ</NavLink></li>
                                <li><Link to="gallery_page">Gallery</Link></li>
                                <li><NavLink to="/gioi-thieu.html" exact>Giới thiệu</NavLink></li>
                                <li><NavLink to="/#">Hỏi đáp</NavLink></li>
                                {$htmldk}
                                {$htmldnxs}
                            </ul>
                            {$htmldn}
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
function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(userActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
