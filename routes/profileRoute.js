"use strict";

const express = require('express');
const router  = express.Router();

const obj = {
  name: "Ron Swanson",
  careID: "123123432"
}

const data = {}

module.exports = () => {

  router.post("/data/new-drug", (req, res) => {
    console.log("name:", req.body.name);
    console.log("dose:", req.body.dose);
    console.log("interval:", req.body.interval);
    data.name = req.body.name;
    data.dose = req.body.dose;
    data.interval = req.body.interval;

    console.log("New Drug Data Submitted");
    res.status(200).end();
  });

  router.get("/data/new-drug", (req,res) => {
    res.json(data);
  });

  router.get("/data/request", (req, res) => {
    res.json(obj);
    console.log("Data sent to profile page");
  });

  return router;
}
