import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

//This class will be used as the initial welcoming screen
export class Welcome extends React.Component {
    render() {
        return (
            <div>
            <h1>Welcome to my app</h1>
            <h2>Front Page of App.</h2>
            </div>
        );
    }
}