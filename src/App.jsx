import { useState } from "react";
import LandingPage from "./components/LandingPage";
import VideoContainer from "./components/VideoContainer";

const App = () => {
    const [showVideo, setShowVideo] = useState(false);

    return showVideo ? (
        <VideoContainer />
    ) : (
        <LandingPage onStart={() => setShowVideo(true)} />
    );
};

export default App;
