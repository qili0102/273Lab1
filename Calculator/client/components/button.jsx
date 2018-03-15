import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
    return (
        <input
            type="button" 
            className={props.type === 'action' ? 'button action-button':'button input-button'}
            onClick={props.handleClick}
            value={props.label}
        />
    );
}

Button.propTypes = {
    type: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
  }

export default Button;