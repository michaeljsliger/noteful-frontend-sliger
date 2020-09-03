import React from 'react';

function ErrorForm(props) {
    if (props.error) {
        return (
            <div className="error">{props.error}</div>
        )
    } else {
        return (
            <></>
        )
    }
}

export default ErrorForm;
