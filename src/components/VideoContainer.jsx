import { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import VideoPrompt from './VideoPrompt';
import videos from '../data/videos';

const VideoContainer = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [startTime, setStartTime] = useState(0);

  const getAvailableChoices = () => {
    const currentVideo = videos[currentVideoIndex];
    return videos.filter(video => currentVideo.choices.includes(video.id));
  };

  const handleVideoEnded = () => {
    setShowPrompt(true);
  };

  const handleVideoSelect = (selectedSrc) => {
    const selectedVideo = videos.find(video => video.src === selectedSrc);
    if (selectedVideo.loopbackTo) {
      setCurrentVideoIndex(selectedVideo.loopbackTo.videoId - 1);
      setStartTime(selectedVideo.loopbackTo.timestamp);
    } else {
      const newIndex = videos.findIndex(video => video.src === selectedSrc);
      setCurrentVideoIndex(newIndex);
      setStartTime(0);
    }
    setShowPrompt(false);
  };

  return (
    <div>
      <VideoPlayer 
        src={videos[currentVideoIndex].src}
        startTime={startTime}
        onEnded={handleVideoEnded} 
      />
      {showPrompt && (
        <VideoPrompt 
          videos={getAvailableChoices()} 
          onVideoSelect={handleVideoSelect} 
        />
      )}
    </div>
  );
};

export default VideoContainer;