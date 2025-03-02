import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

const VideoPlayer = ({ src, onEnded, onTimeUpdate, startTime = 0 }) => {
    const videoRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (videoRef.current) {
            // Use preloaded video if available
            const preloadedVideo =
                window.videoPreloader?.getPreloadedVideo(src);
            if (preloadedVideo) {
                videoRef.current.src = preloadedVideo.src;
            }
            videoRef.current.currentTime = startTime;
        }
    }, [src, startTime]);

    const handleEnded = () => {
        if (onEnded) onEnded();
    };

    const handleError = (e) => {
        setError(`Error loading video: ${e.target.error.message}`);
    };

    const handleTimeUpdate = () => {
        if (onTimeUpdate && videoRef.current) {
            onTimeUpdate({
                currentTime: videoRef.current.currentTime,
                duration: videoRef.current.duration,
            });
        }
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
            controlsList="nofullscreen"
            autoPlay
            onEnded={handleEnded}
            onError={handleError}
            onTimeUpdate={handleTimeUpdate}
        />
    );
};

VideoPlayer.propTypes = {
    src: PropTypes.string.isRequired,
    onEnded: PropTypes.func,
    onTimeUpdate: PropTypes.func,
    startTime: PropTypes.number,
};

export default VideoPlayer;
