import React, {Component} from 'react';
import './Contact.css';

class Contact extends Component {
    render() {
        return (
            <div>
                <div className="main-contact">
                    <div className="form-signin">
                        <div className="form-label-xau">
                            <button className="btn btn-lg btn-primary btn-block" id="mySubmit" type="submit"

                            >Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;
