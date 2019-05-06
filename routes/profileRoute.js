"use strict";

const express = require('express');
const router  = express.Router();


module.exports = (knex, moment, client) => {

  //Message function sends text message to patient reminding them to take their prescribed meds.
  function message (name, medName, phoneNumber, id) {
    client.messages
    .create({
      body: `Hello ${name}, it's time to take your ${medName}! Respond with only this number: ${id}`,
      from: '+16474902749',
      to: `${phoneNumber}`
    })
  }

  //Route Recieves Drug data when user creates a new one
  router.post("/data/new-drug", (req, res) => {
    const {name, dose, total, interval, time} = req.body;

  knex('medications').insert({ medication_name: name}).returning('id')
  .asCallback(function (err, rows) {
          if (err) {
            res.status(500).end()
            return
          }

          knex('prescriptions').insert({ medication_id: rows[0], dosage: dose, patient_id: req.session.patient_id, interval: interval, start_time: time, total_number_pills: total}).returning('id')
          .asCallback(function (err, rows) {
            if (err) {
              res.status(500).end()
              return
            }
            //Query DB in order to relevant info create a timer for new message every time a new drug is added to the database
            knex.table('patients').innerJoin('prescriptions', 'prescriptions.patient_id', '=', 'patients.id')
            .innerJoin('medications', 'medications.id', '=', 'prescriptions.medication_id')
            .select('prescriptions.id', 'patients.phone_number', 'start_time', 'interval', 'patients.name', 'medication_name')
            .where({'prescriptions.id': rows[0]})
            .then(rows => {
            
              let time = moment()
              let startTime = moment(rows[0].start_time)
              let diff = startTime.diff(time, 'milliseconds')
              
              setTimeout(function() {
                message(rows[0].name, rows[0].medication_name, rows[0].phone_number, rows[0].id)
              }, diff);
            })
          })
          res.status(200).end();
        });
      })

  //Empty Route sending an ARRAY of objects of drugs
  //This route is responcible for filling the state array of existing added drugs
  router.get("/data/fill-array", (req,res) => {
    
    knex.table('prescriptions').innerJoin('medications', 'prescriptions.medication_id', '=', 'medications.id').where({patient_id: req.session.patient_id})
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

  })
  // notificationPuller()
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
        careID: req.session.patient_id,
        doctor: rows[0].doctor_name,
        pharmacyNum: rows[0].pharmacy_number
      }
      res.json(patientInfo)
    })
    

  });
  
  return router;
}
