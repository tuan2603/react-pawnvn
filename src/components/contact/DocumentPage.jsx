import React, {Component} from 'react';
import {
    NavLink
} from "react-router-dom";
import {Fa} from 'mdbreact';
import "./DocumentPage.css";

class DocumentPage extends Component {

    render() {
        return (
            <div className="document-main">
                <ul className="list-unstyled  example-components-list text-left">
                    <li>
                        <NavLink to="/avatar"> Logo doanh nghiệp <b style={{color: "red"}}>*</b> <Fa
                            icon="angle-right"/></NavLink>
                    </li>
                    <li>
                        <NavLink to="/info-user"> Thông tin chủ doanh nghiệp <b style={{color: "red"}}>*</b> <Fa
                            icon="angle-right"/></NavLink>
                    </li>
                    <li>
                        <NavLink to="/identily-card">Chứng minh nhân dân <b style={{color: "red"}}>*</b> <Fa
                            icon="angle-right"/></NavLink>
                    </li>
                    <li>
                        <NavLink to="/location">Vị trí: <b style={{color: "red"}}>*</b> <Fa
                            icon="angle-right"/></NavLink>
                    </li>
                    <li>
                        <NavLink to="/business-registration"> Giấy đăng ký Kinh doanh <b style={{color: "red"}}>*</b>
                            <Fa
                                icon="angle-right"/></NavLink>
                    </li>

                    <li>
                        <NavLink to="/choose-categories"> Danh mục thế chấp <b style={{color: "red"}}>*</b> <Fa
                            icon="angle-right"/></NavLink>
                    </li>
                </ul>

            </div>
        );
    }
}

export default DocumentPage;
