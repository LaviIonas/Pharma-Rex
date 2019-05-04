"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  let login = false;
  let error = false;

  router.post("/", (req, res) => {

    knex.select('id').from('patients').where({ email: req.body.email, password: req.body.password })
    .asCallback((err, rows) => {
      if (err) {
        res.status(500).end()
        return
      } else if (rows[0] === undefined) {
        knex('caregivers').select('id').where({ email: req.body.email, password: req.body.password })
        .then ((rows) => {
          if (err) {
            res.status(500).end()
            return
          } else if (rows[0] === undefined) {

            error = true;
            login = false;
            res.json({login: login, error: error});
            res.status(404).end()
          } else {
            login = true;
            error = false;
            console.log("success", login);
            res.json({login: login, error: error});
            req.session.caregiver_id = rows[0].id
          console.log("LOGGED IN AS CAREGIVER, REDIRED TO /Caregiver/ID", rows[0].id)

          res.status(200).end()
          }
        })
      } else {
        req.session.patient_id = rows[0].id
        console.log("PATIENT_ID LOGGED IN ------>", req.session.patient_id )
        res.status(200).end()

      }
    });
  });

  return router;
}
