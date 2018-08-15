import React, {Component} from 'react';
import './Profile.css';
import {DocumentPage} from '../contact';
import {title} from '../../utils';

class Contact extends Component {
    componentDidMount() {
        document.title = `${title} - Thông tin người dùng`
    }
    render() {
        return (
            <div>
                <DocumentPage/>
            </div>
        );
    }
}

export default Contact;
