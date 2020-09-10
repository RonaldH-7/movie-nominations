import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { About, AlertDisplay, Contact, Display, Header, MovieDetail, Search} from './components/Components';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            movieResults: [],
            nominations: [],
            search: "",
            searched: false,
            searchedTerm: "",
            error: "",
            showAlert: false,
            showAlertWarning: false,
            isLoading: false
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
    }

    fetchMovies() {
        let uri = `https://www.omdbapi.com/?apikey=b49c2121&type=movie&s=${this.state.search}`;
        let encodedURI = encodeURI(uri)

        this.setState({
            isLoading: true
        });

        fetch(encodedURI)
            .then((response) => {
                this.setState({
                    movieResults: []
                });
                return response.json();
            })
            .then((data) => {
                if (data.Response === "True") {
                    data.Search.forEach((movie) => {
                        this.setState((prevState) => {
                            return {
                                movieResults: [...prevState.movieResults, movie],
                                isLoading: false
                            }
                        });
                    });
                } else {
                    this.setState({
                        error: data.Error,
                        isLoading: false
                    });
                }
            });      
    }

    handleChange(event) {
        let {name, value} = event.target;

        this.setState({
            [name]: value
        });
    }

    handleSearch(event) {
        if (!event || (event && event.keyCode === 13)) {
            this.fetchMovies();
            this.setState((prevState) => {
                return {
                    searched: true,
                    searchedTerm: prevState.search
                }
            });
        }
    }

    handleAdd(key) {
        let targetMovie;

        if (this.state.nominations.length >= 5) {
            this.setState({
                showAlertWarning: true
            });
        } else {
            for (let i = 0; i < this.state.movieResults.length; i++) {
                let currentMovie = this.state.movieResults[i];
                if (key === currentMovie.imdbID) {
                    targetMovie = currentMovie;
                    break;
                }
            }

            this.setState((prevState) => {
                return {
                    nominations: [...prevState.nominations, targetMovie]
                }
            });
        }

        if (this.state.nominations.length === 4) {
            this.setState({
                showAlert: true
            });
        }
    }

    handleRemove(key) {
        let copyState = this.state.nominations.filter((nomination) => {
            if (key !== nomination.imdbID) {
                return true;
            }
            return false;
        });

        this.setState({
            nominations: copyState
        });
    }

    closeAlert(isWarning) {
        let property = "showAlert";

        if (isWarning) {
            property = "showAlertWarning";
        }
        
        this.setState({
            [property]: false
        });
    }

    render() {
        let results = this.state.searched ? 
            `Results for "${this.state.searchedTerm}":` :
            "Search for something!"

        return (
            <div className="app-container">
                <BrowserRouter>
                    <AlertDisplay show={this.state.showAlert} isWarning={false} handleClick={this.closeAlert} />
                    <AlertDisplay show={this.state.showAlertWarning} isWarning={true} handleClick={this.closeAlert} />
                    <Header />
                    <Switch>
                        <Route path="/about" exact component={() => (
                            <About />
                        )} />
                        <Route path="/contact" exact component={() => (
                            <Contact />
                        )} />

                        <Route path="/detail/:imdbID" render={(props) => (
                            <MovieDetail handleAdd={this.handleAdd} handleRemove={this.handleRemove} nominations={this.state.nominations} {...props} />
                        )}/>

                        <Route path="/" component={() => (
                            <div className="app-display-container">
                                <Search handleChange={this.handleChange} handleSearch={this.handleSearch} value={this.state.search}/>
                                <Display title={results} movies={this.state.movieResults} handleClick={this.handleAdd} displayNominate={true} nominations={this.state.nominations} error={this.state.error} isLoading={this.state.isLoading} />
                                <Display title="Current Nominations:" movies={this.state.nominations} handleClick={this.handleRemove} displayNominate={false} nominations={this.state.nominations} error={this.state.error} isLoading={false} />
                            </div>
                        )} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;