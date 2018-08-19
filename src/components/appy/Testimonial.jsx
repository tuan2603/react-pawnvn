import React from 'react';
import autoBind from "react-autobind";
import Slider from "react-slick";
import "./Testimonial.css";

class Testimonial extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            settings : {
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
            }
        }
        autoBind(this);
    }

    next() {
        this.slider.slickNext();
    }

    previous() {
        this.slider.slickPrev();
    }



    render() {
        let { settings } = this.state;

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
        );
    }
}

export default Testimonial;
