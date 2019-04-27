"use strict";

const express = require('express');
const router  = express.Router();

module.exports = () => {

  router.post("/", (req, res) => {
    console.log("Username:", req.body.username);
    console.log("Password:", req.body.password);
    res.status(200).end();
  });

  router.get("/response", (req, res) => {
    if(true){
      res.json({loggedIn: true});
    }

    console.log("replied to React loggin form");
  });

  return router;
}
