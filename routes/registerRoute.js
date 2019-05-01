"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // router.post("/", (req, res) => {
  //   //replace "req.body.phone" with "patient"
  //   if (req.body.phone) {
  //     knex('patients').insert({ email: req.body.username, password: req.body.password }).returning('id')
  //     .asCallback(function (err, rows) {
  //       if (err) {
  //         res.status(500).end()
  //           return
  //       }
  //       req.session.user_id = rows[0]
  //       res.status(200).end();
  //     })
  //     //replace "req.body.age" with "caregiver"
  //   } else if (req.body.age) {
  //     knex('caregivers').insert({ email: req.body.username, password: req.body.password }).returning('id')
  //     .asCallback(function (err, rows) {
  //       if (err) {
  //         res.status(500).end()
  //         return
  //       }
  //       req.session.user_id = rows[0]
  //       res.status(200).end();
  //     })

  //   }

  // });

  router.post("/", (req, res) => {
    console.log("REQUBODY", req.body)
  
    if (req.body.status === 'Patient') {
      knex('patients').insert({ email: req.body.username, password: req.body.password }).returning('id')
      .asCallback(function (err, rows) {
        if (err) {
          res.status(500).end()
          return
        }
        req.session.patient_id = rows[0]
        console.log("REGISTER PATIENT_ID", req.session.patient_id)
        res.status(200).end();
      })
   
    } else if (req.body.status === 'Caregiver') {
      knex('caregivers').insert({ email: req.body.username, password: req.body.password }).returning('id')
      .asCallback(function (err, rows) {
        console.log ("ROWS", rows)
        if (err) {
          res.status(500).end()
          return
        }
        
        req.session.caregiver_id = rows[0]
        console.log("ROW[0]", rows[0])
        console.log("REGISTER CAREGIVER_ID", req.session.caregiver_id)
        res.status(200).end();
      })

    }

  });



  return router;
}
