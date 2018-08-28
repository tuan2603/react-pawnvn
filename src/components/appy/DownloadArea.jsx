import React from 'react';
import {Link} from 'react-router-dom';
import "./DownloadArea.css";


class DownloadArea  extends React.Component {


    render() {

        return (
            <div className="download-area overlay">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-7 section-padding">
                            <h3 className="white-color">Tải ứng dụng Khách Hàng</h3>
                            <div className="space-20"> </div>
                            <p>  Khách hàng tải ứng dụng và đăng ký sử dụng trên Android và Ios.</p>
                            <div className="space-60"> </div>
                            <Link to="/#" className="bttn-white sq"><img src="/images/apple-icon.png" alt="apple icon" /> Apple Store</Link>
                            <Link to="/#" className="bttn-white sq"><img src="/images/play-store-icon.png" alt="Play Store Icon"/> Play Store</Link>
                        </div>
                        <div className="col-xs-12 col-sm-5 hidden-sm">
                            <figure className="mobile-image">
                                <img src="/images/android1.png" alt="pawn vietnam" />
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DownloadArea;
