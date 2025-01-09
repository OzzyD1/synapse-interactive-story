import { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import VideoPrompt from './VideoPrompt';
import videos from '../data/videos';

const VideoContainer = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);

  const handleVideoEnded = () => {
    setShowPrompt(true);
  };

  const handleVideoSelect = (selectedSrc) => {
    const newIndex = videos.findIndex(video => video.src === selectedSrc);
    if (newIndex !== -1) {
      setCurrentVideoIndex(newIndex);
      setShowPrompt(false);
    }
  };

  return (
    <div>
      <VideoPlayer 
        src={videos[currentVideoIndex].src} 
        onEnded={handleVideoEnded} 
      />
      {showPrompt && (
        <VideoPrompt 
          videos={videos} 
          onVideoSelect={handleVideoSelect} 
        />
      )}
    </div>
  );
};

export default VideoContainer;