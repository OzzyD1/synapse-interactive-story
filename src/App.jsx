import { useState } from "react";
import LandingPage from "./components/LandingPage";
import VideoContainer from "./components/VideoContainer";
import "./styles/main.css";

function App() {
    const [isStarted, setIsStarted] = useState(false);

    return (
        <div className="app">
            {!isStarted ? (
                <LandingPage onStart={() => setIsStarted(true)} />
            ) : (
                <VideoContainer />
            )}
        </div>
    );
}

export default App;
