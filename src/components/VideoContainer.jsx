import { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import VideoPrompt from './VideoPrompt';
import videos from '../data/videos';

const VideoContainer = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);  // Tracks current video
  const [showPrompt, setShowPrompt] = useState(false);           // Controls prompt visibility
  const [startTime, setStartTime] = useState(0);                 // Tracks video timestamp

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
      <VideoPlayer                          // Renders video player component
        src={videos[currentVideoIndex].src} // Current video source
        startTime={startTime}               // Video start time
        onEnded={handleVideoEnded}          // End video callback
      />
      {showPrompt && (                      // Conditional render of prompt
      <VideoPrompt 
        videos={getAvailableChoices()}    // Available video choices
        onVideoSelect={handleVideoSelect} // Selection handler
      />
    )}
  </div>
  );
};

export default VideoContainer;