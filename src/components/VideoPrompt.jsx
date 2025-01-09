import { motion } from "framer-motion";

const VideoPrompt = ({ videos, onVideoSelect }) => {
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

    return (
        <motion.div
            className="prompt-container"
            variants={containerVariants}
            initial="hidden"
            animate="show"
        >
            {videos.map((video) => (
                <motion.button
                    key={video.id}
                    className="modern-button"
                    onClick={() => onVideoSelect(video.src)}
                    variants={buttonVariants}
                    whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    {video.title}
                </motion.button>
            ))}
        </motion.div>
    );
};

export default VideoPrompt;
