"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // router.post("/", (req, res) => {
  //   console.log("Username:", req.body.username);
  //   console.log("Password:", req.body.password);
  //   res.status(200).end();
  // });

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
          }
          req.session.user_id = rows[0].id
          console.log("LOGGED IN AS CAREGIVER, REDIRED TO /Caregiver/ID", rows[0].id)
          res.status(200).end() 
        }) 
      } else {
        req.session.user_id = rows[0].id
        console.log("LOGGED IN AS PATIENT, REDIRED TO /PATIENT/ID", rows[0].id)
        res.status(200).end()
      }
    });

  });

  router.get("/response", (req, res) => {
    if(true){
      res.json({loggedIn: true});
    }

    console.log("replied to React loggin form");
  });

  return router;
}
