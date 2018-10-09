import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autoBind from "react-autobind";
import {bindActionCreators} from "redux";
import * as adverActions from "../../actions/adverActions";
import {connect} from "react-redux";
import './SlideHome.css';
import * as config from "../../utils";

const $ = window.jQuery;

class ItemSlide extends Component {
    render() {
        let {advertise, index} = this.props;
        return (
            <div className="item" >
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

        setTimeout(()=>{
            $(".slider-image").owlCarousel({
                loop: true,
                margin: 0,
                items:1,
                nav: true,
                autoplay: true,
                autoplayTimeout: 4000,
                navText: ['<i class="lnr lnr-chevron-right"></i>', '<i class="lnr lnr-chevron-left"></i>'],
                autoplayHoverPause:true,
            });
        },2000)

    }

    render() {
        let { advertises } = this.props;

        if(advertises.length > 0) {
            return (
                <section className="slide-area" >
                    <div className="slider-image owl-carousel owl-theme">
                        {
                            advertises.map((advertise, index) => {
                                return (
                                    <ItemSlide  advertise={advertise} index={index} key={index}/>
                                )
                            })
                        }
                    </div>
                </section>
            )
        }else{
            return (
                <section className="slide-area" >

                </section>
            )
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