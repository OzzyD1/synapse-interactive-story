import { motion } from "framer-motion";
import PropTypes from "prop-types";

const LandingPage = ({ onStart }) => {
    return (
        <div className="landing-page">
            <h1>Synapse Interactive Story</h1>
            <motion.button
                className="start-button"
                onClick={onStart}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                Start Experience
            </motion.button>
        </div>
    );
};
LandingPage.propTypes = {
    onStart: PropTypes.func.isRequired,
};

export default LandingPage;
