const API_BASE_URL = 'https://api.spotify.com/v1';

// Replace this with your own Spotify app credentials
const CLIENT_ID = 'cd0be0f52b0d4120bbdd74f50e2a73f6';
const CLIENT_SECRET = 'b253017c5d7e4cd5a53f673480cb2774';

// Replace this with your own YouTube API key
const YOUTUBE_API_KEY = 'AIzaSyCAyW1mF_qOhCZ-WqEzUYePiUc4A4KYlQo';

// Authenticate with the Spotify API using client credentials flow
async function authenticateWithSpotify() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
    },
    body: 'grant_type=client_credentials',
  });
  const data = await response.json();
  return data.access_token;
}

// Search for an artist on Spotify and return their ID
async function searchForArtistId(artistName, accessToken) {
  const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(artistName)}&type=artist`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  const artist = data.artists.items[0];
  return artist.id;
}

// Get the top tracks for a given artist on Spotify
async function getTopTracksForArtist(artistId, accessToken) {
  const response = await fetch(`${API_BASE_URL}/artists/${artistId}/top-tracks?market=US`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  return data.tracks;
}

async function getYouTubeVideos(query) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${YOUTUBE_API_KEY}`);
    const data = await response.json();
    return data.items;
  }
  
async function getSpotifyPlayer(trackId, accessToken) {
    const response = await fetch(`${API_BASE_URL}/tracks/${trackId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data.external_urls.spotify;
  }

module.exports = { authenticateWithSpotify, searchForArtistId, getTopTracksForArtist, getYouTubeVideos, getSpotifyPlayer };
