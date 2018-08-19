import React, {Component} from 'react';
import './Contact.css';
import {DocumentPage} from '../contact';
import {title} from '../../utils';

class Contact extends Component {
    componentDidMount() {
        document.title = `${title} - Thông tin người dùng`
    }

    render() {
        return (
            <div className="contact-main">
                <header className="site-header">

                </header>
                <div className="subscribe-area section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                                <div className="subscribe-form text-center">
                                    <h3 className="blue-color"> Thông tin Doanh nghiệp </h3>
                                    <div className="space-20"></div>
                                    <DocumentPage/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;
