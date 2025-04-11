const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const Session = require("./sessionModel");
mongoose.connect("mongodb://localhost:27017/codecollab", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
