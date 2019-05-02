"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  let login = false;
  let error = false;
  router.post("/", (req, res) => {

    knex.select('id').from('patients').where({ email: req.body.username, password: req.body.password })
    .asCallback((err, rows) => {
      if (err) {
        res.status(500).end()
        return
      } else if (rows[0] === undefined) {
        knex('caregivers').select('id').where({ email: req.body.username, password: req.body.password })
        .then ((rows) => {
          if (err) {
            res.status(500).end()
            return
          } else if (rows[0] === undefined) {
            console.log("Noting was found");
            error = true;
            res.status(404).end()
          }
          login = true;
          req.session.caregiver_id = rows[0].id
          console.log("LOGGED IN AS CAREGIVER, REDIRED TO /Caregiver/ID", rows[0].id)
        
          res.status(200).end()
        })
      } else {
        req.session.patient_id = rows[0].id
        console.log("PATIENT_ID LOGGED IN ------>", req.session.patient_id )
        res.status(200).end()

      }
    });

  });


  router.get("/response", (req, res) => {
    if(login){
      res.json({loggedIn: true, loginError: false});
    } else if (error) {
      res.json({loggedIn: false, loginError: true})
    }
  });

  return router;
}
