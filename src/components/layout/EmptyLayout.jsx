import React, {Component} from 'react';

class EmptyLayout extends Component {
    render() {
        const {children} = this.props;
        return (
            <div className="sufee-login d-flex align-content-center flex-wrap">

                {children}

            </div>
        );
    }
}

export default EmptyLayout;
