import { useState } from "react";
import "../styles/FinalEndScreen.css";

const FinalEndScreen = ({ type }) => {
    const [fadeOut, setFadeOut] = useState(false);

    const messages = {
        leave: "The price of freedom is eternal vigilance. But what good is vigilance when the chains are invisible? He left, carrying the weight of knowledge too heavy to share.",
        stay: "In accepting the system, he found his own truth. The boundaries between reality and simulation blurred, until choice itself became meaningless. Perhaps that was freedom all along.",
    };

    return (
        <div className={`final-end-screen ${fadeOut ? "fade-out" : ""}`}>
            <h1>SYNAPSE</h1>
            <p className="final-end-text">{messages[type]}</p>
        </div>
    );
};

export default FinalEndScreen;
