"use strict";

const express = require('express');
const router  = express.Router();


module.exports = (knex) => {

  //Empty Route that takes care of feeding information to the
  //Caretaker page as well as feeding the array of patients
  router.get("/data/caretakerInfo", (req,res) => {
    // console.log("CAREGIVER ID:", req.session.caregiver_id)
    console.log("HELLO")
    

      knex('patients').select('name').where({caregiver_id: req.session.caregiver_id})
    .then(rows => {
      rows[0].forEach(function (name){


      })
    // })
    // knex('patients').select('id').where({caregiver_id: req.session.caregiver_id})
    // .then(rows => {
    //   rows[0].forEach(function (id)) {

    //   }
    // })

    
    //respond with the name and array of patients
    //Example: {name: "Bob", array: [{name: "Joe"}, {name: "Candy"}]}

  })
  
  
  
})

return router;

}
