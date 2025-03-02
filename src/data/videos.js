const videos = [
    {
        id: 1,
        title: "Act 1 - 2",
        src: "/videos/act1-2.mp4",
        choices: [2, 3],
        promptStart: 15,
    },
    {
        id: 2,
        title: "Message The Manager",
        src: "/videos/promotion-arc/act3-1-promotion.mp4",
        choices: [4, 5],
        promptStart: 10,
    },
    {
        id: 3,
        title: "Repair",
        src: "/videos/discovery-arc/act3-1-discovery.mp4",
        choices: [6, 7],
        promptStart: 12,
    },
    {
        id: 4,
        title: "Message The Manager",
        src: "/videos/promotion-arc/act3-loop-promotion.mp4",
        choices: [],
        loopbackTo: {
            videoId: 1,
            timestamp: 65,
        },
    },
    {
        id: 5,
        title: "Don't Tell The Manager",
        src: "/videos/promotion-arc/act3-2-5-promotion.mp4",
        choices: [],
    },
    {
        id: 6,
        title: "Restart Simulation",
        src: "/videos/discovery-arc/act3-loop-discovery.mp4",
        choices: [],
        loopbackTo: {
            videoId: 1,
            timestamp: 65,
        },
    },
    {
        id: 7,
        title: "Continue Digging",
        src: "/videos/discovery-arc/act3-2-4-discovery.mp4",
        choices: [8, 9],
        promptStart: 20,
    },
    {
        id: 8,
        title: "Leave",
        src: "/videos/discovery-arc/act5-leave.mp4",
        choices: [],
    },
    {
        id: 9,
        title: "Stay",
        src: "/videos/discovery-arc/act5-stay.mp4",
        choices: [],
    },
];

export default videos;
