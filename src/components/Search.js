import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class Search extends React.Component {
    componentDidMount(){
        this.nameInput.focus(); 
     }

    render() {
        return (
            <Form className="search-component" onSubmit={(event) => {event.preventDefault()}}>
                <p className="search-description"><strong>Search by movie title:</strong></p>
                    <div className="search-component-flex">
                        <Button 
                                className="search-button"
                                onClick={() => {this.props.handleSearch()}}
                                size="sm"
                            >
                            <FontAwesomeIcon className="search-button-icon" icon={faSearch}></FontAwesomeIcon>
                        </Button>
                        <Form.Control
                            className="search" 
                            type="text" 
                            placeholder="Search..." 
                            name="search"
                            size="sm"
                            value={this.props.value} 
                            onChange={(event) => {this.props.handleChange(event)}}
                            onKeyDown={(event) => {this.props.handleSearch(event)}}
                            ref={(input) => {this.nameInput = input;}}
                        />
                    </div>
            </Form>
        );
    }
}

export default Search;