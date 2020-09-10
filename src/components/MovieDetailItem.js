import React from 'react';

function MovieDetailItem(props) {
    return (
        <tr>
            <td className="test1" style={{width: "20%"}}>{props.heading}</td>
            <td className="test1">{props.value}</td>
        </tr>
    );
}

export default MovieDetailItem;