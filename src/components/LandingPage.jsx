import { useState } from "react";
import "../styles/LandingPage.css";

const LandingPage = ({ onStart }) => {
    const [fadeOut, setFadeOut] = useState(false);

    const handleStart = () => {
        setFadeOut(true);
        setTimeout(onStart, 1000);
    };

    return (
        <div className={`landing-page ${fadeOut ? "fade-out" : ""}`}>
            <h1>SYNAPSE</h1>
            <button onClick={handleStart}>BEGIN</button>
        </div>
    );
};

export default LandingPage;
