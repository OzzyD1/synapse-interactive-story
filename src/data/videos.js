const videos = [
  {
    id: 1,
    title: "Act 1 - 2",
    src: "/assets/animatic/Act 1 - 2.mp4",
    choices: [2, 3]
  },
  {
    id: 2,
    title: "Message The Manager (Start Promotion Arc)",
    src: "/assets/animatic/Promotion Arc/Act 3 - Promotion Arc.mp4",
    choices: [4, 5]
  },
  {
    id: 3,
    title: "Repair (Start Discovery Arc)",
    src: "/assets/animatic/Discovery Arc/Act 3 - Discovery Arc.mp4",
    choices: [6, 7]
  },
  {
    id: 4,
    title: "Message The Manager (Promotion Loopback)",
    src: "/assets/animatic/Promotion Arc/Act 3.a - Promotion Loopback.mp4",
    loopbackTo: {
      videoId: 1,
      timestamp: 37 // in seconds
    }
  },
  {
    id: 5,
    title: "Don't Tell The Manager (Continue Promotion Arc)",
    src: "/assets/animatic/Promotion Arc/Act 4-5 - Promotion Arc.mp4",
    choices: []
  },
  {
    id: 6,
    title: "Restart Simulation (Discovery Loopback)",
    src: "assets/animatic/Discovery Arc/Act 3.a - Discovery Loopback.mp4",
    loopbackTo: {
      videoId: 1,
      timestamp: 37 // in seconds
    },
  },
  {
    id: 7,
    title: "Continue Digging (Continue Discovery Arc)",
    src: "assets/animatic/Discovery Arc/Act 4 - Discovery Arc.mp4",
    choices: [8, 9]
  },
  {
    id: 8,
    title: "Ignore The Manager, exit the simulation",
    src: "assets/animatic/Discovery Arc/Act 5 - Discovery Arc (Leave).mp4",
  },
  {
    id: 9,
    title: "Reply to The Manager, stay the simulation",
    src: "assets/animatic/Discovery Arc/Act 5 - Discovery Arc (Stay).mp4",
  }
];

export default videos;