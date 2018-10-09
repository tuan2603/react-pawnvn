import React from 'react';
import {get_total_amount_disbursed} from '../../helpers';

import "./Disbursement.css";
import autoBind from "react-autobind";

class Disbursement extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            billion: 0,
            million: 0,
            num_contract : 0,
        }
    }

    componentDidMount(){
        get_total_amount_disbursed()
            .then(res=>{
                if(res.response=== true){
                    let { no_contract, imoney } = res.value;

                    let billion = Math.floor(imoney/1000000000);
                    let million =  Math.floor((imoney - billion*1000000000)/1000000);

                    this.setState({billion, million, num_contract: no_contract})

                }
            })
    }

    render() {
        let { billion,
            million,
            num_contract
        } = this.state;

        return (
            <div>
                <header className="disbursement-area overlay">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="text-center">
                                    <h3 className="title white-color">Tổng đơn giải ngân: < {num_contract}</h3>
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="text-center">
                                    <h3 className="title white-color">Tổng số tiền đã được giải ngân: {billion} tỉ {million} đồng</h3>
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