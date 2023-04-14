import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import './SpotifyPlayer.css';

function Spotify() {
  const [token, setToken] = useState('');

  useEffect(() => {
    // Fetch Spotify API token and update the token state
    const fetchToken = async () => {
      const response = await fetch('/spotify_token');
      const data = await response.json();
      setToken(data.access_token);
    };
    fetchToken();
  }, []);

  const trackUri = 'spotify:track:3n3Ppam7vgaVa1iaRUc9Lp';

  return (
    <div className="spotify-player">
      <h2 className="title">Listen to my music on Spotify</h2>
      <SpotifyPlayer
        token={token}
        uris={[trackUri]}
        styles={{
          activeColor: '#1DB954',
          bgColor: '#282828',
          color: '#fff',
          loaderColor: '#1DB954',
          sliderColor: '#1DB954',
          trackArtistColor: '#ccc',
          trackNameColor: '#fff',
        }}
      />
    </div>
  );
}

export default Spotify;
