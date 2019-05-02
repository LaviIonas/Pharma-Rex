"use strict";

const express = require('express');
const router  = express.Router();


module.exports = (knex) => {

  //Route Recieves Drug data when user creates a new one
  router.post("/data/new-drug", (req, res) => {
    const {name, dose, total, interval, time} = req.body;

  knex('medications').insert({ medication_name: name}).returning('id')
  .asCallback(function (err, rows) {
          if (err) {
            res.status(500).end()
            return
          }

          knex('prescriptions').insert({ medication_id: rows[0], dosage: dose, patient_id: req.session.patient_id, interval: interval, start_time: time, total_number_pills: total})
          .asCallback(function (err, rows) {
            if (err) {
              res.status(500).end()
              return
            }
            
  
        
          })
        })



    res.status(200).end();
  });

  //Empty Route sending an ARRAY of objects of drugs
  //This route is responcible for filling the state array of existing added drugs
  router.get("/data/fill-array", (req,res) => {
    console.log("Fill ARRAY SEE on click", req.session.patient_id )

    knex.table('prescriptions').innerJoin('medications', 'prescriptions.medication_id', '=', 'medications.id').where({patient_id: req.session.patient_id})
    // knex('prescriptions').select('name').where({ id: req.session.patient_id})
    .then (rows => {
      const array = []

      rows.forEach(function (drug) {
        let drugObj = {}
        drugObj.name = drug.medication_name
        drugObj.dosage = drug.dosage
        drugObj.total = drug.total_number_pills
        drugObj.time = drug.start_time
        drugObj.interval = drug.interval
        
        array.push(drugObj)

      
      
      
      // const drugs = [{
      //   name: rows[0].name
      // }]
    //Create an array of objects of the drug info
    //Example: array: [{name: "Heroin", dose: "2"}, {name: "Cocain", dose: "1"}]
    // res.json(drugs)
  })
  
  res.json({array: array})
});

  })

  //Empty Route for Profile info (requested varibales are accepted (res.data.variable) as mentioned)
  router.get("/data/profileInfo", (req, res) => {
    
    //Send me data from the DB please (name, careID, doctor, pharmacyNum)
    knex('patients').select('*').where({ id: req.session.patient_id})
    .then (rows => {
      const patientInfo = {
        name: rows[0].name,
        careID: rows[0].caregiver_id,
        doctor: rows[0].doctor_name,
        pharmacyNum: rows[0].pharmacy_number
      }
      res.json(patientInfo)
    })
    

  });
  
  return router;
}
