"use strict";

const express = require('express');
const router  = express.Router();


module.exports = (knex) => {

  //Empty Route that takes care of feeding information to the
  //Caretaker page as well as feeding the array of patients
  router.get("/data/caretakerInfo", (req,res) => {

    knex.table('prescriptions').innerJoin('patients', 'prescriptions.patient_id', '=', 'patients.id').innerJoin('medications', 'medications.id', '=', 'prescriptions.medication_id').where({caregiver_id: req.session.caregiver_id})
    .then(rows => {
      const array = []
      rows.forEach(function (patientInfo){
        let patientObj = {}

        patientObj.name = patientInfo.name
        patientObj.drug = patientInfo.medication_name
        patientObj.dose = patientInfo.dosage
        patientObj.pillsRemaining = patientInfo.total_number_pills
        patientObj.time = patientInfo.start_time
        patientObj.doctorName = patientInfo.doctor_name
        patientObj.pharmacyNumber = patientInfo.pharmacy_number
        patientObj.rxNumber = patientInfo.rx_number


        array.push(patientObj)

    })
    res.json({array: array})



  })

  //update a new patient to a caretaker
  router.post("/data/new-patient", (req,res) => {
    //after res.json an object with the new array with the new patient
    //Like we did in LoginPopup
  })

  //   knex('patients').select('name').where({caregiver_id: req.session.caregiver_id})
  //   .then(rows => {
  //     const array = []

  //     rows.forEach(function (name){
  //       let obj = {}
  //       obj.name = name.name
  //       array.push(obj)

  //       // select * from prescriptions inner join patients on prescriptions.patient_id = patients.id inner join medications on medications.id = prescriptions.medication_id;

  //     })

  //     res.json({array: array})

  //   //respond with the name and array of patients
  //   //Example: {name: "Bob", array: [{name: "Joe"}, {name: "Candy"}]}

  // })

// })

})

return router;

}
