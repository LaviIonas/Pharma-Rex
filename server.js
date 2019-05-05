"use strict";

require('dotenv').config();

const accountSid = 'ACfc917e83469f4a4485ef915fb8fede05';
const authToken = '2b002231346a7ba7146343c6cf1c8604';

const PORT        = process.env.PORT || 3001;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const app         = express();
const cors        = require("cors");
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const bodyParser  = require('body-parser');
const knexLogger  = require('knex-logger');
var cookieSession = require('cookie-session');
const corsOptions = {origin: 'http://localhost:3000', credentials: true}
const client = require('twilio')(accountSid, authToken);
var moment = require('moment');

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieSession({
  name: 'session',
  keys: ['keyboard'],

  //Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


// Seperated Routes for each Resource
const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");
const profileRoute = require("./routes/profileRoute");
const caretakerRoute = require("./routes/caretakerRoute");

// Mount all resource routes
app.use("/login", loginRoute(knex));
app.use("/register", registerRoute(knex));
app.use("/profile", profileRoute(knex));
app.use("/caretaker", caretakerRoute(knex));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));


// app.get("/test", (req,res) => {
//   console.log("Sent the Message");
//   client.messages
//     .create({
//       body: 'Hello, it is time to take your medication!',
//       from: '+16474902749',
//       to: '+14168890760'
//     })
// })

//Message function sends notification to patient reminding them to take their prescribed meds.
function message (name, medName, phoneNumber, id) {
  client.messages
  .create({
    body: `Hello ${name}, it's time to take your ${medName}! Respond with only this number: ${id}`,
    from: '+16474902749',
    to: `${phoneNumber}`
  })
}

function notificationPuller () {
  knex.table('prescriptions').innerJoin('patients', 'prescriptions.patient_id', '=', 'patients.id')
  .innerJoin('medications', 'medications.id', '=', 'prescriptions.medication_id')
  .select('prescriptions.id', 'name','start_time', 'medication_name', 'phone_number')
  .then(rows => {

    const array = []

    rows.forEach( function(row) {

      let obj = {}
      obj.id = row.id
      obj.email = row.name
      obj.medication = row.medication_name
      obj.phone = row.phone_number
      obj.time = row.start_time

      array.push(obj)
  })
// console.log("ARRAY", array)
  array.forEach(function (i) {

    let time = moment()
    let pTime = moment(i.time)
    let diff = pTime.diff(time, 'milliseconds')
    console.log(diff)

    if (diff < 0) {
      return
    } else  {
      setTimeout(message, diff, i.email, i.medication, i.phone, i.id)
    }
  })

})
}

//Runs on server start. Pulls patient info.

// notificationPuller()
setInterval(notificationPuller, 10000)

app.post('/sms', (req, res) => {

  knex.table('patients').innerJoin('prescriptions', 'prescriptions.patient_id', '=', 'patients.id')
  .innerJoin('caregivers', 'caregivers.id', '=', 'patients.caregiver_id')
  .innerJoin('medications', 'medications.id', '=', 'prescriptions.medication_id')
  .select('prescriptions.id', 'caregivers.phone_number', 'total_number_pills', 'number_pills_to_take', 'start_time', 'interval', 'patients.name', 'medication_name', 'pharmacy_number',)
  .where({'prescriptions.id': req.body.Body})

  .then(rows => {
    console.log("SMS RESPONSE ROWS", rows)
    client.messages
    .create({
      body: ` ${rows[0].name} took their ${rows[0].number_pills_to_take} pill(s) of ${rows[0].medication_name}. No need to respond`,
      from: '+16474902749',
      to: `${rows[0].phone_number}`
    })

    let newPillTotal = rows[0].total_number_pills - rows[0].number_pills_to_take

    let newStartTime = moment(rows[0].start_time).add(rows[0].interval, 'seconds');

    if (newPillTotal < 10 && newPillTotal > 0) {

      client.messages
      .create({
      body: ` ${rows[0].name} only has ${newPillTotal} of ${rows[0].medication_name}. Call their pharmacy
      to request a refill. Pharmacy Number is: ${rows[0].pharmacy_number} `,
      from: '+16474902749',
      to: `${rows[0].phone_number}`
    })

    }

    //let evenNewerTime = moment(newStartTime).format('MMMM Do YYYY, h:mma')

    knex('prescriptions').where({id: rows[0].id}).update({total_number_pills: newPillTotal, start_time: newStartTime})
    .then(rows => {
      console.log("UPDATED ROWS", rows)
    })
  })
})






app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
