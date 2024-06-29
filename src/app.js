require("dotenv").config();

const express = require("express");
const MongoDB = require("./database/mongodb");
const router = require("./server/router");

const app = express();

app.use(express.json());

app.use(router);

module.exports = app;
