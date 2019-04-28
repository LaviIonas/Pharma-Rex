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
var cookieSession = require('cookie-session');
const corsOptions = {origin: 'http://localhost:3000', credentials: true}
// const client = require('twilio')(accountSid, authToken);

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(cookieSession({
  name: 'session',
  keys: ['keyboard'],

  //Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

/*

Axios Example use
Get:
  getData = () => {
    axios
    .get("/")
    .then((res) => {
      this.setState({ message: res.data.message })
    })
  }
Post:
  sendData = () => {
    const msg = {
      a: "1"
    }
    axios
    .post("/", msg)
    .then((res) => {
      console.log(res);
      console.log(res.data);
    })
  }
*/

// Seperated Routes for each Resource
const getRoute = require("./routes/getRequest");
const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");
// Mount all resource routes
app.use("/", getRoute(knex));
app.use("/login", loginRoute(knex));
app.use("/register", registerRoute(knex));

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


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
