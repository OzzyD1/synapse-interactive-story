import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

const VideoPlayer = ({ src, onEnded, onTimeUpdate, startTime = 0 }) => {
    const videoRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = startTime;
        }
    }, [src, startTime]);

    const handleError = (e) => {
        setError(
            `Error loading video: ${e.target.error?.message || "Unknown error"}`
        );
    };

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <video
            ref={videoRef}
            src={src}
            controls
            controlsList="nofullscreen"
            autoPlay
            onEnded={onEnded}
            onError={handleError}
            onTimeUpdate={() =>
                onTimeUpdate?.({
                    currentTime: videoRef.current.currentTime,
                    duration: videoRef.current.duration,
                })
            }
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
