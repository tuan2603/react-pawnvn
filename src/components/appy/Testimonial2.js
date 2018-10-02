import React from 'react';
import autoBind from "react-autobind";

import "./Testimonial.css";

class Testimonial extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }


    render() {
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
                                <h5 className="title">lời Chứng Thực</h5>
                                <h3 className="dark-color">Khách đã yêu thích Chúng tôi</h3>
                                <div className="space-60"></div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-12">

                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

export default Testimonial;
