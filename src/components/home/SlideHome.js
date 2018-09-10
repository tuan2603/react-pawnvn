import React, {Component} from 'react';
import OwlCarousel from 'react-owl-carousel2';
import PropTypes from 'prop-types';
import autoBind from "react-autobind";
import {bindActionCreators} from "redux";
import * as adverActions from "../../actions/adverActions";
import {connect} from "react-redux";
import './SlideHome.css';
import * as config from "../../utils";

class CarouselPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            advertises: this.props.advertises
        }
        autoBind(this);
    }

    componentDidMount() {
        if (this.state.advertises.length === 0) {
            this.props.actions.loadAdvertise();
            setTimeout(() => {
                this.setState({advertises: this.props.advertises});
            }, 2000)
        }
    }

    render() {
        let {advertises} = this.state;

        if (advertises.length > 0) {
            const options2 = {
                items: 1,
                loop: true,
                autoplayHoverPause: true,
                nav: true,
                dots: true,
                autoplay: true,
                autoplayTimeout: 4000,
                navText: ['<i class="lnr lnr-chevron-right"></i>', '<i class="lnr lnr-chevron-left"></i>'],
            };
            let row = [];
            advertises.map((adv, i) => {
                row.push(<div className="team-box" key={i}>
                    <div className="view">
                        <img className="d-block w-100"
                             src={`${config.apiUrl}/uploads/advertises/${adv.url_image}`}
                             alt={`${i}`} />
                    </div>
                </div>)
            })
            return (
                <div>
                    <header className="slide-area">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="team-slide">
                                    <OwlCarousel ref="car" options={options2}>
                                        {
                                            row
                                        }
                                    </OwlCarousel>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
            );
        } else {
            return (
                <div>
                    <header className="slide-area">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="team-slide">
                                    <div className="team-box">
                                        <div className="view">
                                            <div className="slide-null"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
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