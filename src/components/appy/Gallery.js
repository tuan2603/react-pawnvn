import React from 'react';
import {Link} from 'react-router-dom';
import autoBind from "react-autobind";
import "./Gallery.css";
import { Element } from 'react-scroll';
const $ = window.jQuery;

class Testimonial extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);

    }

    componentDidMount(){
        setTimeout(()=>{
            $('.gallery-slide').owlCarousel({
                loop: true,
                margin: 0,
                responsiveClass: true,
                nav: false,
                autoplay: true,
                autoplayTimeout: 4000,
                smartSpeed: 1000,
                navText: ['<i class="lnr lnr-chevron-left"></i>', '<i class="lnr lnr-chevron-right"></i>'],
                responsive: {
                    0: {
                        items: 1,
                    },
                    600: {
                        items: 2
                    },
                    1280: {
                        items: 3
                    },
                    1500: {
                        items: 4
                    }
                }
            });
        },3000)
    }


    render() {

        return (
            <Element name={"gallery_page"}>
                <section className="gallery-area section-padding" id="gallery_page">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 gallery-slider">
                                <div className="gallery-slide owl-carousel owl-theme">
                                        <div className="item"><img src="/images/ios_08020.png" alt=""/></div>
                                        <div className="item"><img src="/images/ios_08021.png" alt=""/></div>
                                        <div className="item"><img src="/images/ios_08022.png" alt=""/></div>
                                        <div className="item"><img src="/images/ios_08023.png" alt=""/></div>
                                        <div className="item"><img src="/images/ios_08024.png" alt=""/></div>
                                        <div className="item"><img src="/images/ios_08020.png" alt=""/></div>
                                        <div className="item"><img src="/images/ios_08021.png" alt=""/></div>
                                        <div className="item"><img src="/images/ios_08022.png" alt=""/></div>
                                        <div className="item"><img src="/images/ios_08023.png" alt=""/></div>
                                        <div className="item"><img src="/images/ios_08024.png" alt=""/></div>

                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-5 col-lg-3">
                                <div className="page-title">
                                    <h5 className="white-color title wow fadeInUp" data-wow-delay="0.2s">Ảnh chụp màn
                                        hình</h5>
                                    <div className="space-10"></div>
                                    <h3 className="white-color wow fadeInUp" data-wow-delay="0.4s">Kết Nối Tài Chính
                                        Hiệu Quả</h3>
                                </div>
                                <div className="space-20"></div>
                                <div className="desc wow fadeInUp" data-wow-delay="0.6s">
                                    <p>Giải pháp tài chính P2P là hình thức cho vay ngang hàng kết nối giữa người có nhu
                                        cầu vay và người cho vay.</p>
                                </div>
                                <div className="space-50"></div>
                                <Link to="/#" className="bttn-default wow fadeInUp" data-wow-delay="0.8s"> Xem thêm </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </Element>
        );
    }
}

export default Testimonial;
