"use strict";

const express = require('express');
const router  = express.Router();

let users = {
  "admin": {
    username: "admin",
    password: "admin"
  }
}

module.exports = () => {

  // router.get("/", (req, res) => {
  //   res.json({message: "sending message"});
  //   console.log("sent a message to react");
  // });

  router.post("/", (req, res) => {
    console.log("Checking password");
    users.forEach((user)=> {
      if(user.username === req.body.username) {
        if(user.password === req.body.password) {
          return true;
        }
      }
    });
    res.status(200).end();
  });

  return router;
}
