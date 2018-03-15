import React from 'react';
import ScreenRow from './screenRow';
import PropTypes from 'prop-types';

const Screen = (props) => {
    return(
        <div className="screen">
            <ScreenRow value={props.equation} />
            <ScreenRow value={props.result} />
        </div>
    );
}

Screen.propTypes={
    equation: PropTypes.string.isRequired,
    result: PropTypes.string.isRequired
}

export default Screen;