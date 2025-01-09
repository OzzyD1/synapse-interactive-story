import { useRef, useState, useEffect } from "react";
import PropTypes from 'prop-types';

const VideoPlayer = ({ src, onEnded, startTime = 0 }) => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
    }
  }, [src, startTime]);

  const handleEnded = () => {
    if (onEnded) onEnded();
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