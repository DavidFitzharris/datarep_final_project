import React from 'react';
import '../App.css';
//Importing Classes
import PlaylistDisplay from './playlistDisplay'

class Playlists extends React.Component {
    render() {
        //Mapping the playlists
        return this.props.playlists.map((playlist) => {
            
            return <PlaylistDisplay playlist={playlist}></PlaylistDisplay>
        });
    }
}
export default Playlists;