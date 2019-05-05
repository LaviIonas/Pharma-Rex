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
//moment.js and twilio client passed into /profile
app.use("/profile", profileRoute(knex, moment, client));
app.use("/caretaker", caretakerRoute(knex));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));


//Message function sends text message to patient reminding them to take their prescribed meds.
function message (name, medName, phoneNumber, id ) {
  //
  client.messages
  .create({
    body: `Hello ${name}, it's time to take your ${medName}! Respond with only this number: ${id}`,
    from: '+16474902749',
    to: `${phoneNumber}`
  })
}

function notificationPuller () {
  //join prescription, medication, and patient tables.
  knex.table('prescriptions').innerJoin('patients', 'prescriptions.patient_id', '=', 'patients.id')
  .innerJoin('medications', 'medications.id', '=', 'prescriptions.medication_id')
  .select('prescriptions.id', 'name','start_time', 'medication_name', 'phone_number')
  .then(rows => {
    
    //Array of objectc containing info to constuct message and time to send it
    const patientMessagesList = []

    rows.forEach( function(row) {

      let patientObj = {}
      patientObj.id = row.id
      patientObj.name = row.name
      patientObj.medication = row.medication_name
      patientObj.phone = row.phone_number
      patientObj.time = row.start_time

      patientMessagesList.push(patientObj)
  })
  
  //Loop through patientMessagesList and subtract the current time from time to send and use the difference (in miliseconds)
  //to setTimeout. I use moment js to format the time and make it possible to subtract the dates.
  patientMessagesList.forEach(function (message) {

    let currentTime = moment()
    let sendTime = moment(message.time)
    let timeDiff = sendTime.diff(currentTime, 'milliseconds')
    
    //If the date has already passed (diff is a negative number, don't setTimeout)
    if (timeDiff < 0) {
      return
    } else  {
      //setTimeout calls the message function when timeDiff reaches out 0 and passes 4 parameters
      setTimeout(message, timeDiff, message.name, message.medication, message.phone, message.id)
    }

  })

})
}

//Runs on server start. Pulls patient info and sets setTimeout function.
notificationPuller()

//When a patient responds to a text Twilio sends the response here.
app.post('/sms', (req, res) => {

  knex.table('patients').innerJoin('prescriptions', 'prescriptions.patient_id', '=', 'patients.id')
  .innerJoin('caregivers', 'caregivers.id', '=', 'patients.caregiver_id')
  .innerJoin('medications', 'medications.id', '=', 'prescriptions.medication_id')
  .select('prescriptions.id', 'caregivers.phone_number', {patientNum: 'patients.phone_number'}, 'total_number_pills', 
  'number_pills_to_take', 'start_time', 'interval', 'patients.name', 'medication_name', 'pharmacy_number',)
  .where({'prescriptions.id': req.body.Body})

  .then(rows => {

    //This is the message that is created and sent to a caregiver
    client.messages
    .create({
      body: ` ${rows[0].name} took their ${rows[0].number_pills_to_take} pill(s) of ${rows[0].medication_name}. No need to respond`,
      from: '+16474902749',
      to: `${rows[0].phone_number}`
    })

    //Update the datebase by subtracting the amount of pills taken and adding the interval to the original
    let newPillTotal = rows[0].total_number_pills - rows[0].number_pills_to_take
    
    let newStartTime = moment(rows[0].start_time).add(rows[0].interval, 'seconds');

    let time = moment()
    let diff = newStartTime.diff(time, 'milliseconds')

    //Use the difference of the newStart time and current time to set another timeout for another message
    setTimeout(function() {
      message(rows[0].name, rows[0].medication_name, rows[0].patientNum, rows[0].id)
    }, diff);

    //If the patients new pill total is less than ten we send a notification to the patient and caregiver telling them
    //to call their pharmacists and order more.

    if (newPillTotal < 10 && newPillTotal > 0) {
      
      //Caregiver message
      client.messages
      .create({
      body: ` ${rows[0].name} only has ${newPillTotal} of ${rows[0].medication_name}. Call their pharmacy
      to request a refill. Pharmacy Number is: ${rows[0].pharmacy_number} `,
      from: '+16474902749',
      to: `${rows[0].phone_number}`
      
    })

    //Message to patient
    client.messages
    .create({
      body: ` You only have ${newPillTotal} of ${rows[0].medication_name}. Call your pharmacy
      to request a refill. Pharmacy Number is: ${rows[0].pharmacy_number} `,
      from: '+16474902749',
      to: `${rows[0].patientNum}`
    })
  }
  
  //New Pill count and new medication time is updated in the databse
  knex('prescriptions').where({id: rows[0].id}).update({total_number_pills: newPillTotal, start_time: newStartTime})
  .then(rows => {
      console.log("UPDATED ROWS", rows)
    })
    res.status(200).end();
  })
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
