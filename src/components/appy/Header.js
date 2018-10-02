import React from 'react';
import "./HeaderHome.css";

class HeaderHomeArea extends React.Component {
    render() {
        return (
            <div>
                <header className="home-area overlay">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="page-title text-center">
                                    <h2 className="title white-color">Mô Hình Hoạt Động Sàn ORi</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

export default HeaderHomeArea;