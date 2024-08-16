require('dotenv').config();
const _Port = process.env.Port || 3000;  
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cors());

app.use(express.json());

//*CONNECT TO DB :

const mongoose = require("mongoose");

const name = process.env.name;
      password = process.env.password,
      db = process.env.db;


mongoose.connect(`mongodb+srv://${name}:${password}@cluster0.qv0nk7t.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    console.log("connected successfully");
  })
  .catch((error) => {
    console.log("error with connecting with the DB ", error);
  });


//* MODELS :
const User = require('./models/users');

app.get("/Users", async (req, res) => {
  const users = await User.find();
  console.log("the users are", users);
  res.json(users);
});


app.post("/signUp", async (req, res) => {
  
  const {name ,email, password} = req.body;

  const user = await User.findOne({email});
  user && console.log(res.json({message : "user with that email already existe"}));

  const hashedPassword = bcrypt.hashSync(password , 10);

  const newUser = new User({name,email,password:hashedPassword});
  await newUser.save();

  return console.log(res.json({message : "user created succefully"})); 
  
});

app.post("/login", async (req, res) => {
  
  const {email, password} = req.body;
  const user = await User.findOne({email});

  if (!user) {
    return console.log(res.json({ message: "User not found with that email" }));
  }
  const ispasswordValid  = await bcrypt.compare(password,user.password)
  if (!ispasswordValid) {
    return console.log(res.json({ message: "Incorrect password" }));
  }
  
  const token = jwt.sign({id:user._id},process.env.SEQRET);
  return console.log(res.json({token , userID:user._id}));
  
  
});


app.listen(_Port, () => {
  console.log(`Server is listening on port ${_Port}`);
});
