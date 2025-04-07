import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { preloader } from "../utils/videoPreloader";
import videos from "../data/videos";

const VideoPlayer = ({
    src,
    onEnded,
    onTimeUpdate,
    startTime = 0,
    objectFit = "contain",
}) => {
    const videoRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = startTime;
        }
    }, [src, startTime]);

    useEffect(() => {
        // Preload next possible videos when current video starts playing
        const currentVideo = videos.find((v) => v.src === src);
        if (currentVideo?.choices?.length > 0) {
            const nextVideos = videos
                .filter((v) => currentVideo.choices.includes(v.id))
                .map((v) => v.src);
            preloader.preloadMultiple(nextVideos);
        }
    }, [src]);

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
            className="video-player"
            ref={videoRef}
            src={src}
            style={{ objectFit }}
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
    objectFit: PropTypes.oneOf(["contain", "cover", "fill"]),
};

export default VideoPlayer;
