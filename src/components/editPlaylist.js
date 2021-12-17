import React from 'react';
import axios from 'axios';

//Essentially a copy and edit of our AddPlaylist class, to be used to edit documents found by _id
export class EditPlaylist extends React.Component {

    //Using a constructor for our methods
    constructor() {
        super();

        //Binding 
        this.addPLName = this.addPLName.bind(this);
        this.addPLGenre = this.addPLGenre.bind(this);
        this.addPLLink = this.addPLLink.bind(this);
        this.addPLImage = this.addPLImage.bind(this);
        //Submit button 
        this.onSubmit = this.onSubmit.bind(this);

        //Creating the state
        this.state = {
            Name: '',
            Genre: '',
            Link: '',
            Image: ''
        }
    }

    //Methods to be used within the form
    addPLName(e) {
        this.setState({
            Name: e.target.value
        });
    }

    addPLGenre(e) {
        this.setState({
            Genre: e.target.value
        });
    }

    addPLLink(e) {
        this.setState({
            Link: e.target.value
        });
    }

    addPLImage(e) {
        this.setState({
            Image: e.target.value
        });
    }

    //Used with editing Button
    componentDidMount() {

        axios.get('http://localhost:4000/api/playlists/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    _id: response.data._id,
                    Name: response.data.Name,
                    Genre: response.data.Genre,
                    Link: response.data.Link,
                    Image: response.data.Image
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    onSubmit(e) {
        e.preventDefault();
        console.log(`button clicked
        ${this.state.Name},
        ${this.state.Genre},
        ${this.state.Image},
        ${this.state.Link},`);
        this.setState({
            Name: '',
            Genre: '',
            Image: '',
            Link: '',
        })

        //Display inputs back
        alert("Playlist: " + this.state.Name + " Genre: " + this.state.Genre + " Image: " + this.state.Image + " Link: " + this.state.Link);

        //Creating a new playlist to be sent to our server
        const newPlaylist = {
            Name: this.state.Name,
            Genre: this.state.Genre,
            Image: this.state.Image,
            Link: this.state.Link
        };

        //Post Method sending data to our server
        axios.post('http://localhost:4000/api/playlists'+this.state._id, newPlaylist)
            .then(res => console.log(res.data));


    }



    render() {
        return (
            //creating a form to be used with our onSubmit method to search for playlists
            <div className='App'>
                <form onSubmit={this.onSubmit}>

                    {/* Name Input */}
                    <div className="form-group">
                        <label>Playlist Name: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.Name}
                            onChange={this.addPLName}></input>
                    </div>

                    {/* Genre Input */}
                    <div className="form-group">
                        <label>Genre: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.Genre}
                            onChange={this.addPLGenre}></input>
                    </div>

                    {/* Image Input */}
                    <div className="form-group">
                        <label>Image (URL): </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.Image}
                            onChange={this.addPLImage}></input>
                    </div>

                    {/* Link Input */}
                    <div className='form-group'>
                        <label>Link (URl):</label>
                        <input type='text'
                            className='form-control'
                            value={this.state.Link}
                            onChange={this.addPLLink}>
                        </input>
                    </div>

                    {/* Submit Button */}
                    <div className='form-group'>
                        <input type='submit'
                            value='Edit Playlist'
                            className='btn btn-secondary'></input>
                    </div>
                </form>
            </div>
        );
    }
}

export default EditPlaylist;