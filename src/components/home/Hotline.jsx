import React, {Component} from 'react';
import "./Hotline.css";


class Hotline extends Component {

    render() {
        return (
            <div className="hotline-area  phonering-alo-phone phonering-alo-green phonering-alo-show"
                 id="phonering-alo-phoneIcon"
                 style={{left: "0px", bottom: "200px", position: "fixed"}}>
                <div className="phonering-alo-ph-circle"></div>
                <div className="phonering-alo-ph-circle-fill"></div>
                <a href="tel:+84 938 950 407"> </a>
                <div className="phonering-alo-ph-img-circle">
                    <a href="tel:+84 938 950 407"> </a>
                    <a href="tel:+84 938 950 407" className="pps-btn-img " title="Liên h?">
                        <img src="/images/v8TniL3.png" alt="Liên h?" width="50"/>
                    </a>
                </div>
            </div>
        )
    }
}

export default Hotline;