import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import './YoutubeVideos.css';

function YoutubeVideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch YouTube API data and update the videos state
    const fetchVideos = async () => {
      const response = await fetch(
        'https://www.googleapis.com/youtube/v3/search?key=YOUR_API_KEY&channelId=CHANNEL_ID&part=snippet,id&order=date&maxResults=9'
      );
      const data = await response.json();
      const items = data.items;
      setVideos(items);
    };
    fetchVideos();
  }, []);

  const opts = {
    height: '360',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <div className="youtube-videos">
      <h2 className="title">Videos</h2>
      <div className="videos-container">
        {videos.map((video) => (
          <div key={video.id.videoId} className="video">
            <YouTube videoId={video.id.videoId} opts={opts} />
            <h3 className="video-title">{video.snippet.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YoutubeVideos;
