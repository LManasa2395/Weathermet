const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const axios = require("axios");
const helmet = require("helmet");

const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(flash());
app.use(helmet({ contentSecurityPolicy: false }));

app.get("/", (req, res) => {
  res.render("./home.ejs");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

const port = 3000;
app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`);
});
