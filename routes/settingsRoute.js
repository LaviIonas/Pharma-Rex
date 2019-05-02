"use strict";

const express = require('express');
const router  = express.Router();


module.exports = () => {

  //Empty Route that is responcible for changing the user "name"
  router.post("/data/name-change", (req,res) => {
    console.log("This is what I want my name changed to: ", req.body.name);
    res.status(200).end()
  })

  return router;
}
