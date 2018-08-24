import React from 'react';
import "./Architecture.css";

class Architecture extends React.Component {
    render() {
        return (
            <div>
                <header className="architecture-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="page-title text-center">
                                    <h2 className="title">Mô Hình Hoạt Động Sàn ORi</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {/*<div className="col-xs-12">*/}
                                {/*<div className="team-slide">*/}
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <article className="post-single">
                                            <figure className="post-media">
                                                <img src="/images/register.png" alt="icon"/>
                                            </figure>
                                            <div className="post-body">
                                                <h4 className="dark-color"> 1. Đăng ký vay</h4>
                                                <p>Hoàn tất điền thông tin trong 1 phút</p>
                                            </div>
                                        </article>
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <article className="post-single">
                                            <figure className="post-media">
                                                <img src="/images/connect.png" alt="icon"/>
                                            </figure>
                                            <div className="post-body">
                                                <h4 className="dark-color"> 2. Kết nối</h4>
                                                <p>Ngay lập tức người cho vay sẽ nhận được đơn xin vay của bạn</p>
                                            </div>
                                        </article>
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <article className="post-single">
                                            <figure className="post-media">
                                                <img src="/images/approval.png" alt="icon"/>
                                            </figure>
                                            <div className="post-body">
                                                <h4 className="dark-color"> 3. Xét duyệt</h4>
                                                <p>Nhận kết quả nhanh chóng sau khi gửi hồ sơ</p>
                                            </div>
                                        </article>
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-3">
                                        <article className="post-single">
                                            <figure className="post-media">
                                                <img src="/images/money_icon_by_vexels.png" alt="icon"/>
                                            </figure>
                                            <div className="post-body">
                                                <h4 className="dark-color"> 4. Nhận tiền </h4>
                                                <p>Tiền sẽ được chuyển vào tài khoản của bạn hoặc nhận tiền mặt</p>
                                            </div>
                                        </article>
                                    </div>
                                {/*</div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

export default Architecture;