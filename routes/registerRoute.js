"use strict";

const express = require('express');
const router  = express.Router();

module.exports = () => {

  router.post("/", (req, res) => {
    console.log("Username:", req.body);
    res.status(200).end();
  });

  return router;
}