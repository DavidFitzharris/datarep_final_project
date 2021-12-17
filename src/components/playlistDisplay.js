import React from 'react';
import '../App.css';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
//Using for our EditPLaylist class
import {Link} from 'react-router-dom'
//Using the http client
import axios from 'axios'

class PlaylistDisplay extends React.Component {
   
    constructor(){
        super();

        this.clearPlaylist = this.clearPlaylist.bind(this);
    }

    //Deleting playlist
    clearPlaylist(e){
        e.preventDefault();
        console.log("Delete: "+this.props.playlist._id)

        axios.delete("http://localhost:4000/api/playlists/"+this.props.playlist._id)
        .then(()=> {
            //Reloading the page
            window.location.reload();
        })
        .catch();
    }
    
    render() {
        return (
            //Using Bootstrap Cards to display Our playlists
            <div>
                <Card>
                    <Card.Header>{this.props.playlist.Name}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <img src={this.props.playlist.Image} width="150" height="150"></img>
                            <footer>
                                {this.props.playlist.Genre}
                            </footer>
                            <a href={this.props.playlist.Link} class="btn btn-primary">Go To Playlist</a>
                        </blockquote>
                    </Card.Body>
                    {/* Using EditPLaylist Class */}
                    <Link to={"/editPlaylist/" + this.props.playlist._id} className="btn btn-secondary">Edit Playlist</Link>
                    {/* Using our delete method Class */}
                    <Button variant="danger" onClick={this.clearPlaylist}>Delete</Button>
                </Card>
            </div>
        );
    }
}

export default PlaylistDisplay;