"use strict";

require('dotenv').config();

const accountSid = 'ACfc917e83469f4a4485ef915fb8fede05';
const authToken = '2b002231346a7ba7146343c6cf1c8604';

const PORT        = process.env.PORT || 3001;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const app         = express();
const cors        = require("cors");
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const bodyParser  = require('body-parser');
const knexLogger  = require('knex-logger');
const client = require('twilio')(accountSid, authToken);

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Seperated Routes for each Resource
const getRoute = require("./routes/getRequest");
const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");
// Mount all resource routes
app.use("/", getRoute());
app.use("/login", loginRoute());
app.use("/register", registerRoute());

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));


app.get("/test", (req,res) => {
  console.log("Sent the Message");
  client.messages
    .create({
       body: 'Hello, it is time to take your medication!',
       from: '+16474902749',
       to: '+14168890760'
     })
})

// app.get("/login/response", (req, res) => {
//     console.log("IN");
//     if(true){
//       res.json({loggedIn: true});
//     }

//     console.log("replied to React loggin form");
//   });

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
