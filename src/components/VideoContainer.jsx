import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import VideoPrompt from "./VideoPrompt";
import videos from "../data/videos";

const VideoContainer = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [showPrompt, setShowPrompt] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(10);

    const currentVideo = videos[currentVideoIndex];
    const choices = videos.filter((video) =>
        currentVideo.choices.includes(video.id)
    );

    const handleTimeUpdate = ({ currentTime, duration }) => {
        const timeToEnd = duration - currentTime;
        const shouldShowPrompt =
            currentVideo.choices.length > 0 &&
            timeToEnd <= (currentVideo.promptStart || 10);

        if (shouldShowPrompt && !showPrompt) {
            setShowPrompt(true);
        }
        if (showPrompt) {
            setTimeRemaining(timeToEnd);
        }
    };

    const handleVideoSelect = (selectedSrc) => {
        const newIndex = videos.findIndex((video) => video.src === selectedSrc);
        const selectedVideo = videos[newIndex];

        setCurrentVideoIndex(newIndex);
        setStartTime(0);
        setShowPrompt(false);

        if (selectedVideo.loopbackTo) {
            const { videoId, timestamp } = selectedVideo.loopbackTo;
            setTimeout(() => {
                setCurrentVideoIndex(videoId - 1);
                setStartTime(timestamp);
            }, 0);
        }
    };

    return (
        <div className="video-container">
            <VideoPlayer
                src={currentVideo.src}
                startTime={startTime}
                onEnded={() => setShowPrompt(true)}
                onTimeUpdate={handleTimeUpdate}
            />
            {showPrompt && choices.length > 0 && (
                <VideoPrompt
                    videos={choices}
                    onVideoSelect={handleVideoSelect}
                    timeRemaining={timeRemaining}
                />
            )}
        </div>
    );
};

export default VideoContainer;
