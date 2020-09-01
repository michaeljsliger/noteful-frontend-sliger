import React from 'react';
import {Link} from 'react-router-dom';

function GoBack(props) {
    return (
    <button onClick={() => props.history.goBack()}><div className="go-back-button">{'<<'}</div></button>
    )
}

export default GoBack