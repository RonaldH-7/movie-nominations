import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function Loading() {
    return (
        <div className="loading">
            <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        <h1 style={{display: "inline-block"}}>&nbsp;Loading</h1>
    </div>
    );
}

export default Loading;