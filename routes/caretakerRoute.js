"use strict";

const express = require('express');
const router  = express.Router();


module.exports = () => {

  //Empty Route that takes care of feeding information to the
  //Caretaker page as well as feeding the array of patients
  router.get("data/caretakerInfo", (req,res) => {
    //respond with the name and array of patients
    //Example: {name: "Bob", [{name: "Joe"}, {name: "Candy"}]}

  })

  return router;
}
