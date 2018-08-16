import React from 'react';
import {Footers} from '../../components/footer';
import {title} from '../../utils';
import './Appy.css';
import {NavLink} from "react-router-dom";
import autoBind from "react-autobind";
import Slider from "react-slick";


class AppyPage extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }


    componentDidMount() {
        document.title = `${title} - Trang chủ`;

    }

    next() {
        this.slider.slickNext();
    }

    previous() {
        this.slider.slickPrev();
    }

    render() {
        let settings = {
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            responsiveClass: true,
            centerPadding: '50px',
            autoplaySpeed: 4000,
            arrows: false,
            infinite: true,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        let settings2 = {
            dots: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 4000,
            arrows: false,
            infinite: true,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 1500,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 1280,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 760,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        };

        let rows = [];
        for (var i = 1; i < 7; i++) {
            rows.push(
                <div className="team-box" key={i}>
                    <div className="team-image">
                        <img src={`/images/team-1.png`} alt=""/>
                    </div>
                    <h4>Ashekur Rahman {i}</h4>
                    <h6 className="position">Art Dirrector</h6>
                    <p>Lorem ipsum dolor sit amet, conseg sed do eiusmod temput
                        laborelaborus ed sed
                        do eiusmod tempo.</p>
                </div>
            );
        }


        return (

            <div data-spy="scroll" data-target=".mainmenu-area">
                <section className="testimonial-area" id="testimonial_page">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="page-title text-center">
                                    <h5 className="title">Testimonials</h5>
                                    <h3 className="dark-color">Our Client Loves US</h3>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="team-slide">

                                    <Slider ref={c => (this.slider = c)}  {...settings}>
                                        {rows}
                                    </Slider>
                                    <div className="owl-controls">
                                        <div className="owl-nav">
                                            <div className="owl-prev" onClick={this.previous}><i
                                                className="lnr lnr-chevron-left"></i>
                                            </div>
                                            <div className="owl-next" onClick={this.next}><i
                                                className="lnr lnr-chevron-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <section className="gallery-area section-padding" id="gallery_page">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xs-12 col-sm-7 gallery-slider">
                                <Slider   {...settings2}>
                                    <div className="item"><img src="images/gallery-1.jpg" alt=""/></div>
                                    <div className="item"><img src="images/gallery-2.jpg" alt=""/></div>
                                    <div className="item"><img src="images/gallery-3.jpg" alt=""/></div>
                                    <div className="item"><img src="images/gallery-4.jpg" alt=""/></div>
                                    <div className="item"><img src="images/gallery-1.jpg" alt=""/></div>
                                    <div className="item"><img src="images/gallery-2.jpg" alt=""/></div>
                                    <div className="item"><img src="images/gallery-3.jpg" alt=""/></div>
                                    <div className="item"><img src="images/gallery-1.jpg" alt=""/></div>
                                    <div className="item"><img src="images/gallery-2.jpg" alt=""/></div>
                                    <div className="item"><img src="images/gallery-3.jpg" alt=""/></div>
                                    <div className="item"><img src="images/gallery-4.jpg" alt=""/></div>
                                    <div className="item"><img src="images/gallery-1.jpg" alt=""/></div>
                                    <div className="item"><img src="images/gallery-2.jpg" alt=""/></div>
                                    <div className="item"><img src="images/gallery-3.jpg" alt=""/></div>
                                </Slider>
                            </div>
                            <div className="col-xs-12 col-sm-5 col-lg-3">
                                <div className="page-title">
                                    <h5 className="white-color title wow fadeInUp"
                                        data-wow-delay="0.2s">Screenshots</h5>
                                    <div className="space-10"></div>
                                    <h3 className="white-color wow fadeInUp" data-wow-delay="0.4s">Screenshot 01</h3>
                                </div>
                                <div className="space-20"></div>
                                <div className="desc wow fadeInUp" data-wow-delay="0.6s">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiing elit, sed do eiusmod tempor
                                        incididunt ut labore et laborused sed do eiusmod tempor incididunt ut labore et
                                        laborused.</p>
                                </div>
                                <div className="space-50"></div>
                                <a href="#" className="bttn-default wow fadeInUp" data-wow-delay="0.8s">Learn More</a>
                            </div>
                        </div>
                    </div>
                </section>
                <Footers/>
            </div>
        );
    }
}

export default AppyPage;
