import React from 'react';
import PropTypes from 'prop-types';
import autoBind from "react-autobind";

class CheckInput extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        let { name, label, onChange } = this.props;
        
        return (
                <div >
                    <input
                        type="checkbox"
                        id={name}
                        name={name}
                        placeholder={label}
                    />
                </div>
                
        );
    };
}
CheckInput.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
};

export default CheckInput;
