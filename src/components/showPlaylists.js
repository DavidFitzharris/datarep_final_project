import React from 'react';
import Playlists from './playlists';
//adding axios for HTTP client
import axios from 'axios';

//This class will be used to display the albums we have added to the app
export class ShowPlaylists extends React.Component {

    state = {
        playlists: []
    }

    //Using Axios 
    //Component life cycle hook
    componentDidMount() {
        axios.get('http://localhost:4000/api/playlists')

            .then(response => {
                this.setState({ playlists: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <h1>Your Playlists</h1>

                <Playlists playlists={this.state.playlists}></Playlists>
            </div>
        );
    }
}

export default ShowPlaylists;