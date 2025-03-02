const videos = [
    {
        id: 1,
        title: "Act 1 - 2",
        src: "/synapse-interactive-story/videos/Act 1-2.mp4",
        choices: [2, 3],
        promptStart: 15, // Prompt will appear 15 seconds before the end
    },
    {
        id: 2,
        title: "Message The Manager",
        src: "/synapse-interactive-story/videos/Promotion Arc/Act 3.1 Promotion Arc.mp4",
        choices: [4, 5],
        promptStart: 10,
    },
    {
        id: 3,
        title: "Repair",
        src: "/synapse-interactive-story/videos/Discovery Arc/Act 3.1 Discovery Arc.mp4",
        choices: [6, 7],
        promptStart: 12,
    },
    {
        id: 4,
        title: "Message The Manager",
        src: "/synapse-interactive-story/videos/Promotion Arc/Act 3.L Promotion Arc.mp4",
        choices: [],
        loopbackTo: {
            videoId: 1,
            timestamp: 65, // in seconds
        },
    },
    {
        id: 5,
        title: "Don't Tell The Manager",
        src: "/synapse-interactive-story/videos/Promotion Arc/Act 3.2 - 5 Promotion Arc.mp4",
        choices: [],
    },
    {
        id: 6,
        title: "Restart Simulation",
        src: "/synapse-interactive-story/videos/Discovery Arc/Act 3.L Discovery Arc.mp4",
        choices: [],
        loopbackTo: {
            videoId: 1,
            timestamp: 65, // in seconds
        },
    },
    {
        id: 7,
        title: "Continue Digging",
        src: "/synapse-interactive-story/videos/Discovery Arc/Act 3.2 - 4 Discovery Arc.mp4",
        choices: [8, 9],
        promptStart: 20,
    },
    {
        id: 8,
        title: "Leave",
        src: "/synapse-interactive-story/videos/Discovery Arc/Act 5 - Leave.mp4",
        choices: [],
    },
    {
        id: 9,
        title: "Stay",
        src: "/synapse-interactive-story/videos/Discovery Arc/Act 5 - Stay.mp4",
        choices: [],
    },
];

export default videos;
