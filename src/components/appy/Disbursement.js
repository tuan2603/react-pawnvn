import React from 'react';
import "./Disbursement.css";

class Disbursement extends React.Component {
    render() {
        return (
            <div>
                <header className="disbursement-area overlay">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="text-center">
                                    <h3 className="title white-color">Tổng số tiền đã được giải ngân: 0000 tỉ 000 đồng</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

export default Disbursement;