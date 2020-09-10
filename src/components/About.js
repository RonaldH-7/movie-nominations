import React from 'react';

class About extends React.Component {
    render() {
        return (
            <div className="about-container">
                <h2>About</h2>
                <p>
                    This website uses the <a href="http://www.omdbapi.com/" target="_blank" rel="noopener noreferrer">OMDb API</a> to allow you to save your favourite films that you feel deserve a nomination. 
                    You can select up to five nominees.
                </p>
                <p>
                    This website was developed using React. It showcases my ability to develop using web technologies like React, JavaScript, HTML, and CSS.
                </p>
            </div>
        );
    }
}

export default About;