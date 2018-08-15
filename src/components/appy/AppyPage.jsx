import React from 'react';
import {Footers} from '../../components/footer';
import {title} from '../../utils';
import './Appy.css';
// import { Carousel, CarouselInner, CarouselItem, Container, Row, Col, Card, CardImage, CardBody, CardTitle, CardText, Button } from 'mdbreact';
import { Carousel } from 'react-responsive-carousel';


class AppyPage extends React.Component {

    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.state = {
            activeItem: 1,
            interval: 10000,
            length: 6
        };
    }

    next() {
        let nextItem = this.state.activeItem + 1;
        if (nextItem > this.state.length) {
            this.setState({activeItem: 1});
        } else {
            this.setState({activeItem: nextItem});
        }
    }

    prev() {
        let prevItem = this.state.activeItem - 1;
        if (prevItem < 1) {
            this.setState({activeItem: this.state.length});
        } else {
            this.setState({activeItem: prevItem});
        }
    }

    goToIndex(item) {
        if (this.state.activeItem !== item) {
            this.setState({
                activeItem: item
            });
        }
    }


    componentDidMount() {
        document.title = `${title} - Trang chủ`;

    }


    render() {
        const {activeItem} = this.state;
        let rows = [];
        // for (var i = 1; i < 7; i++) {
        //     rows.push(
        //         <CarouselItem itemId={i} key={i}>
        //         <Col md="4">
        //             <div className="team-box">
        //                 <div className="team-image">
        //                     <img src={`/images/team-1.png`} alt=""/>
        //                 </div>
        //                 <h4>Ashekur Rahman {i}</h4>
        //                 <h6 className="position">Art Dirrector</h6>
        //                 <p>Lorem ipsum dolor sit amet, conseg sed do eiusmod temput
        //                     laborelaborus ed sed
        //                     do eiusmod tempo.</p>
        //             </div>
        //         </Col>
        //     </CarouselItem>
        //     );
        // }


        return (
            <div>
                <section className="testimonial-area" id="testimonial_page">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="page-title text-center">
                                    <h5 className="title">Testimonials</h5>
                                    <h3 className="dark-color">Our Client Loves US</h3>
                                    <div className="space-60"></div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-12">
                                <div className="team-slide ">
                                   
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
