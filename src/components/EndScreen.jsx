import { useState } from "react";
import "../styles/EndScreen.css";

const EndScreen = ({ onRestart }) => {
    const [fadeOut, setFadeOut] = useState(false);

    const handleRestart = () => {
        setFadeOut(true);
        setTimeout(onRestart, 1000);
    };

    return (
        <div className={`end-screen ${fadeOut ? "fade-out" : ""}`}>
            <h1>SYNAPSE</h1>
            <p className="end-text">
                He thought he chose. But every step was laid before him —
                crafted not by will, but by design. In chasing freedom, he
                became a function of the machine. The mind obeys, even when it
                believes it’s free.
            </p>
            <button onClick={handleRestart}>RESTART</button>
        </div>
    );
};

export default EndScreen;
