import React from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import {hide_notification} from "../../actions/notifyActions";
import { ToastContainer, toast } from 'react-toastify';


class Notification extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return (
            <div >
                <ToastContainer
                    hideProgressBar={true}
                    newestOnTop={true}
                    autoClose={5000}
                />
            </div>
        );
    }

    componentDidMount() {
        let { dispatch, notification } = this.props;
        if (notification) {
            switch (notification.type) {
                case 'err':
                    toast.error(notification.txt, {
                        position: toast.POSITION.TOP_CENTER
                    });
                    break;
                case 'war':
                    toast.warn(notification.txt, {
                        position: toast.POSITION.TOP_CENTER
                    });
                    break;
                case 'suc':
                    toast.success(notification.txt, {
                        position: toast.POSITION.TOP_CENTER
                    });
                    break;
                case 'inf':
                    toast.info(notification.txt, {
                        position: toast.POSITION.TOP_CENTER
                    });
                    break;
                default:
                    break;
            }

        }
        setTimeout(()=>{
            dispatch(hide_notification());
        },5000);
    }
}

let mapStateToProps = (state) => {
    return {
        notification: state.notifyReducers
    };
};
const connectedApp = connect(mapStateToProps)(Notification);
export {connectedApp as Notification};