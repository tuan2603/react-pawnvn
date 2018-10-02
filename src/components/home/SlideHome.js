import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autoBind from "react-autobind";
import {bindActionCreators} from "redux";
import * as adverActions from "../../actions/adverActions";
import {connect} from "react-redux";
import './SlideHome.css';
import * as config from "../../utils";

const $ = window.jQuery

class ItemSlide extends Component {
    render() {
        let {advertise, index} = this.props;
        return (
            <div className="item">
                <img className="d-block w-100"
                     src={`${config.apiUrl}/uploads/advertises/${advertise.url_image}`}
                     alt={`${index}`}/>
            </div>
        )
    }
}

class CarouselPage extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
        // $(".banner").owlCarousel({
        //     loop: true,
        //     margin: 0,
        //     nav: true,
        //     autoplay: true,
        //     autoplayTimeout: 4000,
        //     smartSpeed: 1000,
        // });

        $('.team-slide').owlCarousel({
            loop: true,
            margin: 0,
            responsiveClass: true,
            nav: true,
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
                1000: {
                    items: 3
                }
            }
        });

    }

    render() {
        let {advertises} = this.props;
        if (advertises.length > 0) {
            return (
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="banner owl-carousel owl-theme">
                                    {
                                        advertises.map((adv, i) => {
                                            return (
                                                <div className="banner-item"
                                                     style={{backgroundImage: `url(${config.apiUrl}/uploads/advertises/${adv.url_image})`}}>
                                                    <div className="banner-data">
                                                        <h1>Hi, I am HabibPro</h1>
                                                        <p>UI/UX Designer</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
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
                                    <div className="team-slide">
                                        <div className="team-box">
                                            <div className="team-image">
                                                <img src="images/team-1.png" alt=""/>
                                            </div>
                                            <h4>Ashekur Rahman</h4>
                                            <h6 className="position">Art Dirrector</h6>
                                            <p>Lorem ipsum dolor sit amet, conseg sed do eiusmod temput laborelaborus ed
                                                sed do eiusmod tempo.</p>
                                            <div className="team-image">
                                                <img src="images/team-1.png" alt=""/>
                                            </div>
                                            <h4>Ashekur Rahman</h4>
                                            <h6 className="position">Art Dirrector</h6>
                                            <p>Lorem ipsum dolor sit amet, conseg sed do eiusmod temput laborelaborus ed
                                                sed do eiusmod tempo.</p>
                                            <div className="team-image">
                                                <img src="images/team-1.png" alt=""/>
                                            </div>
                                            <h4>Ashekur Rahman</h4>
                                            <h6 className="position">Art Dirrector</h6>
                                            <p>Lorem ipsum dolor sit amet, conseg sed do eiusmod temput laborelaborus ed
                                                sed do eiusmod tempo.</p>
                                            <div className="team-image">
                                                <img src="images/team-1.png" alt=""/>
                                            </div>
                                            <h4>Ashekur Rahman</h4>
                                            <h6 className="position">Art Dirrector</h6>
                                            <p>Lorem ipsum dolor sit amet, conseg sed do eiusmod temput laborelaborus ed
                                                sed do eiusmod tempo.</p>
                                            <div className="team-image">
                                                <img src="images/team-1.png" alt=""/>
                                            </div>
                                            <h4>Ashekur Rahman</h4>
                                            <h6 className="position">Art Dirrector</h6>
                                            <p>Lorem ipsum dolor sit amet, conseg sed do eiusmod temput laborelaborus ed
                                                sed do eiusmod tempo.</p>
                                            <div className="team-image">
                                                <img src="images/team-1.png" alt=""/>
                                            </div>
                                            <h4>Ashekur Rahman</h4>
                                            <h6 className="position">Art Dirrector</h6>
                                            <p>Lorem ipsum dolor sit amet, conseg sed do eiusmod temput laborelaborus ed
                                                sed do eiusmod tempo.</p>
                                            <div className="team-image">
                                                <img src="images/team-1.png" alt=""/>
                                            </div>
                                            <h4>Ashekur Rahman</h4>
                                            <h6 className="position">Art Dirrector</h6>
                                            <p>Lorem ipsum dolor sit amet, conseg sed do eiusmod temput laborelaborus ed
                                                sed do eiusmod tempo.</p>
                                            <div className="team-image">
                                                <img src="images/team-1.png" alt=""/>
                                            </div>
                                            <h4>Ashekur Rahman</h4>
                                            <h6 className="position">Art Dirrector</h6>
                                            <p>Lorem ipsum dolor sit amet, conseg sed do eiusmod temput laborelaborus ed
                                                sed do eiusmod tempo.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*<header className="slide-area">*/}
                    {/*<div className="row">*/}
                    {/*<div className="col-xs-12">*/}
                    {/*<div id="owl-demo" className="owl-carousel">*/}
                    {/*{*/}
                    {/*advertises.map((adv, i) => <ItemSlide advertise={adv} index={i} key={adv._id}/>)*/}
                    {/*}*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    {/*</header>*/}

                </div>
            );
        } else {
            return (
                <div>
                </div>)
        }


    }
}

CarouselPage.propTypes = {
    advertises: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
    if (state.advers) {
        return {
            advertises: state.advers
        };
    } else {
        return {
            advertises: []
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(adverActions, dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(CarouselPage);