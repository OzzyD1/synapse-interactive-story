import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import VideoPrompt from "./VideoPrompt";
import videos from "../data/videos";

const VideoContainer = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [showPrompt, setShowPrompt] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [pendingLoopback, setPendingLoopback] = useState(null);

    const getAvailableChoices = () => {
        const currentVideo = videos[currentVideoIndex];
        return videos.filter((video) =>
            currentVideo.choices.includes(video.id)
        );
    };

    const handleVideoEnded = () => {
        if (pendingLoopback) {
            // Apply pending loopback transition
            setCurrentVideoIndex(pendingLoopback.videoId - 1);
            setStartTime(pendingLoopback.timestamp);
            setPendingLoopback(null);
        } else {
            setShowPrompt(true);
        }
    };

    const handleVideoSelect = (selectedSrc) => {
        const selectedVideo = videos.find((video) => video.src === selectedSrc);
        const newIndex = videos.findIndex((video) => video.src === selectedSrc);

        // Always play the selected video immediately
        setCurrentVideoIndex(newIndex);
        setStartTime(0);
        setShowPrompt(false);

        // Store loopback information if it exists
        if (selectedVideo.loopbackTo) {
            setPendingLoopback(selectedVideo.loopbackTo);
        } else {
            setPendingLoopback(null);
        }
    };

    return (
        <div className="video-container">
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
