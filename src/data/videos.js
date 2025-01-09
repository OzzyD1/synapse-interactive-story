const videos = [
  {
    id: 1,
    title: "Act 1 - 2",
    src: "/assets/animatic/Act 1 - 2.mp4",
    choices: [2, 3]
  },
  {
    id: 2,
    title: "Start of Promotion Arc",
    src: "/assets/animatic/Promotion Arc/Act 3 - Promotion Arc.mp4",
    choices: [4, 5]
  },
  {
    id: 3,
    title: "Start of Discovery Arc",
    src: "/assets/animatic/Discovery Arc/Act 4 - Discovery Arc.mp4",
    choices: []
  },
  {
    id: 4,
    title: "Promotion Loopback",
    src: "/assets/animatic/Promotion Arc/Act 3.a - Promotion Loopback.mp4",
    choices: [],
    loopbackTo: {
      videoId: 1,
      timestamp: 37 // in seconds
    }
  },
  {
    id: 5,
    title: "Promotion Continue",
    src: "/assets/animatic/Promotion Arc/Act 3.b - Continue Promotion Arc.mp4",
    choices: []
  },
];

export default videos;