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

const getTemp = async (cityName) => {
  const getValue = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&mode=json&units=metric&appid=cb02915bb92f05b586b8c59d3d49b906`
  );
  return getValue.data.main.temp;
}

app.get("/", async (req, res) => {
  const tempvar = await getTemp('paris');
  res.render("./home.ejs", {  temprature: tempvar });
});

app.post('/getdata', async(req,res) => {
  const { query } = req.body;
  const tempvar = await getTemp(query);
  res.render("./home.ejs", { temprature: tempvar });
})

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

const port = 3000;
app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`);
});
