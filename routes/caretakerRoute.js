"use strict";

const express = require('express');
const router  = express.Router();


module.exports = (knex) => {

  //Empty Route that takes care of feeding information to the
  //Caretaker page as well as feeding the array of patients
  router.get("/data/caretakerInfo", (req,res) => {
    knex('patients').select('name').where({caregiver_id: req.session.caregiver_id})
    .then(rows => {
      
      const array = []

      rows.forEach(function (name){
        let obj = {}
      
        obj.name = name.name

        array.push(obj)
       
        


      })

   
      res.json({array: array})
   

    
    //respond with the name and array of patients
    //Example: {name: "Bob", array: [{name: "Joe"}, {name: "Candy"}]}

  })
  
  
  
})

return router;

}
