export const sampleChats = [
  {
    avatar: ["http://www.w3schools.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["http://www.w3schools.com/howto/img_avatar.png", "http://www.w3schools.com/howto/img_avatar.png"
      , "http://www.w3schools.com/howto/img_avatar.png", "http://www.w3schools.com/howto/img_avatar.png",
    ],
    name: "Aleena Hadid",
    _id: "2",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["http://www.w3schools.com/howto/img_avatar.png"],
    name: "Selina Gomez",
    _id: "3",
    groupChat: false,
    members: ["1", "2", "3"],
  },
];

export const sampleUsers = [
  {
    avatar: ["http://www.w3schools.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "1",
  },
  {
    avatar: ["http://www.w3schools.com/howto/img_avatar.png"],
    name: "Aleena Hadeed",
    _id: "2",
  }
]

export const sampleNotifications = [
  {
    sender: {
      avatar: ["http://www.w3schools.com/howto/img_avatar.png"],
    name: "John Doe"
  },
    _id: "1",
  },
  {
    sender: {
      avatar: ["http://www.w3schools.com/howto/img_avatar.png"],
    name: "Aleena Hadeed"
  },
    _id: "2",
  }
]

export const sampleMessage =[
  {
    attachments: [],
    content: "Hello",
    _id: "asjsdj",
    sender: {
      _id: "user._id",
      name: "John Doe",
    },
    chat: "chatId",
    createdAt: "2024-07-05T20:00:00.000Z",
  },
  {
    attachments: [
      {
        public_id: "rahii",
        url: "http://www.w3schools.com/howto/img_avatar.png"
      },
    ],
    content: "",
    _id: "asjsdjii",
    sender: {
      _id: "123",
      name: "Selena Gomez",
    },
    chat: "chatId",
    createdAt: "2024-07-05T20:00:00.000Z",
  },
];