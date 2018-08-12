import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ name, onChange, label, value }) => {
    return (
        <div className="form-label-group">
            <input
                type="text"
                name={name}
                placeholder={label}
                defaultValue={value}
                onChange={onChange}
                className="card-number"
            />
        </div>
    );
};

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    value: PropTypes.string
};

export default TextInput;
