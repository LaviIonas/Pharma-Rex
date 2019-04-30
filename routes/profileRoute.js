"use strict";

const express = require('express');
const router  = express.Router();


module.exports = () => {

  //Route Recieves Drug data when user creates a new one
  router.post("/data/new-drug", (req, res) => {
    const {name, dose, total, interval, time} = req.body;


    res.status(200).end();
  });

  //Empty Route sending an ARRAY of objects of drugs
  //This route is responcible for filling the state array of existing added drugs
  router.get("data/fill-array", (req,res) => {
    //Create an array of objects of the drug info
    //Example: [{name: "Heroin", dose: "2"}, {name: "Cocain", dose: "1"}]

  })

  //Empty Route for Profile info (requested varibales are accepted (res.data.variable) as mentioned)
  router.get("/data/profileInfo", (req, res) => {
    //Send me data from the DB please (name, careID, doctor, pharmacyNum)
  });

  return router;
}
