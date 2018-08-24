import React, {Component} from 'react';
import OwlCarousel from 'react-owl-carousel2';

import './SlideHome.css';

class CarouselPage extends Component {
    render() {

        let rows = [];
        for (var i = 1; i < 7; i++) {
            rows.push(
                <div className="team-box" key={i}>
                    <div className="view">
                        <img className="d-block w-100"
                             src="https://mdbootstrap.com/img/Photos/Slides/img%20(68).jpg"
                             alt="First slide"/>
                    </div>
                    <div className="carousel-caption-custom">
                        <h1>Light mask</h1>
                        <p>First text</p>
                    </div>
                </div>
            );
        }

        const options2 = {
            items: 1,
            loop:true,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 1000,
            navText: ['<i class="lnr lnr-chevron-right"></i>', '<i class="lnr lnr-chevron-left"></i>'],
        };

        return (
            <div>
                <header className="slide-area">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="team-slide">
                                <OwlCarousel ref="car" options={options2}>
                                    <div className="team-box" >
                                        <div className="view">
                                            <img className="d-block w-100"
                                                 src="https://mdbootstrap.com/img/Photos/Slides/img%20(68).jpg"
                                                 alt="First slide"/>
                                        </div>
                                        <div className="carousel-caption-custom">
                                            <h1>Light mask</h1>
                                            <p>First text</p>
                                        </div>
                                    </div>
                                    <div className="team-box" >
                                        <div className="view">
                                            <img className="d-block w-100"
                                                 src="https://mdbootstrap.com/img/Photos/Slides/img%20(99).jpg"
                                                 alt="First slide"/>
                                        </div>
                                        <div className="carousel-caption-custom">
                                            <h1>Light mask</h1>
                                            <p>First text</p>
                                        </div>
                                    </div>
                                    <div className="team-box" >
                                        <div className="view">
                                            <img className="d-block w-100"
                                                 src="https://mdbootstrap.com/img/Photos/Slides/img%20(17).jpg"
                                                 alt="First slide"/>
                                        </div>
                                        <div className="carousel-caption-custom">
                                            <h1>Light mask</h1>
                                            <p>First text</p>
                                        </div>
                                    </div>
                                    <div className="team-box" >
                                        <div className="view">
                                            <img className="d-block w-100"
                                                 src="https://mdbootstrap.com/img/Photos/Slides/img%20%28143%29.jpg"
                                                 alt="First slide"/>
                                        </div>
                                        <div className="carousel-caption-custom">
                                            <h1>Light mask</h1>
                                            <p>First text</p>
                                        </div>
                                    </div>
                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </header>


            </div>
        );
    }
}

export default CarouselPage;