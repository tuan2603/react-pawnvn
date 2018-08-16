import React from 'react';
import {Footers} from '../../components/footer';
import {title} from '../../utils';
import './Appy.css';
import {
    Carousel,
    CarouselInner,
    CarouselItem,
    Container,
    Row,
    Col,
    Card,
    CardImage,
    CardBody,
    CardTitle,
    CardText,
    Button
} from 'mdbreact';
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

    render() {
        let settings = {
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: true,
        };

        let rows = [];
        for (var i = 1; i < 7; i++) {
            rows.push(

                        <Col md="12"  key={i}>
                            <Card>
                                <div className="team-box">
                                    <div className="team-image">
                                        <img src={`/images/team-1.png`} alt=""/>
                                    </div>
                                    <h4>Ashekur Rahman {i}</h4>
                                    <h6 className="position">Art Dirrector</h6>
                                    <p>Lorem ipsum dolor sit amet, conseg sed do eiusmod temput
                                        laborelaborus ed sed
                                        do eiusmod tempo.</p>
                                </div>
                            </Card>
                        </Col>

            );
        }



        return (

            <div>
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
                                <div className="team-slide ">
                                    <Slider ref={slider => (this.slider = slider)} {...settings}>
                                        {rows}
                                    </Slider>
                                </div>
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
