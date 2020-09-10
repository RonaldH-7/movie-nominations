import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

class MovieItem extends React.Component {
    render() {
        // const buttonStyle = {
        //     float: "right",
        //     display: "inline-block"
        // }

        let key = this.props.movie.imdbID;
        let buttonText = this.props.displayNominate ? "Nominate" : "Remove";
        let variant = this.props.displayNominate ? "success" : "danger";
        let button = this.props.displayNominate ? 
            <Button className="movie-item-button" variant={variant} size="sm" onClick={() => {this.props.handleClick(key)}} disabled={this.isNominated()} block={false} >{buttonText}</Button> : 
            <Button className="movie-item-button" variant={variant} size="sm" onClick={() => {this.props.handleClick(key)}} block={false} >{buttonText}</Button>
        
        return (
            <ListGroup.Item className="movie-item" variant="flush">
                <Link className="movie-item-link" to={`/detail/${key}`}>
                    {/* {this.props.movie.Title} */}
                    {`${this.props.movie.Title} (${this.props.movie.Year})`}
                </Link>
                {button}
            </ListGroup.Item>
        );
    }

    isNominated() {
        let nominations = this.props.nominations;
        for (let i = 0; i < nominations.length; i++) {
            if (nominations[i].imdbID === this.props.movie.imdbID) {
                return true;
            }
        }
        return false;
    }
}

export default MovieItem;