"use strict";

require('dotenv').config();

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

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Seperated Routes for each Resource
const getRoute = require("./routes/getRequest");
const loginRoute = require("./routes/loginRoute");
// Mount all resource routes
app.use("/", getRoute());
app.use("/login", loginRoute());

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
