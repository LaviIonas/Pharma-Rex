"use strict";

const express = require('express');
const router  = express.Router();

module.exports = () => {

  router.get("/", (req, res) => {
    res.json({message: "sending message"});
    console.log("sent a message to react");
  });

  router.post("/", (req, res) => {
    console.log("Recieving message from React: ", req.body.a);
    res.status(200).end();
  });

  return router;
}
