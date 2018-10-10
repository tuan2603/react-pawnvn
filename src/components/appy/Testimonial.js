import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autoBind from "react-autobind";
import {bindActionCreators} from "redux";
import * as testimonialActions from "../../actions/testimonialActions";
import {connect} from "react-redux";
import "./Testimonial.css";
import * as config from "../../utils";

const  $ = window.jQuery;

class TestimonialItem extends Component {
    render() {
        let {testimonial} = this.props;
        return (
            <div className="team-box">
                <div className="team-image">
                    <img src={`${config.apiUrl}/uploads/testimonials/${testimonial.avatarLink}`} alt={testimonial.full_name} />
                </div>
                <h4>{testimonial.full_name}</h4>
                {/*<h6 className="position">Art Dirrector</h6>*/}
                <p>{testimonial.content}</p>
            </div>
        )
    }
}

class Testimonial extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            testimonials: this.props.testimonials
        }
    }

    componentDidMount(){
        if (this.state.testimonials.length === 0) {
            this.props.actions.loadTestimonial();
            setTimeout(() => {
                this.setState({testimonials: [...this.props.testimonials]});
            },1000)
        }

        setTimeout(()=> {
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
        },4000)
    }


    render() {
        let {testimonials} = this.state;
        if (testimonials.length > 0) {
        return (
            <section className="testimonial-area" id="testimonial_page">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="page-title text-center">
                                <h5 className="title">lời Chứng Thực</h5>
                                <h3 className="dark-color">Khách Hàng đã yêu thích Chúng tôi</h3>
                                <div className="space-60"></div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-12">
                            <div className="team-slide owl-carousel owl-theme">
                                {
                                    testimonials.map((testimonial, index) => {
                                        return (
                                            <TestimonialItem  testimonial={testimonial}  key={index}/>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
        } else
        return (
            <section className="testimonial-area" id="testimonial_page">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="page-title text-center">
                                <h5 className="title">lời Chứng Thực</h5>
                                <h3 className="dark-color">Khách Hàng đã yêu thích Chúng tôi</h3>
                                <div className="space-60"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

Testimonial.propTypes = {
    testimonials: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
    if (state.testimonials) {
        return {
            testimonials: state.testimonials
        };
    } else {
        return {
            testimonials: []
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(testimonialActions, dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(Testimonial);
