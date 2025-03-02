import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import videos from "../data/videos";
import VideoPreloader from "../utils/videoPreloader";

const LandingPage = ({ onStart }) => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const videoUrls = videos.map((video) => video.src);
        console.log("Starting video preload for URLs:", videoUrls);
        const preloader = new VideoPreloader(videoUrls);

        preloader
            .preloadVideos((progress) => {
                console.log(`Loading progress: ${Math.round(progress * 100)}%`);
                setProgress(progress);
            })
            .then(() => {
                console.log("Video preloading complete");
                setIsLoading(false);
                window.videoPreloader = preloader; // Store for global access
            })
            .catch((err) => {
                console.error("Video preloading failed:", err);
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    if (error) {
        return (
            <div className="landing-page">
                <h1>Synapse Interactive Story</h1>
                <div className="error-message">
                    <p>Failed to load videos. Please refresh the page.</p>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="landing-page">
            <h1>Synapse Interactive Story</h1>
            {isLoading ? (
                <div className="loading-container">
                    <div className="progress-bar">
                        <motion.div
                            className="progress-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress * 100}%` }}
                        />
                    </div>
                    <p>{Math.round(progress * 100)}% loaded</p>
                </div>
            ) : (
                <motion.button
                    className="start-button"
                    onClick={onStart}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Start Experience
                </motion.button>
            )}
        </div>
    );
};

export default LandingPage;
