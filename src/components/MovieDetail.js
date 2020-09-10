import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'

import MovieDetailItem from './MovieDetailItem';
import Loading from './Loading';

class MovieDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            movieInfo: {},
            poster: {},
            hasPoster: false,
            isLoading: false
        };
    }

    componentDidMount() {
        let imdbID = this.props.match.params.imdbID;
        this.fetchPoster(imdbID);
        this.fetchMovie(imdbID);
    }

    fetchPoster(imdbID) {
        let uri = `https://img.omdbapi.com/?apikey=b49c2121&i=${imdbID}`;
        let encodedURI = encodeURI(uri)

        fetch(encodedURI)
            .then((response) => {
                if (response.status !== 404) {
                    this.setState({
                        poster: response.url,
                        hasPoster: true
                    });
                }
            });
    }

    fetchMovie(imdbID) {
        let uri = `https://www.omdbapi.com/?apikey=b49c2121&i=${imdbID}`;
        let encodedURI = encodeURI(uri)
        
        this.setState({isLoading: true});

        fetch(encodedURI)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    movieInfo: data,
                    isLoading: false
                });
            });
    }

    isNominated() {
        let nominations = this.props.nominations;
        for (let i = 0; i < nominations.length; i++) {
            if (nominations[i].imdbID === this.state.movieInfo.imdbID) {
                return true;
            }
        }
        return false;
    }

    render() {
        let key = this.props.match.params.imdbID;
        let buttonJSX = this.isNominated() ?
            <Button className="movie-detail-button" variant="danger" size="sm" onClick={()=>{this.props.handleRemove(key)}}>Remove</Button> :
            <Button className="movie-detail-button" variant="success" size="sm" onClick={()=>{this.props.handleAdd(key)}}>Nominate</Button>;
        let imageJSX = this.state.hasPoster ? 
            <img src={this.state.poster} alt={`Movie poster for ${this.state.movieInfo.Title}`} style={{marginLeft: "20px"}} /> :
            null;

        let movieDetailJSX = (
            <div className="movie-detail-container">
                <h2 className="movie-detail-title">{this.state.movieInfo.Title}</h2>
                <div className="movie-detail-buttons">
                    <Link to="/">
                        <Button size="sm" className="movie-detail-button">Home</Button>
                    </Link>
                    {buttonJSX}
                </div>
                <Table striped bordered size="sm">
                    <tbody>
                        <MovieDetailItem heading="Year:" value={this.state.movieInfo.Year} />
                        <MovieDetailItem heading="Genre:" value={this.state.movieInfo.Genre} />
                        <MovieDetailItem heading="Rated:" value={this.state.movieInfo.Rated} />
                        <MovieDetailItem heading="Runtime:" value={this.state.movieInfo.Runtime} />
                        <MovieDetailItem heading="Box office:" value={this.state.movieInfo.BoxOffice} />
                        <MovieDetailItem heading="Plot:" value={this.state.movieInfo.Plot} />
                        <MovieDetailItem heading="IMDB Rating:" value={this.state.movieInfo.imdbRating} />
                        <MovieDetailItem heading="IMDB Votes:" value={this.state.movieInfo.imdbVotes} />
                    </tbody>
                </Table>
                {imageJSX}
            </div>
        );

        return (
            <div>
                {
                    this.state.isLoading ?
                        <Loading /> :
                        movieDetailJSX
                }
            </div>
        );
    }
}

export default MovieDetail;