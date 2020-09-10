import React from 'react';
import Alert from 'react-bootstrap/Alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

function AlertDisplay(props) {
    let variant = props.isWarning ? "warning" : "success";
    let msg = props.isWarning ?
        "You can't have more than 5 nominations!" :
        "Awesome! You've added your 5 nominations!";
    let className = props.isWarning ? "close-icon-warning" : "close-icon";

    return (
        <Alert show={props.show} variant={variant} >
            <p className="alert-text">{msg}</p>
            <FontAwesomeIcon icon={faWindowClose} size="2x" onClick={() => props.handleClick(props.isWarning)} className={className}/>
        </Alert>
    );
}

export default AlertDisplay;