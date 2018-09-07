import React, {Component} from 'react';
import OwlCarousel from 'react-owl-carousel2';

import './SlideHome.css';
import * as config from "../../utils";

class CarouselPage extends Component {
    render() {

        let rows = [];
        for (let i = 0; i < 4; i++) {
            rows.push(
                <div className="team-box" key={i}>
                    <div className="view">
                        <img className="d-block w-100"
                             src={`${config.apiUrl}/uploads/advertises/33f12be2ca532b0d7242.jpg`}
                             alt="First slide"/>
                    </div>
                    {/*<div className="carousel-caption-custom">*/}
                        {/*<h1>Light mask</h1>*/}
                        {/*<p>First text</p>*/}
                    {/*</div>*/}
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
                                    {rows}
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