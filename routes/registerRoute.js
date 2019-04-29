"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {
    //replace "req.body.phone" with "patient"
    if (req.body.phone) {
      knex('patients').insert({ email: req.body.username, password: req.body.password }).returning('id')
      .asCallback(function (err, rows) {
        if (err) {
          res.status(500).end()
          return
        }
        req.session.user_id = rows[0]
        res.status(200).end();
      })
      //replace "req.body.age" with "cargiver"
    } else if (req.body.age) {
      knex('caregivers').insert({ email: req.body.username, password: req.body.password }).returning('id')
      .asCallback(function (err, rows) {
        if (err) {
          res.status(500).end()
          return
        }
        req.session.user_id = rows[0]
        res.status(200).end();
      })

    }

  });

  return router;
}



