const mongoose = require('mongoose');
const chat= require("./Models/chat.js");

main()
.then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');

}

let allchats=[
  {
    from: "Neha",
    to: "Priya",
    msg: "Send me your exam sheets",
    created_at: new Date("2025-10-02T09:30:00")
  },
  {
    from: "Rohit",
    to: "Amit",
    msg: "Hey, are you coming to the class?",
    created_at: new Date("2025-10-02T10:15:00")
  },
  {
    from: "Anita",
    to: "Suresh",
    msg: "Please check your email for the assignment",
    created_at: new Date("2025-10-02T11:00:00")
  },
  {
    from: "Priya",
    to: "Neha",
    msg: "Yes, I will send it by tonight",
    created_at: new Date("2025-10-02T11:30:00")
  },
  {
    from: "Amit",
    to: "Rohit",
    msg: "Let's meet tomorrow at 5 PM",
    created_at: new Date("2025-10-02T12:00:00")
  },
  {
    from: "Suresh",
    to: "Anita",
    msg: "Call me ASAP",
    created_at: new Date("2025-10-02T12:45:00")
  }
]

chat.insertMany(allchats);
