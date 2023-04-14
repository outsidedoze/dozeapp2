import React, { useState, useEffect } from 'react';
import './App.css';
import MusicianInfo from './MusicianInfo';
import YouTubeVideos from './YouTubeVideos';
import SpotifyPlayer from './SpotifyPlayer';
import { getYouTubeVideos, getSpotifyPlayer } from './api';

function App() {
  const [videos, setVideos] = useState([]);
  const [spotifyPlayer, setSpotifyPlayer] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    getYouTubeVideos().then(videos => setVideos(videos));
    getSpotifyPlayer().then(player => setSpotifyPlayer(player));
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="App">
      <header className="Header">
        <button className="MenuButton" onClick={toggleMenu}>
          <span className="MenuIcon">&#9776;</span>
        </button>
        <h1 className="Title">Musician App</h1>
      </header>
      {menuOpen && (
        <nav className="Nav">
          <button className="CloseButton" onClick={toggleMenu}>
            <span className="CloseIcon">&times;</span>
          </button>
          <ul className="NavList">
            <li className="NavItem">Home</li>
            <li className="NavItem">About</li>
            <li className="NavItem">Contact</li>
          </ul>
        </nav>
      )}
      <MusicianInfo />
      <YouTubeVideos videos={videos} />
      <SpotifyPlayer player={spotifyPlayer} />
    </div>
  );
}

export default App;
