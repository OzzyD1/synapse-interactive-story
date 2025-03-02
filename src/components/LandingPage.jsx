import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import videos from "../data/videos";
import VideoPreloader from "../utils/videoPreloader";

const LandingPage = ({ onStart }) => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const videoUrls = videos.map((video) => video.src);
        const preloader = new VideoPreloader(videoUrls);

        preloader
            .preloadVideos((progress) => {
                setProgress(progress);
            })
            .then(() => {
                setIsLoading(false);
                window.videoPreloader = preloader; // Store for global access
            });
    }, []);

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
