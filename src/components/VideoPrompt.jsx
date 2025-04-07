import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const VideoPrompt = ({ videos, onVideoSelect, timeRemaining }) => {
    const [isPulsing, setIsPulsing] = useState(false);

    useEffect(() => {
        if (timeRemaining <= 4) {
            setIsPulsing(true);
        }

        if (timeRemaining <= 0) {
            const randomIndex = Math.floor(Math.random() * videos.length);
            onVideoSelect(videos[randomIndex].src);
        }
    }, [timeRemaining, videos, onVideoSelect]);

    const containerVariants = {
        hidden: { opacity: 0, y: 100 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                staggerChildren: 0.1,
            },
        },
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
            },
        },
        hover: {
            scale: 1.05,
            backgroundColor: "rgba(255, 108, 108, 0.9)",
            y: -5,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
        tap: { scale: 0.95, y: 0 },
    };

    return (
        <motion.div
            className="prompt-container"
            variants={containerVariants}
            initial="hidden"
            animate="show"
        >
            <motion.div
                className="timer"
                animate={{ scale: timeRemaining <= 4 ? [1, 1.2, 1] : 1 }}
                transition={{
                    repeat: timeRemaining <= 4 ? Infinity : 0,
                    duration: 0.5,
                }}
            >
                {Math.ceil(timeRemaining)}s
            </motion.div>
            {videos.map((video) => (
                <motion.button
                    key={video.id}
                    className="modern-button"
                    onClick={() => onVideoSelect(video.src)}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    {video.title}
                </motion.button>
            ))}
        </motion.div>
    );
};

VideoPrompt.propTypes = {
    videos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            src: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
    onVideoSelect: PropTypes.func.isRequired,
    timeRemaining: PropTypes.number.isRequired,
};

export default VideoPrompt;
