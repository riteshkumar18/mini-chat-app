const express = require("express");
const app= express();
const path= require("path");
const Chat= require("./Models/chat.js");
const methodOverride= require("method-override");

app.use(methodOverride("_method"));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

const mongoose = require('mongoose');
const { fromJSON } = require("postcss");

main()
.then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');

}



app.get("/",(req,res)=>{
    res.send("root is working");
});
// index route
app.get("/chats", async (req,res)=>{
    let chats=  await Chat.find();
   /* console.log(chats);*/
    res.render("index.ejs",{chats});
});

// new route
app.get("/chats/new",(req,res)=>{
  res.render("new.ejs");
});

//create route
app.post("/chats",(req,res)=>{
    let{from,to,msg}= req.body;
    let newChat= new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date(),
    });

    newChat.save().then((res)=>{
       console.log("chat was saved");
    })
    .catch((err)=>{
        console.log(err);
    });

  res.redirect("/chats");
});

//Edit route

app.get("/chats/:id/edit",async (req,res)=>{
    let{id}= req.params;
    let chat= await Chat.findById(id);
    res.render("edit.ejs",{chat});
});

// update route
app.put("/chats/:id",async (req,res)=>{
  let {id}= req.params;
  let{msg: newMsg}= req.body;
  let updatedChat= await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true, new:true});
  console.log(updatedChat);
  res.redirect("/chats");
});
// Destroy route
app.delete("/chats/:id", async (req,res)=>{
    let {id}= req.params;
    let deletedChat =  await Chat.findByIdAndDelete(id);
     console.log(deletedChat);
     res.redirect("/chats");
})

app.listen(5000,()=>{
    console.log("server is listening on port 5000");

});