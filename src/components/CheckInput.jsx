import React from 'react';
import PropTypes from 'prop-types';
import autoBind from "react-autobind";

class CheckInput extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        let { item, handleChange } = this.props;
        
        return (
                <div >
                    <input
                        type="checkbox"
                        name={item.name}
                        value={item._id}
                        checked={item.checked}
                        onChange={handleChange}
                    />
                </div>
                
        );
    };
}
CheckInput.propTypes = {
    item: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default CheckInput;
