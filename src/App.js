import React, { Component } from 'react';
import './App.css';

//importing our components
import { AddPlaylist } from './components/addPlaylist';
import { ShowPlaylists } from './components/showPlaylists';
import { Welcome } from './components/welcome';
import { EditPlaylist } from './components/editPlaylist';
//importing bootstrap, router and other
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="App" >

        {/* Using botstraps navbar */}  
        <Navbar bg="dark" variant="dark"  expand="lg">
          <Container fluid >
            <Navbar.Brand href="#">Music Playlists</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/showPlaylists">Playlists</Nav.Link>
                <Nav.Link href="/addPlaylist">New Playlist</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <br />
        {/* Using the router to switch components from react-router-dom V6 */}
        <Router>
          <Routes>
            <Route exact path="/" element={<Welcome />} />
            <Route exact path="/showPlaylists" element={<ShowPlaylists />} />
            <Route exact path="/addPlaylist" element={<AddPlaylist />} />
            <Route exact path="/editPlaylist/:id" element={<EditPlaylist/>}></Route>
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
