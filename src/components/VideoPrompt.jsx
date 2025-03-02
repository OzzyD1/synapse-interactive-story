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
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const buttonVariants = {
        hidden: { y: 50, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    };

    const pulseAnimation = isPulsing
        ? {
              scale: [1, 1.1, 1],
              transition: {
                  duration: Math.max(0.5, timeRemaining / 8),
                  repeat: Infinity,
              },
          }
        : {};

    return (
        <motion.div
            className="prompt-container"
            variants={containerVariants}
            initial="hidden"
            animate="show"
        >
            <div className="timer">{Math.ceil(timeRemaining)}s</div>
            {videos.map((video) => (
                <motion.button
                    key={video.id}
                    className="modern-button"
                    onClick={() => onVideoSelect(video.src)}
                    variants={buttonVariants}
                    animate={isPulsing ? pulseAnimation : {}}
                    whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255, 108, 108, 0.51)",
                    }}
                    whileTap={{ scale: 0.95 }}
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
