"use strict";

const express = require('express');
const router  = express.Router();


module.exports = (knex, moment, client) => {

  function message (name, medName, phoneNumber, id) {
    client.messages
    .create({
      body: `Hello ${name}, it's time to take your ${medName}! Respond with only this number: ${id}`,
      from: '+16474902749',
      to: `${phoneNumber}`
    })
  }







  // function notificationPuller () {
  //   knex.table('prescriptions').innerJoin('patients', 'prescriptions.patient_id', '=', 'patients.id')
  //   .innerJoin('medications', 'medications.id', '=', 'prescriptions.medication_id')
  //   .select('prescriptions.id', 'name','start_time', 'medication_name', 'phone_number')
  //   .then(rows => {
  
  //     const array = []
  
  //     rows.forEach( function(row) {
  
  //       let obj = {}
  //       obj.id = row.id
  //       obj.email = row.name
  //       obj.medication = row.medication_name
  //       obj.phone = row.phone_number
  //       obj.time = row.start_time
  
  //       array.push(obj)
  //   })
  // // console.log("ARRAY", array)
  //   array.forEach(function (i) {
  
  //     let time = moment()
  //     let pTime = moment(i.time)
  //     let diff = pTime.diff(time, 'milliseconds')
  //     console.log(diff)
    
  //     if (diff < 0) {
  //       return
  //     } else  {
  //       setTimeout(message, diff, i.email, i.medication, i.phone, i.id)
  //     }
  
  //   })
  
  // })
  // }

  

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

            console.log("ROWS PROFILE ROUTE", rows)
            knex.table('patients').innerJoin('prescriptions', 'prescriptions.patient_id', '=', 'patients.id')
            .innerJoin('medications', 'medications.id', '=', 'prescriptions.medication_id')
            .select('prescriptions.id', 'patients.phone_number', 'start_time', 'interval', 'patients.name', 'medication_name')
            .where({'prescriptions.id': rows[0]})
            .then(rows => {
              console.log("PROFILE ROUTE NEW PRESCRIPT", rows)

              let time = moment()
              let startTime = moment(rows[0].start_time)
              let diff = startTime.diff(time, 'milliseconds')
              console.log("DIFFERENCE IN Hopefully works", diff)

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

        // setTimeout(message, diff, i.email, i.medication, i.id)
        
      
      
      
      // const drugs = [{
      //   name: rows[0].name
      // }]
    //Create an array of objects of the drug info
    //Example: array: [{name: "Heroin", dose: "2"}, {name: "Cocain", dose: "1"}]
    // res.json(drugs)
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
