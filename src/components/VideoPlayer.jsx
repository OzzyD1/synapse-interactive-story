import { useRef, useState, useEffect } from "react";
import PropTypes from 'prop-types';

const VideoPlayer = ({ src, onEnded, startTime = 0 }) => {
  const videoRef = useRef(null);              // Reference to video DOM element
  const [error, setError] = useState(null);   // Tracks error state

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
    }
  }, [src, startTime]);                       // Runs when src or startTime changes

  const handleEnded = () => {
    if (onEnded) onEnded();                   // Calls parent callback when video ends
  };

  const handleError = (e) => {
    setError(`Error loading video: ${e.target.error.message}`);
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!src) {
    return <div>No video source provided</div>;
  }

  return (
<video 
      ref={videoRef}
      src={src}
      controls
      autoPlay
      onEnded={handleEnded}
      onError={handleError}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
};

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  onEnded: PropTypes.func,
  startTime: PropTypes.number
};

export default VideoPlayer;