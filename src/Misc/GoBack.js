import React from 'react';

function GoBack(props) {
    return (
    <button onClick={() => props.history.goBack()}><div className="go-back-button">{'<'}</div></button>
    )
}

export default GoBack