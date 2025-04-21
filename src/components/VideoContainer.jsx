import { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import VideoPrompt from "./VideoPrompt";
import EndScreen from "./EndScreen";
import FinalEndScreen from "./FinalEndScreen";
import videos from "../data/videos";
import { preloader } from "../utils/videoPreloader";

const VideoContainer = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [showPrompt, setShowPrompt] = useState(false);
    const [showEndScreen, setShowEndScreen] = useState(false);
    const [showFinalEnd, setShowFinalEnd] = useState(null);
    const [startTime, setStartTime] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(10);

    useEffect(() => {
        const firstVideo = videos[0];
        preloader.preload(firstVideo.src).then(() => {
            const nextChoices = videos
                .filter((v) => firstVideo.choices.includes(v.id))
                .map((v) => v.src);
            preloader.preloadMultiple(nextChoices);
        });
    }, []);

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

        if (selectedVideo.loopbackTo && !selectedVideo.loopbackDelay) {
            const { videoId, timestamp } = selectedVideo.loopbackTo;
            setTimeout(() => {
                setCurrentVideoIndex(videoId - 1);
                setStartTime(timestamp);
            }, 0);
        }
    };

    const handleVideoEnded = () => {
        const video = videos[currentVideoIndex];
        if (video.src === "videos/promotion-arc/act3-2-5-promotion.mp4") {
            setShowEndScreen(true);
            return;
        }
        if (video.src === "videos/discovery-arc/act5-leave.mp4") {
            setShowFinalEnd("leave");
            return;
        }
        if (video.src === "videos/discovery-arc/act5-stay.mp4") {
            setShowFinalEnd("stay");
            return;
        }
        if (video.loopbackTo && video.loopbackDelay) {
            const { videoId, timestamp } = video.loopbackTo;
            setCurrentVideoIndex(videoId - 1);
            setStartTime(timestamp);
        } else {
            setShowPrompt(true);
        }
    };

    const handleRestart = () => {
        setCurrentVideoIndex(0);
        setStartTime(0);
        setShowPrompt(false);
        setShowEndScreen(false);
        setShowFinalEnd(null);
    };

    if (showFinalEnd) {
        return <FinalEndScreen type={showFinalEnd} />;
    }

    if (showEndScreen) {
        return <EndScreen onRestart={handleRestart} />;
    }

    return (
        <div className="video-container">
            <VideoPlayer
                src={currentVideo.src}
                startTime={startTime}
                onEnded={handleVideoEnded}
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
